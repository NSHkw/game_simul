import express from "express";
import jwt from "jsonwebtoken";
import UsersRouter from "./routes/users.router.js";
import ItemsRouter from "./routes/items.router.js";
import CharsRouter from "./routes/chars.router.js";
import CharItemRouter from "./routes/charItem.router.js";
import CharInvenRouter from "./routes/charInven.router.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use("/api", UsersRouter);
app.use("/api", ItemsRouter);
app.use("/api", CharsRouter);
app.use("/api", CharItemRouter);
app.use("/api", CharInvenRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(PORT, "포트로 서버 열림");
});
