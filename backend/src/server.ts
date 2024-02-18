import express, { NextFunction, Request, Response } from "express";
import { router } from "./config/routes";
import cors from "cors";
import "express-async-errors";
import "dotenv/config";
import path from "path";
const app = express();

app.use(cors({origin:'http://localhost/5173'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/images", express.static(path.join(__dirname, "..", "uploads")))

const port = process.env.PORT || 4000;

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
