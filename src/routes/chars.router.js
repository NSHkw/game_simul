import express from "express";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 캐릭터 관련
// 캐릭터 생성
router.post("/char/create", async (req, res, next) => {
  const { accountId, name } = req.body;

  try {
    const isExistName = await prisma.char.findFirst({
      where: {
        name,
      },
    });

    if (isExistName) {
      return res
        .status(400)
        .json({ message: `${name}은 존재하는 캐릭터 이름이다.` });
    }

    const newName = await prisma.char.create({
      data: {
        accountId: +accountId,
        name,
      },
    });

    return res.status(200).json({ message: `${name} 캐릭터가 생성되었다.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 에러", error });
  }
});

// 캐릭터 삭제
router.delete("/char/:charId/drop", async (req, res, next) => {
  const { charId } = req.params;

  try {
    const char = await prisma.char.findUnique({
      where: {
        charId: +charId,
      },
    });

    if (!char) {
      return res
        .status(404)
        .json({ message: `${char.name}은 존재하지 않는 캐릭터다.` });
    }

    await prisma.char.delete({
      where: {
        charId: +charId,
      },
    });

    return res
      .status(200)
      .json({ message: `${char.name} 캐릭터가 삭제되었습니다.` });
  } catch {
    console.error(error);
    return res.status(500).json({ message: "서버 에러", error });
  }
});

// 캐릭터 상세 조회
router.get("/char/:charId/detail", authMiddleware, async (req, res, next) => {
  const { charId } = req.params;

  try {
    const char = await prisma.char.findUnique({
      where: {
        charId: +charId,
      },
      select: {
        charId: true,
        name: true,
        money: true,
        stat: true,
        createdAt: true,
        accountId: true,
      },
    });

    if (!char) {
      return res
        .status(404)
        .json({ message: `${char.name} 캐릭터를 찾을 수 없다.` });
    }

    if (req.user) {
      return res.status(200).json({ char });
    } else {
      const { money, stat, ...noAuthData } = char;
      return res.status(200).json({ noAuthData });
    }
  } catch {
    console.error(error);
    return res.status(500).json({ message: "서버 에러", error });
  }
});

export default router;
