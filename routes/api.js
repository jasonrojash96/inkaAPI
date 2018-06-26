var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var ObjectId = require("mongojs").ObjectId;
var db = mongojs(
  "mongodb://inkachallenge:inkachallenge2@ds159100.mlab.com:59100/inkachallenge",
  ["ranking"]
);

router.get("/ranking", (req, res) => {
  db.ranking.find({}).sort({puntaje:-1}).limit(5).toArray((err, docs) => {
    res.status(200).send(docs);
  });
});

router.post("/ranking", (req, res) => {
  console.log(req.body)
  if (!req.body.puntaje || !req.body.nombre) {
    res.status(400).send({ code: 1, msg: "Parametros invalidos" });
    return;
  }
  db.ranking.insert({
    nombre: req.body.nombre,
    puntaje: Number(req.body.puntaje)
  });
  res.status(200).send({code : 0 , msg : "Registro válido"});
});

module.exports = router;
