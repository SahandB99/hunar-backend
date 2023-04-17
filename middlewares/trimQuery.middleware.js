export const trimQueryMiddleware = (req, res, next) => {
  console.log(req.query);
  for (let key in req.query) {
    if (req.query[key] === "" || req.query[key] === null) {
      delete req.query[key];
    }
  }
  next();
};
