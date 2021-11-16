const { conn, syncAndSeed } = require("./db");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(require("method-override")("_method"));

app.use("/pets", require("./routes/pets"));

app.get("/", (req, res) => {
  res.redirect("/pets");
});

const setUp = async () => {
  try {
    await conn.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 1337;
    app.listen(port, () => {
      console.log(`App listening in port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

setUp();
