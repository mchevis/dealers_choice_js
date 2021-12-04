const db = require("./db");
const { STRING, UUID, UUIDV4, DATEONLY, ENUM } = db.Sequelize;

const Pet = db.define("tblPet", {
  name: {
    type: STRING(20),
    allowNull: false,
  },
  dob: {
    type: DATEONLY,
  },
  picture: {
    type: STRING(),
    //normally i'd have validated it but my current seeding method doesn't allow it and I dont wanna upload all these pics to imgur
    // validate: { isUrl: true },
  },
});

module.exports = Pet;
