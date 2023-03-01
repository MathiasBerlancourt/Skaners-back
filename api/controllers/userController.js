const { users, skans } = require("../../models");
const { sneakers } = require("../../models");
const ObjectID = require("mongoose").Types.ObjectId;

//// User Profile Handling \\\\\\\
module.exports.updateUser = async (req, res) => {
  const { id: userId } = req.params;
  if (!ObjectID.isValid(userId)) throw `ID unknown: ${userId}`;
  const userUpdatedValues = req.body;
  try {
    const user = await users.findByIdAndUpdate(
      userId,
      { ...userUpdatedValues },
      { new: true }
    );
    res.status(200).json({ message: "Successfully updated.", user });
  } catch (e) {
    throw { message: e };
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

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await users.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.allUsers = async (req, res) => {
  try {
    const usersList = await users.find();
    return res.status(200).json(usersList);
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

//// Favorites Handling \\\\\\\

module.exports.likeSneaker = async (req, res) => {
  try {
    const { userId, objectId } = req.body;

    if (!userId || !objectId) {
      throw "missing params";
    }
    const user = await users.findById(userId);
    if (!user) {
      throw `no user found for this id: ${userId}`;
    }
    const newFav = await sneakers.findById(objectId);
    if (!objectId) {
      throw new Error({ code: 401, message: "This pictuce no longer exist" });
    }

    /// Problème ici !

    if (objectId) {
      user.sneakers.map((sneaker) => {
        if (JSON.stringify(sneaker._id) === JSON.stringify(objectId)) {
          const error = new Error("already in favs");
          error.code = 403;
          throw error;
        }
      });
    }
    user.sneakers.push(newFav);
    await user.save();
    return res
      .status(200)
      .json(`${objectId} bas been added to ${user.username} favorites`);
  } catch (err) {
    console.log(err.message);
    res.status(err.code).json({ error: err.message });
  }
};

module.exports.unlikeSneaker = async (req, res) => {
  try {
    const { userId, sneakerId } = req.body;
    if (!userId || !sneakerId) {
      throw "missing params";
    }
    const user = await users.findById(userId);
    console.log(user);
    if (!user) {
      throw `no user found for this id`;
    }
    const newTab = [...user.sneakers];
    user.sneakers.map((sneaker, index) => {
      if (JSON.stringify(sneaker._id) === JSON.stringify(sneakerId)) {
        newTab.splice(index, 1);
      }
    });
    console.log(newTab);
    user.sneakers = newTab;
    await user.save();
    return res
      .status(200)
      .json(`${sneakerId} bas been removed from ${user.username} favorites`);
  } catch (e) {
    res.status(400).json(e);
  }
};

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

module.exports.likeSkan = async (req, res) => {
  try {
    const { userId, skanId } = req.body;

    if (!userId || !skanId) {
      throw "missing params";
    }
    const user = await users.findById(userId);
    if (!user) {
      throw `no user found for this id: ${userId}`;
    }
    const newFav = await skans.findById(skanId);
    if (!skanId) {
      throw new Error({ code: 401, message: "This pictuce no longer exist" });
    }

    /// Problème ici !

    if (skanId) {
      user.skans.map((skan) => {
        if (JSON.stringify(skan._id) === JSON.stringify(skanId)) {
          const error = new Error("already in favs");
          error.code = 403;
          throw error;
        }
      });
    }
    user.skans.push(newFav);
    await user.save();
    return res
      .status(200)
      .json(`${skanId} bas been added to ${user.username} favorites`);
  } catch (err) {
    console.log(err.message);
    res.status(err.code).json({ error: err.message });
  }
};

// TODO Error syntax on all routes
