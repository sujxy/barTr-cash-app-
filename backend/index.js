import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

//router imports
import rootRouter from "./routes/index.js";

dotenv.config();
const app = express();
//app config
app.use(express.json({ urlencoded: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("common"));

const PORT = process.env.PORT;

//mongoose connection and server start
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`connected to ${PORT} successfully !`)),
  )
  .catch((e) => console.log(`error while connecting ${e}`));

app.use("/api/v1", rootRouter);
