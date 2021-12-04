const db = require("./db");
const { STRING, UUID, UUIDV4, DATEONLY, ENUM } = db.Sequelize;

const Breed = db.define("tblBreed", {
  name: {
    type: STRING(20),
    allowNull: false,
  },
  type: {
    type: ENUM("dog", "cat", "hedgehog"),
  },
});

module.exports = Breed;
