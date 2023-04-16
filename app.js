import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";

import productsRoutes from "./routes/arts.routes.js";

import dotenv from "dotenv";
dotenv.config();

connectDb();

const app = express();

app.use(express.json());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productsRoutes);

export default app;
