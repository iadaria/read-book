import express from "express";
import getChapter from "@/controllers/book/getChapter.controller";
import getTitles from "@/controllers/book/getTitles.controller";

const router = express.Router();

router.route("/titles").get(getTitles);
router.route("/chapter/:chapterId").get(getChapter);

export default router;
