const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4, DATEONLY } = Sequelize;
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

const Type = conn.define("tblType", {
  name: {
    type: STRING(20),
    allowNull: false,
  },
});

const Breed = conn.define("tblBreed", {
  name: {
    type: STRING(20),
    allowNull: false,
  },
});

Breed.belongsTo(Type);
Type.hasMany(Breed);

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

Pet.belongsTo(Breed);
Pet.belongsTo(Owner);

const syncAndSeed = async () => {
  // const SQL = `
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Little Bear', 1, '1990-04-03', 1, 6);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Remy', 1, '1990-04-03', 1, 4);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Batya', 3, '1990-04-03', 2, 3);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Rosy', null, '2000-04-03', 3, null);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Gilligan', 3, '2019-04-03', 1, 5);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Praya', 2, '2000-04-03', 1, 2);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Banze', 2, '2014-04-03', 1, 1);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Pisco', 2, '2017-04-03', 1, 1);
  //   INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Poseidon', 3, '2015-04-03', 2, 3);
  //   `;
  // await client.query(SQL);
  try {
    await conn.sync({ force: true });
    console.log(`Tables have been dropped;`);
    //create owners, types, and breeds (name only)
    const [
      kylie,
      simone,
      ilane,
      dog,
      cat,
      hedgehog,
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
      Type.create({ name: "dog" }),
      Type.create({ name: "cat" }),
      Type.create({ name: "hedgehog" }),
      Breed.create({ name: "Chinese Crested" }),
      Breed.create({ name: "Pyranese" }),
      Breed.create({ name: "American Short Hair" }),
      Breed.create({ name: "Cockapoo" }),
      Breed.create({ name: "Maltipoo" }),
      Breed.create({ name: "Rescue Mix" }),
      Breed.create({ name: "Shitzu" }),
      Breed.create({ name: "European Hedgehog" }),
    ]);
    //update breeds to have a type now that types have been created
    await Promise.all([
      [chinese, pyranese, cockapoo, maltipoo, rescue, shitzu].map((breed) =>
        breed.update({ typeId: dog.id })
      ),
      [ash].map((breed) => breed.update({ typeId: cat.id })),
      [ehedge].map((breed) => breed.update({ typeId: hedgehog.id })),
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

module.exports = { conn, syncAndSeed, models: { Owner, Type, Breed, Pet } };
