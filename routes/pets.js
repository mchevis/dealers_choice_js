const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(`
      SELECT 
        p.id, 
        p.name, 
        p.dob, 
        COALESCE(o.firstname, 'Up for adoption') AS owner_firstname, 
        COALESCE(o.lastinitial, '') AS owner_lastinitial, 
        t.name AS type, 
        COALESCE(b.name, 'Unknown') AS breed
      FROM tblPets p
      LEFT JOIN tblOwners o ON p.owner_id = o.id
      INNER JOIN tblTypes t ON p.type_id = t.id
      LEFT JOIN tblBreeds b ON p.breed_id = b.id AND b.type_id = t.id;
    `);
    const pets = response.rows;
    res.send(require("../views/mainpage")(pets));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const response = await client.query(
      `
      SELECT 
        p.id, 
        p.name, 
        p.dob, 
        COALESCE(o.firstname, 'Up for adoption') AS owner_firstname, 
        COALESCE(o.lastinitial, '') AS owner_lastinitial, 
        t.name AS type, 
        COALESCE(b.name, 'Unknown') AS breed
      FROM tblPets p
      LEFT JOIN tblOwners o ON p.owner_id = o.id
      INNER JOIN tblTypes t ON p.type_id = t.id
      LEFT JOIN tblBreeds b ON p.breed_id = b.id AND b.type_id = t.id
      WHERE p.id = $1
      ;
  `,
      [req.params.id]
    );
    const pet = response.rows[0];
    if (pet === undefined) {
      const error = new Error("Not a valid id");
      throw error;
    } else {
      res.send(require("../views/detailspage")(pet));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
