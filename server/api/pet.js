const express = require("express");
const router = express.Router();
const { Owner, Breed, Pet } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(
      await Pet.findAll({
        include: [
          { model: Breed, as: "breed" },
          { model: Owner, as: "owner" },
        ],
        order: ["name"],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    let pet;
    if (req.params.id) {
      pet = await Pet.findOne({
        where: { id: req.params.id },
        include: [
          { model: Breed, as: "breed" },
          { model: Owner, as: "owner" },
        ],
      });
    } else {
      pet = undefined;
    }
    if (pet) {
      res.send(pet);
    } else {
      const error = Error("Pet not found");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    await pet.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
