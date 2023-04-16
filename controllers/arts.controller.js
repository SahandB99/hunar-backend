import Art from "../models/arts.models.js";

export const getArts = async (req, res) => {
  try {
    const arts = await Art.find();
    res.json({ status: "success", data: arts });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

export const addArt = async (req, res) => {
  try {
    const art = await Art.create(req.body);
    res.json({ status: "success", data: art });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};
