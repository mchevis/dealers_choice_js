const pets = [
  {
    id: 1,
    name: "Little Bear",
    ownerName: "Kylie B",
    dob: "04-03-2014",
    type: "dog",
    breed: "Mixed rescue",
  },
  {
    id: 2,
    name: "Remy",
    ownerName: "Kylie B",
    dob: "10-27-2005",
    type: "dog",
    breed: "Cockapoo",
  },
  {
    id: 3,
    name: "Chico",
    ownerName: "Simone F",
    dob: "09-14-2002",
    type: "dog",
    breed: "Shitzu",
  },
  {
    id: 4,
    name: "Poseidon",
    ownerName: "Ilane C",
    dob: "10-14-1998",
    type: "cat",
    breed: "Unknown",
  },
  {
    id: 5,
    name: "Banze",
    ownerName: "Simone F",
    dob: "10-14-2010",
    type: "dog",
    breed: "Chinese Crested",
  },
  {
    id: 6,
    name: "Pisco",
    ownerName: "Simone F",
    dob: "10-14-2014",
    type: "dog",
    breed: "Chinese Crested",
  },
  {
    id: 7,
    name: "Praya",
    ownerName: "Simone F",
    dob: "10-14-2020",
    type: "dog",
    breed: "Pyranese",
  },
  {
    id: 8,
    name: "Rosy",
    ownerName: "Donna B",
    dob: "12-14-2017",
    type: "hedgehog",
    breed: "Unknown",
  },
];

const list = () => {
  return [...pets]; // Notice that we're returning a copy of the array, so the original data is safe. This is called 'immutability'.
};

const find = (id) => {
  const pet = pets.find((pet) => pet.id === id * 1);
  return { ...pet }; // Again, we copy the post data before returning so the original information is safe.
};

module.exports = { list: list, find: find };
