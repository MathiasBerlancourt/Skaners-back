const { users } = require("../../models");
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

module.exports.addFav = async (req, res) => {
  try {
    const { userId, objectId } = req.body;

    if (!userId || !objectId) {
      throw new Error({ code: 401, message: "missing params" });
    }
    const user = await users.findById(userId);
    if (!user) {
      throw new Error({
        code: 404,
        message: `no user found for this id: ${userId}`,
      });
    }
    const newFav = await sneakers.findById(objectId);
    if (!objectId) {
      throw new Error({ code: 401, message: "This pictuce no longer exist" });
    }

    /// Problème ici !

    if (objectId) {
      user.favorites.map((fav) => {
        if (JSON.stringify(fav._id) === JSON.stringify(objectId)) {
          throw new Error({ code: 401, message: "already in favs" });
        }
      });
    }
    user.favorites.push(newFav);
    // await user.save();
    return res
      .status(200)
      .json(`${objectId} bas been added to ${user.username} favorites`);
    //TODO check ERRORS
  } catch (e) {
    //console.log(Error.prototype);
    res.status(400).json(e.message);
  }
};

module.exports.removeFav = async (req, res) => {
  try {
    const { userId, objectId } = req.body;
    if (!userId || !objectId) {
      throw new Error({ code: 401, message: "missing params" });
    }
    const user = await users.findById(userId);
    if (!user) {
      throw new Error({
        code: 404,
        message: `no user found for this id: ${userId}`,
      });
    }
    const newTab = [...user.favorites];
    user.favorites.map((fav, index) => {
      if (fav._id === objectId) {
        return newTab.splice(index, 1);
      }
    });
    user.favorites = newTab;
    await user.save();
    return res
      .status(200)
      .json(`${objectId} bas been removed from ${user.username} favorites`);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
