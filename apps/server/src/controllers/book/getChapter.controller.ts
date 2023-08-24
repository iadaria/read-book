import * as epubService from "@/services/epub";
import asyncHandler from "express-async-handler";

const getChapter = asyncHandler(async (req, res) => {
  console.log("params", req.params);
  const { chapterId } = req.params;
  /**
   * if (!) {
   *  res.status(400);
   * throw new Error("An email address is required")
   * }
   */
  const paragraphs = await epubService.readChapter(chapterId);
  res.json({ chapter: paragraphs });
});

export default getChapter;
