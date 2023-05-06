import mongoose from "mongoose";

const artsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    lowercase: true,
    unique: false,
  },
  id: {
    type: String,
    unique: true,
    required: true,
    // match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  uploadDate: { type: Date }, //unix time "1234535657"
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
  description: [String],
  address: {
    city: String,
    street: String,
    houseNumber: Number,
  },
  contact: Map,
  categories: [{ type: mongoose.Types.ObjectId, ref: "categories" }],
});

const art = mongoose.model("art", artsSchema);
export default art;
