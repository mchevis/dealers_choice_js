const { db, Owner, Breed, Pet } = require("../server/db/");

const seed = async () => {
  try {
    await db.sync({ force: true });
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
        picture: "/littlebear.jpg",
      }),
      Pet.create({
        name: "Remy",
        dob: new Date(2008, 1, 5),
        breedId: cockapoo.id,
        ownerId: kylie.id,
        picture: "/remy.jpg",
      }),
      Pet.create({
        name: "Batya",
        dob: new Date(2008, 1, 5),
        breedId: ash.id,
        ownerId: ilane.id,
        picture: "/batya.jpg",
      }),
      Pet.create({
        name: "Rosie",
        dob: new Date(2008, 1, 5),
        breedId: ehedge.id,
        ownerId: kylie.id,
        picture: "/rosie.jpg",
      }),
      Pet.create({
        name: "Gilligan",
        dob: new Date(2008, 1, 5),
        breedId: maltipoo.id,
        ownerId: ilane.id,
        picture: "/gilligan.jpg",
      }),
      Pet.create({
        name: "Praya",
        dob: new Date(2008, 1, 5),
        breedId: pyranese.id,
        ownerId: simone.id,
        picture: "/praya.jpg",
      }),
      Pet.create({
        name: "Banze",
        dob: new Date(2008, 1, 5),
        breedId: chinese.id,
        ownerId: simone.id,
        picture: "/banze.jpg",
      }),
      Pet.create({
        name: "Pisco",
        dob: new Date(2008, 1, 5),
        breedId: chinese.id,
        ownerId: simone.id,
        picture: "/pisco.jpg",
      }),
      Pet.create({
        name: "Poseidon",
        dob: new Date(2008, 1, 5),
        breedId: ash.id,
        ownerId: ilane.id,
        picture: "/poseidon.jpg",
      }),
    ]);
    db.close();
    console.log(`
    
        Seeding successful!
        
    `);
  } catch (err) {
    db.close();
    console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `);
  }
};

seed();
