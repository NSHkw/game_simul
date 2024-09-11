import express from "express";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 캐릭터 소유 아이템 관련
// 착용 중인 아이템 조회
router.get("/char/:charId/equipped", async (req, res, next) => {
  const { charId } = req.params;

  try {
    const character = await prisma.character.findUnique({
      where: { charId: +charId },
      include: {
        items: {
          where: {
            equipped: true,
          },
        },
      },
    });

    if (!character) {
      return res.status(404).json({ message: "캐릭터를 찾을 수 없음" });
    }

    return res.status(200).json({ items: character.items });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 아이템 착용
router.post("/char/:charId/equip", async (req, res, next) => {
  const { charId } = req.params;
  const { itemCode } = req.body;
  try {
    const equippedItem = await prisma.items.update({
      where: { itemCode: +itemCode, charId: +charId },
      data: { equipped: true },
    });
    return res.status(200).json({ message: "아이템 착용", item: equippedItem });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 아이템 해제
router.post("/char/:charId/unequip", async (req, res, next) => {
  const { charId } = req.params;
  const { itemCode } = req.body;
  try {
    const unequippedItem = await prisma.items.update({
      where: { itemCode: +itemCode, charId: +charId },
      data: { equipped: false },
    });
    return res
      .status(200)
      .json({ messgage: "아이템 해제", item: unequippedItem });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

export default router;
