//import chalk from "chalk";
import "module-alias/register";
import express from "express";
import cors from "cors";
import bookRoutes from "@/routes/bookRoutes";

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/book", bookRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // console.log(
  //   `${chalk.green.bold("✔")} 👍 Server running in ${chalk.yellow.bold(
  //     process.env.NODE_ENV
  //   )} mode on port ${chalk.blue.bold(PORT)}`
  // );
});
