import express from "express";
import { prisma } from "../utils/prisma/index.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 게임 내의 모든 아이템 API
// 아이템 생성
router.post("/item/create", async (req, res, next) => {
  const { itemName, description, itemStat, itemPrice } = req.body;

  try {
    const isExistItem = await prisma.items.findFirst({
      where: {
        itemName,
      },
    });

    if (isExistItem) {
      return res.status(409).json({ message: "이미 존재하는 아이템 이름" });
    }

    const newItem = await prisma.items.create({
      data: {
        itemName,
        description,
        itemStat,
        itemPrice,
      },
    });

    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 아이템 수정
router.put("/item/:itemCode/update", async (req, res, next) => {
  const { itemCode } = req.params;
  const { itemName, description, itemStat } = req.body;

  try {
    const isExistItem = await prisma.items.findUnique({
      where: {
        itemCode: +itemCode,
      },
    });

    if (!isExistItem) {
      return res
        .status(404)
        .json({ message: `${items.itemName}이 존재하지 않아` });
    }
    const updatedItem = await prisma.items.update({
      where: { itemCode: +itemCode },
      data: {
        itemName: itemName ?? isExistItem.itemName,
        description: description ?? isExistItem.description,
        itemStat: itemStat ?? isExistItem.itemStat,
      },
    });

    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 게임 내 아이템 목록 조회
router.get("/item", async (req, res, next) => {
  try {
    const items = await prisma.items.findMany({
      select: {
        itemCode: true,
        itemName: true,
        itemStat: true,
        itemPrice: true,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 아이템 상세 조회
router.get("/item/:itemCode/detail", async (req, res, next) => {
  const { itemCode } = req.params;

  try {
    const item = await prisma.items.findUnique({
      where: {
        itemCode: +itemCode,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "아이템이 존재 x" });
    }

    return res.status(202).json(item);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 게임 내 아이템 삭제
router.delete("/item/:itemCode/del", async (req, res, next) => {
  const { itemCode } = req.params;

  try {
    await prisma.items.delete({
      where: {
        itemCode: +itemCode,
      },
    });

    return res.status(202).json({ message: "아이템 삭제" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

export default router;
