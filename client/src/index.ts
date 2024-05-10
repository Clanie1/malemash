// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
