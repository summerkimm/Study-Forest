import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { assert } from "superstruct";
import { CheckPassword, CreateStudy, PatchStudy, CreateHabit, CreateReaction, CreatePoint } from "./structs.js";

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
app.post("/studies/:studyId/userCheck", asyncHandler(async (req, res) => {
  assert(req.body, CheckPassword)
  const { password } = req.body;
  const { studyId } = req.params;

  const user = await prisma.user.findUnique({
    where : {studiesId : studyId}
  });

  if(user.password === password) {
    return res.status(200).send({ message: '비밀번호가 일치합니다.' });
  } else {
    return res.status(401).send({ message: '비밀번호가 일치하지 않습니다.' });
  }

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
          orderBy: { count: 'desc' },
        },
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
        reactions: study.reaction.map(r => ({
          id: r.id,
          emoji: r.emoji,
          count: r.count
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
      reaction,
      points,
      habit,
      createdAt,
    } = await prisma.studies.findUniqueOrThrow({
      where: { id: studyId },
      include: {
        reaction: true,
        // habit: {
        //   include: {
        //     completedHabit: true,
        //   },
        // },
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
      reaction: reaction.map((r) => ({
        id: r.id,
        emoji: r.emoji,
        count: r.count,
      })),
      points,
      // habitTrackers: habit.map((h) => ({
      //   id: h.id,
      //   name: h.name,
      //   isCompleted: JSON.parse(h.isCompletedDays),
      // })),
    };

    res.send(result);
  })
);

app.post(
  "/studies",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateStudy);
    const study = await prisma.studies.create({
      data: req.body,
    });

    const result = {
      id : study.id,
      name : study.name,
      nickName : study.nickName,
      description : study.description,
      background : study.background,
      createdAt : study.createdAt,
      reactions : study.reaction,
      points : study.points,
      // habitTrackers : study.habit,
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
      where: { id : studyId },
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
    await prisma.studies.delete({
      where: { id : studyId },
    });
    res.sendStatus(204);
  })
);

/*----                point              -----*/

app.post(
  "/:studyId/point",
  asyncHandler(async (req, res) => {
    assert(req.body, CreatePoint)
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

// /*----                todayHabit               -----*/
// let currentDay;
// let lastUpdate = new Date(0);  

// function getCurrentDay() {
//   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   return days[new Date().getDay()];
// }

// function updateCurrentDayMiddleware(req, res, next) {
//   const now = new Date();
//   if (now.getDate() !== lastUpdate.getDate()) {
//     currentDay = getCurrentDay();
//     lastUpdate = now;
//   }
//   next();
// }

// app.use(updateCurrentDayMiddleware);

// app.get(
//   "/studies/:studyId/habit",
//   asyncHandler(async (req, res) => {
//     const { studyId } = req.params;
    
//     const study = await prisma.studies.findUnique({
//       where: { id: studyId },
//       include: {
//         habit: {
//           include: {
//             completedHabit: true,
//           },
//         },
//       },
//     });

//     const habits = study.habit.map((h) => {
//       const isCompletedDays = JSON.parse(h.isCompletedDays);
//       return {
//         id: h.id,
//         name: h.name,
//         isCompleted: isCompletedDays.includes(currentDay),
//       };
//     });

//     const result = {
//       id: study.id,
//       name: study.name,
//       nickName: study.nickName,
//       habits: habits,
//     };

//     res.send(result);
//   })
// );

// app.post('/studies/{studyId}/habit', asyncHandler(async(req, res) => {
//   assert(req.body, CreateHabit)
//   const {studyId} = req.params;

//   await prisma.habit.create({
//     data : {
//       ...req.body,
//       studiesId : studyId,
//     }
//   });

//   const study = await prisma.studies.findUnique({
//     where: { id: studyId },
//     include: {
//       habit: {
//         include: {
//           completedHabit: true,
//         },
//       },
//     },
//   });

//   const habits = study.habit.map((h) => {
//     const isCompletedDays = JSON.parse(h.isCompletedDays);
//     return {
//       id: h.id,
//       name: h.name,
//       isCompleted: isCompletedDays.includes(currentDay),
//     };
//   });

//   const result = {
//     id: study.id,
//     name: study.name,
//     nickName: study.nickName,
//     habits: habits,
//   };

//   res.send(result);
// }));

// app.patch('/habits/{habitId}', asyncHandler(async(req, res) => {
//   assert(req.body, CreateHabit)
//   const { habitId } = req.params;

//   const habit = await prisma.habit.update({
//     where : {
//       id : habitId,
//     },
//     data : req.body,
//   });

//   res.status(201).send(habit)
// }))

// app.delete('/habits/{habitId}', asyncHandler(async(req, res) => {
//   const { habitId } = req.params;
//   await prisma.habit.delete({
//     where : {
//       id : habitId
//     }
//   });

//   res.sendStatus(204);
// }))

/*----                reaction               -----*/
app.post(
  "/reactions",
  asyncHandler(async (req, res) => {
    assert(req.body, CreateReaction)
    const { emoji, emojiType, studiesId } = req.body;

    let count;
    if (emojiType === "increase") {
      count = {increment : 1}
    } else if (emojiType === "decrease") {
      count = {decrement : 1}
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
          count : 1,
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
    }

    res
      .status(201)
      .send(result);
  })
);

app.listen(process.env.PROT || 3000, () => console.log("Server Started"));
