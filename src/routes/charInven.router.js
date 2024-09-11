import express from "express";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 캐릭터 인벤토리 관련
// 인벤토리 내 아이템 조회
router.get("/char/:charId/inventory", async (req, res, next) => {
  const { charId } = req.params;

  try {
    const character = await prisma.character.findUnique({
      where: {
        charId: +charId,
      },
      include: {
        items: true,
      },
    });

    return res.status(200).json(character.items);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 인벤토리 내 아이템 획득
router.post("/char/:charId/inventory/acquire", async (req, res, next) => {
  const { charId } = req.params;
  const { itemCode } = req.body;

  try {
    const item = await prisma.items.findUnique({
      where: {
        itemCode: +itemCode,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "아이템 존재 하지 않음" });
    }

    const character = await prisma.character.findUnique({
      where: {
        charId: +charId,
      },
    });

    if (!character) {
      return res.status(404).json({ message: "캐릭터 찾을 수 없음" });
    }

    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        charId: +charId,
        itemCode: +itemCode,
      },
    });

    return res
      .status(200)
      .json({ message: "아이템 획득", data: inventoryItem });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 인벤토리 내 아이템 버리기
router.delete("/char/:charId/inventory/:itemCode", async (req, res, next) => {
  const { charId, itemCode } = req.params;

  try {
    const delItem = await prisma.charInven.findFirst({
      where: {
        charId: +charId,
        itemCode: +itemCode,
      },
    });

    if (!delItem) {
      return res.status.json({
        message: `당신의 인벤토리에 ${delItem.name}이 없어`,
      });
    }

    await prisma.charInven.delete({
      where: {
        itemCode: +itemCode,
        charId: +charId,
      },
    });

    return res.status(200).json({ message: "아이템 삭제 완료" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});
export default router;
