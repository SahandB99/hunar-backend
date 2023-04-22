import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";

import productsRoutes from "./routes/arts.routes.js";
import userRoutes from "./routes/users.routes.js";
import "./strategy/auth.js";

import dotenv from "dotenv";
import { trimQueryMiddleware } from "./middlewares/trimQuery.middleware.js";
dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(trimQueryMiddleware);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productsRoutes);
app.use("/api/users", userRoutes);

export default app;
