const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authHandler = async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("token expired or worng");
    }

    req.user = decoded.user;
    next();
  });
  if (!token) {
    res.status(404);
    throw new Error("token not found");
  }
};
module.exports = authHandler;
