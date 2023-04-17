import Art from "../models/arts.models.js";

export const getArts = async (req, res) => {
  try {
    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let queryObj = JSON.parse(query);

    const excludeQuery = ["sort", "limit", "page", "fields", "search"];

    excludeQuery.forEach((key) => {
      delete queryObj[key];
    });

    if (req.query.search) {
      queryObj.fullName = new RegExp(req.query.search, "i");
    }

    const getQuery = Art.find(JSON.parse(query));

    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }

    if (req.query.fields) {
      getQuery.select(req.query.sort);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = limit * (page - 1);

    getQuery.skip(skip).limit(limit);

    const arts = await getQuery;

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
