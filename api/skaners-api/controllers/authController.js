const { users } = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN, {
    expiresIn: 180000000000000,
  });
};

module.exports.signUp = async (req, res) => {
  try {
    const { username, email, password, url } = req.body;
    const saltRounds = 10;

    const user = await users.findOne({ email: email, username: username });
    if (user) {
      res
        .status(409)
        .json({ message: "This email/username already has an account" });
    } else {
      if (username && email && password) {
        bcrypt.hash(password, saltRounds, async (err, hash) => {
          const user = await users.create({
            username,
            email,
            password: hash,
            pictureUrl: url,
          });
          const token = createToken(user._id);

          res.status(201).json({ user, token });
        });
      }
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user._id);
        res.status(201).json({ token, user });
      }
    }
  } catch (e) {
    res.status(401).json({ e });
  }
};
module.exports.userInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findById(id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
