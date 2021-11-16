const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4, DATEONLY, ENUM } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/dealers_choice_pets"
);

const Owner = conn.define("tblOwner", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING(20),
    allowNull: false,
  },
  lastInitial: {
    type: STRING(1),
    allowNull: false,
  },
});

const Breed = conn.define("tblBreed", {
  name: {
    type: STRING(20),
    allowNull: false,
  },
  type: {
    type: ENUM("dog", "cat", "hedgehog"),
  },
});

const Pet = conn.define("tblPet", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING(20),
    allowNull: false,
  },
  dob: {
    type: DATEONLY,
  },
});

Pet.belongsTo(Breed, { as: "breed" });
Pet.belongsTo(Owner, { as: "owner" });

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });
    console.log(`Tables have been dropped;`);
    //create owners, types, and breeds (name only)
    const [
      kylie,
      simone,
      ilane,
      chinese,
      pyranese,
      ash,
      cockapoo,
      maltipoo,
      rescue,
      shitzu,
      ehedge,
    ] = await Promise.all([
      Owner.create({ firstName: "Kylie", lastInitial: "B" }),
      Owner.create({ firstName: "Simone", lastInitial: "F" }),
      Owner.create({ firstName: "Ilane", lastInitial: "C" }),
      Breed.create({ name: "Chinese Crested", type: "dog" }),
      Breed.create({ name: "Pyranese", type: "dog" }),
      Breed.create({ name: "American Short Hair", type: "cat" }),
      Breed.create({ name: "Cockapoo", type: "dog" }),
      Breed.create({ name: "Maltipoo", type: "dog" }),
      Breed.create({ name: "Rescue Mix", type: "dog" }),
      Breed.create({ name: "Shitzu", type: "dog" }),
      Breed.create({ name: "European Hedgehog", type: "hedgehog" }),
    ]);
    //create pets now that all the dependencies are taken care of
    await Promise.all([
      Pet.create({
        name: "Little Bear",
        dob: new Date(2010, 4, 3),
        breedId: rescue.id,
        ownerId: kylie.id,
      }),
      Pet.create({
        name: "Remy",
        dob: new Date(2008, 1, 5),
        breedId: cockapoo.id,
        ownerId: kylie.id,
      }),
      Pet.create({
        name: "Batya",
        dob: new Date(2008, 1, 5),
        breedId: ash.id,
        ownerId: ilane.id,
      }),
      Pet.create({
        name: "Rosie",
        dob: new Date(2008, 1, 5),
        breedId: ehedge.id,
        ownerId: kylie.id,
      }),
      Pet.create({
        name: "Gilligan",
        dob: new Date(2008, 1, 5),
        breedId: maltipoo.id,
        ownerId: ilane.id,
      }),
      Pet.create({
        name: "Praya",
        dob: new Date(2008, 1, 5),
        breedId: chinese.id,
        ownerId: simone.id,
      }),
      Pet.create({
        name: "Banze",
        dob: new Date(2008, 1, 5),
        breedId: chinese.id,
        ownerId: simone.id,
      }),
      Pet.create({
        name: "Pisco",
        dob: new Date(2008, 1, 5),
        breedId: chinese.id,
        ownerId: simone.id,
      }),
      Pet.create({
        name: "Poseidon",
        dob: new Date(2008, 1, 5),
        breedId: ash.id,
        ownerId: ilane.id,
      }),
    ]);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { conn, syncAndSeed, models: { Owner, Breed, Pet } };
