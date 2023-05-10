import CustomError from "../CustomError.js";
import Art from "../models/arts.models.js";
import Users from "../models/user.model.js";
import { tryCatch } from "../utils/tryCatch.js";

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

    const getQuery = Art.find(queryObj);

    const countQuery = getQuery.clone();
    const countResults = await countQuery.count();

    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }

    if (req.query.fields) {
      getQuery.select(req.query.fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = limit * (page - 1);

    getQuery.skip(skip).limit(limit);

    const arts = await getQuery;

    res.json({ status: "success", results: countResults, data: arts });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

export const addArt = tryCatch(async (req, res) => {
  req.body.userId = req.user.sub;
  const art = await Art.create(req.body);

  await Users.findByIdAndUpdate(req.body.userId, {
    $set: { artId: art._id },
  });

  res.json({ status: "success", data: art });
});

export const getArtById = async (req, res, next) => {
  try {
    const art = await Art.findById(req.params.id);

    if (!art) {
      throw new CustomError("Art not found", 404, 4104);
    }

    res.json({ status: "success", data: art });
  } catch (err) {
    next(err);
  }
};
