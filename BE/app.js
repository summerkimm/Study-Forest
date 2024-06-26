import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import cors from 'cors'
import { assert } from "superstruct";
import cron from "node-cron";
import swagger from './swagger.js'
import {
  CheckPassword,
  CreateStudy,
  PatchStudy,
  CreateHabit,
  CreateReaction,
  CreatePoint,
  PatchHabit,
} from "./structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

/*----        오류발생으로 인한 서버가 죽는걸 방지하는 handler        -----*/
function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === "structError" ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        res.status(400).send({ message: e.message });
      } else if (
        e instanceof Prisma.PrismaClientUnknownRequestError &&
        e.code === "P2025"
      ) {
        res.sendStatus(404);
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

/*----                user               -----*/
app.post(
  "/studies/:studyId/userCheck",
  asyncHandler(async (req, res) => {
    assert(req.body, CheckPassword);
    const { password } = req.body;
    const { studyId } = req.params;

    const study = await prisma.studies.findUnique({
      where: { id: studyId },
      include: {
        user : true
      }
    });

    if (study.user.password === password) {
      return res.status(200).send({ message: "비밀번호가 일치합니다." });
    } else {
      return res.status(401).send({ message: "비밀번호가 일치하지 않습니다." });
    }
  })
);

/*----                study               -----*/
app.get(
  "/studies",
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 6, view = "newest", search = "" } = req.query;
    let orderBy;
    switch (view) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      case "highPoint":
        orderBy = { points: "desc" };
        break;
      case "lowPoint":
        orderBy = { points: "asc" };
        break;
    }
    const studies = await prisma.studies.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        reaction: {
          orderBy: { count: "desc" },
        },
      },
    });

    const formattedStudies = studies.map((study) => {
      return {
        id: study.id,
        name: study.name,
        nickName: study.nickName,
        description: study.description,
        studyDays: study.studyDays,
        background: study.background,
        points: study.points,
        reactions: study.reaction.map((r) => ({
          id: r.id,
          emoji: r.emoji,
          count: r.count,
        })),
      };
    });

    const result = {
      studies: formattedStudies,
      pagination: {
        currentOffset: parseInt(offset),
        nextOffset: parseInt(offset) + parseInt(limit),
        limit: parseInt(limit),
      },
    };
    res.send(result);
  })
);

app.get(
  "/studies/:studyId",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    const study = await prisma.studies.findUniqueOrThrow({
      where: { id: studyId },
      include: {
        reaction: true,
        habit: {
          include: {
            isCompletedHabit: true,
          },
        },
      },
    });

    const today = new Date();
    const createdAT = new Date(study.createdAt);
    const studyDays = Math.floor((today - createdAT) / (1000 * 60 * 60 * 24));

    const habitTrackers = study.habit.map((h) => {
      return {
        id : h.id,
        name : h.name,
        isCompleted : h.isCompletedHabit.days,
      }
    })

    const result = {
      id : study.id,
      name : study.name,
      nickName : study.nickName,
      description : study.description,
      studyDays : studyDays,
      reaction: study.reaction.map((r) => ({
        id: r.id,
        emoji: r.emoji,
        count: r.count,
      })),
      points: study.points,
      background: study.background,
      habitTrackers,
    };
    res.send(result);
  })
);

app.post(
  "/studies",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateStudy);
    const study = await prisma.studies.create({
      data: {
        ...req.body,
        user: {
          create : {
            password : req.body.password,
          },
        },
      },
    });

    const result = {
      id: study.id,
      name: study.name,
      nickName: study.nickName,
      description: study.description,
      background: study.background,
      createdAt: study.createdAt,
      reactions: study.reaction,
      points: study.points,
    };
    res.status(201).send(result);
  })
);

app.patch(
  "/studies/:studyId",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchStudy);
    const { studyId } = req.params;
    const study = await prisma.studies.update({
      where: { id: studyId },
      data: req.body,
    });

    const result = {
      id: study.id,
      name: study.name,
      nickName: study.nickName,
      description: study.description,
    };
    res.send(result);
  })
);

app.delete(
  "/studies/:studyId",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    await prisma.studies.delete({
      where: { id: studyId },
    });
    res.sendStatus(204);
  })
);

/*----                point              -----*/
app.post(
  "/:studyId/point",
  asyncHandler(async (req, res) => {
    assert(req.body, CreatePoint);
    const { studyId } = req.params;
    const { additionalPoints } = req.body;

    const { id, name, points, createdAt } = await prisma.studies.update({
      where: { id: studyId },
      data: {
        points: {
          increment: additionalPoints,
        },
      },
    });

    res.status(201).send({
      id,
      name,
      points,
      createdAt,
    });
  })
);

/*----                todayHabit               -----*/
const getStudyWithHabits = async (studyId) => {
  const study = await prisma.studies.findUnique({
    where: { id: studyId },
    include: {
      habit: {
        include: {
          isCompletedHabit: true,
        },
      },
    },
  });

  const habits = study.habit.map((h) => ({
    id: h.id,
    name: h.name,
    isCompletedHabit: h.isCompletedHabit.isCompleted,
  }));

  return {
    id: study.id,
    name: study.name,
    nickName: study.nickName,
    habits: habits,
  };
};

app.get(
  "/studies/:studyId/habit",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    const result = await getStudyWithHabits(studyId);
    res.send(result);
  })
);

app.post(
  "/studies/:studyId/habit",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateHabit);
    const { studyId } = req.params;

     await prisma.habit.create({
      data: {
        ...req.body,
        studiesId: studyId,
        isCompletedHabit: {
          create: {
            isCompleted: false,
            days: JSON.stringify([]),
            studiesId: studyId
          }
        }
      },
      include: {
        isCompletedHabit: true,
      }
    });
    const result = await getStudyWithHabits(studyId);
    res.send(result);
  })
);

app.patch(
  "/habits/:habitId",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchHabit);
    const { habitId } = req.params;
    const { isCompleted, ...data} = req.body;

    const habit = await prisma.habit.update({
      where: {
        id: habitId,
      },
      data: {
        ...data,
        isCompletedHabit : {
          update : {
            isCompleted,
          }
        }
      },
      include : {
        isCompletedHabit : true
      }
    });

    const result = {
      id : habit.id,
      name : habit.name,
      changedAt : habit.changedAt,
      isCompleted : habit.isCompletedHabit.isCompleted
    }

    res.status(201).send(result);
  })
);

app.delete(
  "/habits/:habitId",
  asyncHandler(async (req, res) => {
    const { habitId } = req.params;
    await prisma.habit.delete({
      where: {
        id: habitId,
      },
    });

    res.sendStatus(204);
  })
);

/*----                reaction               -----*/
app.post(
  "/reactions",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateReaction);
    const { emoji, emojiType, studiesId } = req.body;

    let count;
    if (emojiType === "increase") {
      count = { increment: 1 };
    } else if (emojiType === "decrease") {
      count = { decrement: 1 };
    }

    const existingReaction = await prisma.reaction.findFirst({
      where: {
        studiesId,
        emoji,
      },
    });

    let newReaction;
    if (existingReaction) {
      newReaction = await prisma.reaction.update({
        where: { id: existingReaction.id },
        data: {
          count,
        },
      });
    } else {
      newReaction = await prisma.reaction.create({
        data: {
          emoji,
          emojiType,
          studiesId,
          count: 1,
        },
      });
    }

    if (newReaction.count === 0) {
      await prisma.reaction.delete({
        where: { id: newReaction.id },
      });
    }

    const result = {
      id: newReaction.id,
      studyId: newReaction.studiesId,
      emoji: newReaction.emoji,
      count: newReaction.count,
    };

    res.status(201).send(result);
  })
);

const DAY = ["MON", "TUE", "WEN", "THU", "FRI", "SAT", "SUN"];
// 매일 자정에 실행되는 작업
console.log("매일 자정에 실행되는 작업 시작");
cron.schedule("0 0 * * *", async () => {
  const habits = await prisma.habit.findMany({
    include: {
      isCompletedHabit: true,
    },
  });

  for (const habit of habits) {
    if (habit.isCompletedHabit.isCompleted) {
      const days = JSON.parse(habit.isCompletedHabit.days);
      const today = new Date().getDay();
      days.push(DAY[today]);
      await prisma.isCompletedHabit.update({
        where: {
          id: habit.isCompletedHabit.id,
        },
        data: {
          isCompleted: false,
          days: JSON.stringify(days),
        },
      });
    } else {
      await prisma.isCompletedHabit.update({
        where: {
          id: habit.isCompletedHabit.id,
        },
        data: {
          isCompleted: false,
        },
      });
    }
  }
  console.log("매일 자정에 실행되는 작업 완료");
});

// 매주 일요일 자정에 실행되는 작업
cron.schedule("0 0 * * 0", async () => {
  console.log("매주 일요일 자정에 실행되는 작업 시작");
  await prisma.isCompletedHabit.updateMany({
    data: {
      days: JSON.stringify([]),
    },
  });
  console.log("매주 일요일 자정에 실행되는 작업 완료");
});

swagger(app);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));