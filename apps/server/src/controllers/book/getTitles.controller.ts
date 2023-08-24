import * as epubService from "@/services/epub";
import asyncHandler from "express-async-handler";

const getTitles = asyncHandler(async (req, res) => {
  const titles = await epubService.readTitles();
  res.json(titles);
});

export default getTitles;
