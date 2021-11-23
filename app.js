const { conn, syncAndSeed } = require("./db");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.use("/api", require("./api"));

app.use(function (err, req, res, next) {
  console.log(err);
  res
    .status(err.status || 500)
    .sendFile(path.join(__dirname, "./views/404page.html"));
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get("*", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "./views/404page.html"));
});

const setUp = async () => {
  try {
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
