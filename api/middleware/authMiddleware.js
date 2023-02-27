const jwt = require("jsonwebtoken");
const { users } = require("../../models");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        console.log("User checked !");
        let thisUser = await users.findById(decodedToken.id);
        res.locals.user = thisUser;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  try {
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(200).json("no token");
        } else {
          console.log(decodedToken.id);
          next();
        }
      });
    } else {
      console.log("No token");
    }
  } catch (e) {
    console.log(e);
  }
};
