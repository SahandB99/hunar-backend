import express from "express";
import path from "path";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { connectDb } from "./config/db.js";

import artsRoutes from "./routes/arts.routes.js";
import userRoutes from "./routes/users.routes.js";
import "./strategy/auth.js";
import dotenv from "dotenv";
import { trimQueryMiddleware } from "./middlewares/trimQuery.middleware.js";
import { checkRole, protect } from "./middlewares/auth.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { swaggerSpecs } from "./config/swagger.js";
dotenv.config();

connectDb();

const app = express();

app.use(express.json());
app.use(trimQueryMiddleware);
app.use(cors());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/arts", artsRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

export default app;
