const jwt = require("jsonwebtoken");
const { users } = require("../../models");

const isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const checkToken = jwt.verify(token, process.env.SECRET_TOKEN);
      if (checkToken.id) {
        return res.status(200).json({ message: "Authorized" });
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
