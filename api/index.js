const express = require("express");
const router = express.Router();
const {
  models: { Owner, Breed, Pet },
} = require("../db");

router.get("/pets", async (req, res, next) => {
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

router.get("/pets/:id", async (req, res, next) => {
  try {
    function checkIfValidUUID(str) {
      // Regular expression to check if string is a valid UUID
      const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
      return regexExp.test(str);
    }
    let pet;
    if (checkIfValidUUID(req.params.id)) {
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

router.delete("/pets/:id", async (req, res, next) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    await pet.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
