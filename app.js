const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const petsData = require("./db/petsData");

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const pets = petsData.list();
  res.send(require("./views/mainpage")(pets));
});

app.get("/pet/:id", (req, res) => {
  const pet = petsData.find(req.params.id);
  if (!pet.id) {
    res.status(404).send(require("./views/404page")());
  }
  res.send(require("./views/detailspage")(pet));
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
