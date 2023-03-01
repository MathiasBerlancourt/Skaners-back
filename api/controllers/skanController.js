const { skans } = require("../../models");
const { users } = require("../../models");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

module.exports.addSkan = async (req, res) => {
  try {
    const { userId } = req.body;
    const { pict } = req.files;
    const user = await users.findById(userId);
    if (!user) {
      const error = new Error("Any user find with this Id");
      error.code = 403;
      throw error;
    }
    const result = await cloudinary.uploader.upload(convertToBase64(pict), {
      folder: `Skaners/user/${user.email}`,
    });

    const skan = await skans.create({
      pictureUrl: result.secure_url,
      userId,
    });
    res.status(201).json({ skan });
  } catch (err) {
    res.status(err.code).json({ error: err.message });
  }
};

module.exports.allSkans = async (req, res) => {
  try {
    const skansList = await skans.find();
    return res.status(200).json(skansList);
  } catch (e) {
    return "Error";
  }
};
