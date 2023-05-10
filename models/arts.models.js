import mongoose from "mongoose";

const artsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    lowercase: true,
    unique: false,
  },
  uploadDate: { type: Date, default: Date.now() }, //unix time "1234535657"
  imgUrl: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTricwoZPkUPa0Axlr3RXO5X9hy6UmUe6WWzKvq0IYzYQ&s",
  },
  category: {
    type: String,
    required: true,
    enum: ["Art", "Sculptor", "Painting", "Western"],
    default: "Art",
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
});

const art = mongoose.model("art", artsSchema);
export default art;
