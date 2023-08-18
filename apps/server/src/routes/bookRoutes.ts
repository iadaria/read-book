import express from "express";
import getChapter from "@/controllers/book/getChapter.controller";

const router = express.Router();

router.route("/chapter").get(getChapter);

export default router;
