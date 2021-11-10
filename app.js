const { client, syncAndSeed } = require("./db");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/pets", require("./routes/pets"));

app.get("/", (req, res) => {
  res.redirect("/pets");
});

app.use((req, res) => {
  res.status(404).send(require("./views/404page")());
});

const PORT = 1337;

const setUp = async () => {
  try {
    await client.connect();
    await syncAndSeed();
    app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

setUp();
