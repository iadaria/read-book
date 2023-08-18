import translateParagraph from "@/controllers/translate/translateParagraph.controller";
import express from "express";

const router = express.Router();

router.route("/paragraph").post(translateParagraph);

export default router;
