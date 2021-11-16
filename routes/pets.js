const express = require("express");
const router = express.Router();
const {
  models: { Owner, Breed, Pet },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const [pets, owners, breeds] = await Promise.all([
      Pet.findAll({
        include: [
          { model: Breed, as: "breed" },
          { model: Owner, as: "owner" },
        ],
        order: ["name"],
      }),
      Owner.findAll({
        order: ["firstName"],
      }),
      Breed.findAll({
        order: ["type", "name"],
      }),
    ]);
    res.send(require("../views/mainpage")(pets, owners, breeds));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    Pet.create({
      name: req.body.petName,
      dob: req.body.dob,
      ownerId: req.body.ownerId,
      breedId: req.body.breedId,
      picture: req.body.petPic,
    });
    res.redirect(`/`);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
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
      res.send(require("../views/detailspage")(pet));
    } else {
      res.redirect("/error");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    await pet.destroy();
    res.redirect(`/`);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
