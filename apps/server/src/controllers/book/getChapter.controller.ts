import { readChapter } from "@helpers/epubReader";
import asyncHandler from "express-async-handler";

const getChapter = asyncHandler(async (req, res) => {
  // const { email, } = req.body;
  /**
   * if (!) {
   *  res.status(400);
   * throw new Error("An email address is required")
   * }
   */
  const chapter = await readChapter();
  res.json({ chapter });
});

export default getChapter;
