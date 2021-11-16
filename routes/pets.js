const express = require("express");
const router = express.Router();
const {
  models: { Owner, Breed, Pet },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const pets = await Pet.findAll({
      include: [
        { model: Breed, as: "breed" },
        { model: Owner, as: "owner" },
      ],
    });
    res.send(require("../views/mainpage")(pets));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pet = await Pet.findOne({
      where: { id: req.params.id },
      include: [
        { model: Breed, as: "breed" },
        { model: Owner, as: "owner" },
      ],
    });
    if (pet === undefined) {
      const error = new Error("Not a valid id");
      throw error;
    } else {
      res.send(require("../views/detailspage")(pet));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
