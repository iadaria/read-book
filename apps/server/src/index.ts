import { getChapter } from "./actions/chapter";
import { Request, Response } from "express";

const express = require("express");
const app = express();

app.get("/chapter", async function (req: Request, res: Response) {
  const chapter = await getChapter();
  console.log(chapter);
  res.json({ chapter });
});

app.listen(3000);
