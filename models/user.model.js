import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: String,
    default: "customer",
  },
  address: {
    city: String,
    street: String,
    houseNumber: Number,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "customer",
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const users = mongoose.model("user", userSchema);
export default users;
