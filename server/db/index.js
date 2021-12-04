const db = require("./db");
const Owner = require("./owner");
const Breed = require("./breed");
const Pet = require("./pet");

Pet.belongsTo(Breed, { as: "breed" });
Pet.belongsTo(Owner, { as: "owner" });

module.exports = { db, Owner, Breed, Pet };
