const { users } = require("../../models");
const ObjectID = require("mongoose").Types.ObjectId;

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
