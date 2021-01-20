const axios = require("axios");
const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");

const apiKey = "54bc8a90b9ec3f31addef0c092d7c22e";

const getSerieImage = async (name) => {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=pt-BR&query=${name}&page=1&include_adult=false`;
    const res = await axios.get(url);
    return {
      poster: `//image.tmdb.org/t/p/original${res.data.results[0].poster_path}`,
      background: `//image.tmdb.org/t/p/original${res.data.results[0].backdrop_path}`,
    };
  } catch (err) {}
  return { poster: "", background: "" };
};

const get = async (req, res) => {
  const db = await low(adapter);
  // const genres = db.get("genres").value();
  const result = db.get("series").value();

  const data = [];
  Object.keys(result).map((each) => {
    result[each]["id"] = each;
    // const genreId = result[each].genre_id;
    // const genreName = genres[genreId]?.name ?? "Removido";
    // result[each]["genre_name"] = genreName;
    const prepareData = { ...result[each] };
    data.push(prepareData);
  });
  res.send({
    data,
    pagination: {
      message: "soon :)",
    },
  });
};

const create = async (req, res) => {
  const db = await low(adapter);
  const newSerie = req.body;

  const images = await getSerieImage(newSerie.name);

  const serieToInsert = {
    name: newSerie.name,
    status: newSerie.status,
    genre_id: newSerie.genre_id,
    comments: newSerie.comments,
    poster: images.poster,
    background: images.background,
  };

  const result = db.get("series").value();
  const id = Date.now().toString();
  result[id] = serieToInsert;

  db.get("series").push(result).last().write();
  res.send(result);
};

const getOne = async (req, res) => {
  const db = await low(adapter);
  const genres = db.get("genres").value();
  const result = db.get("series").value();

  const serie = result[req.params.id];
  const genreId = serie.genre_id;
  const genreName = genres[genreId]?.name;
  serie["id"] = req.params.id;
  serie["genre_name"] = genreName;
  console.log(serie);
  res.send(serie);
};

const remove = async (req, res) => {
  const db = await low(adapter);
  const serie = await db.get("series").unset(req.params.id).write();
  if (serie.length === 0) {
    res.status(401);
    res.send({ error: true });
  } else {
    res.send({ success: true });
  }
};

const update = async (req, res) => {
  const db = await low(adapter);
  const updatedSerie = req.body;

  const result = db.get("series").value();
  const images = await getSerieImage(updatedSerie.name);

  const serieToUpdate = {
    name: updatedSerie.name,
    status: updatedSerie.status,
    genre_id: parseInt(updatedSerie.genre_id),
    comments: updatedSerie.comments,
    poster: images.poster,
    background: images.background,
  };

  result[req.params.id] = serieToUpdate;
  db.get("series").push(result).last().write();
  res.send(serieToUpdate);
};

module.exports = { get, getOne, remove, create, update };
