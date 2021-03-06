require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const app = express();

const routes = require("./routes");

const port = process.env.PORT || 3002;

app.use(bodyParser.json({ extended: true }));
app.use("/api", routes);

const adapter = new FileSync("db.json");
const db = low(adapter);

const defaultSerie = {
  1: {
    name: "La casa de papel",
    status: "WATCHED",
    genre_id: 1,
    comments: "",
    poster: "//image.tmdb.org/t/p/original/yVUAfbrP5HDJugXraB7KQS0yz6Z.jpg",
    background: "//image.tmdb.org/t/p/original/piuRhGiQBYWgW668eSNJ2ug5uAO.jpg",
  },
};
const defaultGenre = {
  1: { name: "Ação" },
  2: { name: "Comédia" },
};
db.defaults({
  series: defaultSerie,
  genres: defaultGenre,
  count: 0,
}).write();

app.get("/", (req, res) =>
  res.send({
    info: "Minhas Séries Server",
    datetime: new Date(),
  })
);

app
  .listen(port, () => {
    console.log("Minhas Séries server running on port", port);
  })
  .on("error", (err) => {
    console.log("Error running Minhas Séries server");
    console.log(err);
  });
