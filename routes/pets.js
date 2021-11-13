const express = require("express");
const router = express.Router();
const {
  models: { Owner, Type, Breed, Pet },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const pets = await Pet.findAll();
    res.send(require("../views/mainpage")(pets));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pet = Pet.findByPk(req.params.id);
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
