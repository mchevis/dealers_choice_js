const db = require("./db");
const Breed = require("./breed");
const Owner = require("./owner");
const { STRING, UUID, UUIDV4, DATEONLY, ENUM } = db.Sequelize;
const faker = require("faker");
const axios = require("axios");

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

Pet.createRandom = async function () {
  const picture = (await axios.get("https://dog.ceo/api/breeds/image/random"))
    .data;
  const owner = await Owner.findOne({ where: { firstName: "Simone" } });
  const breed = await Breed.findOne({ where: { type: "dog" } });
  return Pet.create({
    name: faker.name.firstName(),
    dob: faker.date.past(),
    picture: picture.message,
    breedId: breed.id,
    ownerId: owner.id,
  });
};

module.exports = Pet;
