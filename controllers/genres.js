const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");

const get = async (req, res) => {
  const db = await low(adapter);
  const result = db.get("genres").value();
  const genres = Object.keys(result).map((each) => {
    const newItem = { ...result[each], id: each };
    return newItem;
  });
  res.send({
    data: genres,
    pagination: {
      message: "soon :)",
    },
  });
};

const create = async (req, res) => {
  const newGenre = req.body;
  const db = await low(adapter);

  const result = db.get("genres").value();
  const id = Date.now().toString();
  result[id] = { name: newGenre.name };

  db.get("genres").push(result).last().write();
  res.send(result);
};

const getOne = async (req, res) => {
  const db = await low(adapter);
  const result = db.get("genres").value();
  const genre = result[req.params.id];
  res.send(genre);
};

const remove = async (req, res) => {
  const db = await low(adapter);
  const genre = await db.get("genres").unset(req.params.id).write();
  if (genre.length === 0) {
    res.status(401);
    res.send({ error: true });
  } else {
    res.send({ success: true });
  }
};

const update = async (req, res) => {
  const db = await low(adapter);
  const result = db.get("genres").value();

  const updateDate = { name: req.body.name };
  result[req.params.id] = updateDate;

  db.get("genres").push(result).last().write();
  res.send(updateDate);
};

module.exports = { get, getOne, remove, create, update };
