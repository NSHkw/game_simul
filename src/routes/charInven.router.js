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
    const character = await prisma.character.findUnique({
      where: {
        charId: +charId,
      },
    });

    if (!character) {
      return res.status(404).json({ message: "캐릭터 찾을 수 없음" });
    }

    const isExistItem = await prisma.items.findUnique({
      where: {
        itemCode: +itemCode,
      },
    });

    if (!isExistItem) {
      return res.status(404).json({
        message: `${isExistItem.itemName}이란 아이템은 존재 하지 않아`,
      });
    }

    const existInvenItem = await prisma.charInven.findUnique({
      where: {
        charInven: {
          charId: +charId,
          itemCode: +itemCode,
        },
      },
    });

    if (existInvenItem) {
      const updatedInventoryItem = await prisma.charInven.update({
        where: {
          charInvenId: existInvenItem.charInvenId,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });

      return res.status(200).json({
        message: "아이템 수량 증가 완료",
        data: updatedInventoryItem,
      });
    } else {
      const newInvenItem = await prisma.charInven.create({
        data: {
          charId: +charId,
          itemCode: +itemCode,
          quantity: 1,
        },
      });

      return res.status(200).json({
        message: "아이템 획득 완료",
        data: newInvenItem,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 인벤토리 내 아이템 버리기
router.delete("/char/:charId/inventory/:itemCode", async (req, res, next) => {
  const { charId, itemCode } = req.params;

  try {
    const delItem = await prisma.charInven.findUnique({
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

    if (delItem.quantity > 1) {
      await prisma.charInven.update({
        where: {
          charInvenId: delItem.charId,
        },
        data: {
          quantity: quantity - 1,
        },
      });
    } else {
      await prisma.charInven.delete({
        where: {
          charInvenId: delItem.charInvenId,
        },
      });
    }

    return res.status(200).json({ message: "아이템 삭제 완료" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});
export default router;
