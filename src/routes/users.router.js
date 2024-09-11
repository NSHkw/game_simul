import express from "express";
import { prisma } from "../utils/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 계정 회원가입
router.post("/account/sign-up", async (req, res, next) => {
  const { loginId, password, passwordconfirm, gender } = req.body;

  try {
    // 아이디와 비밀번호 유효성 체크
    if (password !== passwordconfirm) {
      throw new Error("비밀번호와 비밀번호 확인이 일치해야 한다");
    }
    if (password.length < 6) {
      throw new Error("비밀번호는 최소 6글자여야 한다.");
    }
    if (!/[a-z0-9]+$/.test(loginId)) {
      throw new Error("아이디는 영어 소문자와 숫자의 조합이어야 한다");
    }

    // 존재하는 계정인지 확인
    const isExistAccount = await prisma.account.findFirst({
      where: { loginId },
    });

    if (isExistAccount) {
      throw new Error("이미 존재하는 아이디입니다.");
    }

    // 계정 새로 만들기
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = await prisma.account.create({
      data: {
        loginId,
        password: hashedPassword,
        gender,
      },
    });

    const { password: _, ...accountNoPassword } = newAccount;

    // 클라이언트에게 response로 메세지와 데이터 전송
    return res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      data: accountNoPassword,
    });
  } catch (error) {
    // try에서 생긴 에러를 서버에 로그로 출력
    console.error(error);
    // error.message로 클라이언트에게 오류 메시지를 전송
    return res.status(400).json({ message: error.message });
  }
});

// 계정 로그인 API
router.post("/account/sign-in", async (req, res, next) => {
  const { loginId, password } = req.body;
  try {
    const loginAccount = await prisma.account.findUnique({
      where: {
        loginId,
      },
    });

    if (!loginAccount) {
      return res.status(404).json("아이디 또는 비밀번호가 맞지 않음");
    }

    const hashedPassword = loginAccount.password;

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      return res.status(404).json("비밀번호가 맞지 않음");
    }
    const token = jwt.sign(
      { userId: loginAccount.accountId },
      "custom-secret-key"
    );

    res.cookie("authorization", `Bearer ${token}`);
    return res.status(200).json({ message: "로그인 성공" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "에러", error });
  }
});

// 계정 내 캐릭터 목록 조회
router.get("/char/:accountId", async (req, res, next) => {
  const { accountId } = req.params;

  try {
    const chars = await prisma.char.findMany({
      where: {
        accountId: +accountId,
      },
      select: {
        charId: true,
        name: true,
      },
    });

    if (!chars || chars.length === 0) {
      return res
        .status(404)
        .json({ message: "이 계정에 캐릭터가 존재하지 않는다." });
    }

    return res.status(200).json({ chars });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 에러", error });
  }
});

export default router;
