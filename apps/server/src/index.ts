import { getChapter } from "./actions/chapter";
import { Request, Response } from "express";

const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/chapter", async function (req: Request, res: Response) {
  const chapter = await getChapter();
  console.log(chapter);
  res.json({ chapter });
});

app.get("/tr", async function (req: Request, res: Response) {
  //console.log(chapter);
  res.json({ translate: "hi there" });
});

app.listen(3001);
