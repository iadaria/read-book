//import chalk from "chalk";
import "module-alias/register";
import "dotenv/config";
import express from "express";
import cors from "cors";
import bookRoutes from "@/routes/bookRoutes";
import translateRoutes from "./routes/translateRoutes";
import { readChapter } from "./helpers/epubReader";

readChapter();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/translate", translateRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {});
