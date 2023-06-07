import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

// middleWares
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
