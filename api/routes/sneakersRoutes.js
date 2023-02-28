const express = require("express");
const router = express.Router();

const { sneakers } = require("../../models");

router.get("/sneakers", async (req, res) => {
  try {
    const findSneaker = await sneakers.find();
    res.json(findSneaker);
  } catch (e) {
    console.log(e);
    return "Error";
  }
});

router.get("/sneakers/:id", async (req, res) => {
  try {
    const findSneaker = await sneakers.findById(req.params.id);
    res.json(findSneaker);
  } catch (error) {
    res.status(404).json({ error: "Bad request" });
  }
});

module.exports = router;
