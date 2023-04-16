import { connectDb } from "../config/db.js";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";

import Arts from "../models/arts.models.js";

dotenv.config();

connectDb();

const __dirname = path.resolve();

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, `/seeder/data/products.json`))
);

const importData = async () => {
  try {
    await Arts.create(data);
    console.log("import was successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Arts.deleteMany();
    console.log("delete was successful");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") deleteData();
