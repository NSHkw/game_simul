import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma/index.js";

export default async function (req, res, next) {
  try {
    const { authorization } = req.cookies;
    if (!authorization) {
      throw new Error("토큰 존재 x");
    }

    const [tokentype, token] = authorization.split(" ");

    if (tokentype !== "Bearer") {
      throw new Error("토큰 타입 일치 x");
    }

    const decodedToken = jwt.verify(token, "custom-secret-key");
    const userId = decodedToken.userId;

    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });
    if (!user) {
      res.clearCookie("authorization");
      throw new Error("토큰 사용자 존재x");
    }

    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("authorization");

    // 토큰이 만료되었거나, 조작되었을 때, 에러 메시지를 다르게 출력합니다.
    switch (error.name) {
      case "TokenExpiredError":
        return res.status(401).json({ message: "토큰이 만료되었습니다." });
      case "JsonWebTokenError":
        return res.status(401).json({ message: "토큰이 조작되었습니다." });
      default:
        return res
          .status(401)
          .json({ message: error.message ?? "비정상적인 요청입니다." });
    }
  }
}
