const pg = require("pg");
const client = new pg.Client("postgres://localhost/dealers_choice_pets");

const syncAndSeed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS tblPets;
    DROP TABLE IF EXISTS tblBreeds;
    DROP TABLE IF EXISTS tblOwners;
    DROP TABLE IF EXISTS tblTypes;
    CREATE TABLE tblOwners (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(32) NOT NULL,
        lastInitial VARCHAR(1) NOT NULL
    );
    CREATE TABLE tblTypes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
    );
    CREATE TABLE tblBreeds (
        id SERIAL PRIMARY KEY,
        type_id INTEGER REFERENCES tblTypes(id),
        name VARCHAR(100)
    );
    CREATE TABLE tblPets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(32) NOT NULL,
        owner_id INTEGER REFERENCES tblOwners(id),
        dob DATE,
        type_id INTEGER NOT NULL REFERENCES tblTypes(id),
        breed_id INTEGER REFERENCES tblBreeds(id)
    );
    INSERT INTO tblOwners(firstName, lastInitial) VALUES('Kylie', 'B');
    INSERT INTO tblOwners(firstName, lastInitial) VALUES('Simone', 'F');
    INSERT INTO tblOwners(firstName, lastInitial) VALUES('Ilane', 'C');
    INSERT INTO tblTypes(name) VALUES('dog');
    INSERT INTO tblTypes(name) VALUES('cat');
    INSERT INTO tblTypes(name) VALUES('hedgehog');
    INSERT INTO tblBreeds(name, type_id) VALUES('Chinese Crested', 1);
    INSERT INTO tblBreeds(name, type_id) VALUES('Pyranese', 1);
    INSERT INTO tblBreeds(name, type_id) VALUES('American Short Hair', 2);
    INSERT INTO tblBreeds(name, type_id) VALUES('Cockapoo', 1);
    INSERT INTO tblBreeds(name, type_id) VALUES('Maltipoo', 1);
    INSERT INTO tblBreeds(name, type_id) VALUES('Rescue Mix', 1);
    INSERT INTO tblBreeds(name, type_id) VALUES('Shitzu', 1);
    INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Little Bear', 1, '1990-04-03', 1, 6);
    INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Remy', 1, '1990-04-03', 1, 4);
    INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Batya', 3, '1990-04-03', 2, 3);
    INSERT INTO tblPets(name, owner_id, dob, type_id, breed_id) VALUES('Rosy', 1, '2000-04-03', 3, null);
    `;
  await client.query(SQL);
};

module.exports = { client, syncAndSeed };
