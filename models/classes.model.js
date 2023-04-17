import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacher: { type: String, required: true },
  stage: { type: number, required: true },

  student: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
  // marks: [{ type: mongoose.Schema.Types.ObjectId, ref: "mark" }],
});

const categories = mongoose.model("categories", categoriesSchema);

export default categories;
