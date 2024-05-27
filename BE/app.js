import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";
import { CreateStudy, PatchStudy } from "./structs.js";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

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
app.post("studies/:studyId/userCheck", asyncHandler(async(req, res) => {
  const { password } = req.body;
  const {studyId} = req.params;

  const user = await prisma.user.findUnique({
    where : {studiesId : studyId}
  });

  let message;
  if(user.password === password) {
    message = {message : 'Success'}
  } else {
    throw new Error({message : '비밀번호가 일치하지 않습니다.'})
  }

  res.status(201).send(message)  
}))

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
        orderBy = { point: "desc" };
        break;
      case "lowPoint":
        orderBy = { point: "asc" };
        break;
    }
    const study = await prisma.study.findMany({
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      include : {
        TopReaction : true,
      },
    });

    const formattedStudies = studies.map(study => {
      return {
        id: study.id,
        name: study.name,
        nickName: study.nickName,
        description: study.description,
        studyDays: study.studyDays,
        background: study.background,
        points: study.points,
        topReactions: study.TopReaction.map(reaction => ({
          id: reaction.id,
          emoji: reaction.emoji,
          count: reaction.count
        }))
      };
    });

    const result = {
      studies: formattedStudies,
      pagination: {
        currentOffset: parseInt(offset),
        nextOffset: parseInt(offset) + parseInt(limit),
        limit: parseInt(limit),
      }
    };

    res.send(result);
  })
);

app.get(
  "/studies/:studyId",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    const {
      id,
      name,
      nickName,
      description,
      TopReaction,
      points,
      habitTrackers,
      createdAt,
    } = await prisma.study.findUniqueOrThrow({
      where: { id: studyId },
      include: {
        TopReaction: true,
        habitTrackers: true,
        habit: {
          include: {
            CompletedHabit: true,
          },
        },
      },
    });

    const today = new Date();
    const createdAT = new Date(createdAt);
    const studyDays = Math.floor((today - createdAT) / (1000 * 60 * 60 * 24));

    const result = {
      id,
      name,
      nickName,
      description,
      studyDays,
      topReactions: TopReaction.map((reaction) => ({
        id: reaction.id,
        emoji: reaction.emoji,
        count: reaction.count,
      })),
      points,
      habitTrackers: habitTrackers.map((tracker) => ({
        id: tracker.id,
        name: tracker.name,
        isCompleted: JSON.parse(tracker.isCompletedDays),
      })),
    };

    res.send(result);
  })
);

app.post(
  "/studies",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateStudy);
    const study = await prisma.study.create({
      data: req.body,
    });

    const result = {
      id : study.id,
      name : study.name,
      nickName : study.nickName,
      description : study.description,
      background : study.background,
      createdAt : study.createdAt,
      topReactions : study.topReactions,
      points : study.points,
      habitTrackers : study.habitTrackers,
    };

    res.status(201).send(result);
  })
);

app.patch(
  "/studies/:studyId",
  asyncHandler(async (req, res) => {
    assert(req.body, PatchStudy);
    const { studyId } = req.params;
    const study = await prisma.study.update({
      where: { studyId },
      data: req.body,
    });

    const result = {
      id : study.id,
      name : study.name,
      nickName : study.nickName,
      description : study.description,
    }

    res.send(result);
  })
);

app.delete(
  "/studies/:studyId",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    await prisma.study.delete({
      where: { studyId },
    });
    res.sendStatus(204);
  })
);

/*----                point              -----*/

app.post(
  "/:studyId/point",
  asyncHandler(async (req, res) => {
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

app.get(
  "/studies/:studyId/habit",
  asyncHandler(async (req, res) => {
    const { studyId } = req.params;
    const getCurrentDay = () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[new Date().getDay()];
    };

    const study = await prisma.studies.findUnique({
      where: { id: studyId },
      include: {
        Habit: {
          include: {
            CompletedHabit: true,
          },
        },
      },
    });

    const habits = study.Habit.map((habit) => {
      const isCompleted = habit.CompletedHabit.some((ch) => ch.isCompleted);
      return {
        id: habit.id,
        name: habit.name,
        isCompleted,
      };
    });

    const result = {
      id: study.id,
      name: study.name,
      nickName: study.nickName,
      habits: habits,
    };

    res.send(result);
  })
);

/*----                reaction               -----*/
app.post(
  "/reactions",
  asyncHandler(async (req, res) => {
    const { emoji, emojiType, count, studiesId } = req.body;

    await prisma.reaction.create({
      data: {
        emoji,
        emojiType,
        count,
        studiesId,
      },
    });

    await updateTopReactions(studiesId);

    res
      .status(201)
      .send({ message: "Reaction added and top reactions updated" });
  })
);

const updateTopReactions = async (studiesId) => {
  const topReactions = await prisma.reaction.findMany({
    where: { studiesId },
    orderBy: { count: "desc" },
    take: 3,
  });

  await prisma.topReaction.deleteMany({
    where: { studiesId },
  });

  for (const reaction of topReactions) {
    await prisma.topReaction.create({
      data: {
        emoji: reaction.emoji,
        count: reaction.count,
        studiesId: reaction.studiesId,
      },
    });
  }
};

app.listen(process.env.PROT || 3000, () => console.log("Server Started"));
