const express = require('express');
const randomstring = require("randomstring");
const router = express.Router();
const db = require('../lib/db');
const mail = require('../lib/mail');
const ObjectId = require("mongodb").ObjectId;

function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
}

const verificarTokenDuplicado = function (visitas, token) {
  let retorno = false;
  for (let i = 0; i < visitas.length; i++) {
    if (visitas[i].codigo == token) {
      retorno = true;
      break;
    }
  }
  return retorno;
};

const gerarRandomToken = function (size) {
  return randomstring.generate({
    length: size,
    charset: 'numeric'
  });
};

router.get('/', authenticationMiddleware(), function (req, res, next) {
  db.findVisitas({
    morador_id: ObjectId(req.user._id)
  }, function (err, visitas) {
    db.findVisitantes({
      morador_id: ObjectId(req.user._id)
    }, function (err, visitantes) {
      console.log(visitas);
      res.render('visitas/visitaIndex', {
        title: "Visitas",
        username: req.user.username,
        navIndex:3,
        visitantes: visitantes,
        visitas: visitas
      });
    });
  });
});

router.get('/agendar', authenticationMiddleware(), function (req, res, next) {
  db.findVisitantes({
    morador_id: ObjectId(req.user._id)
  }, function (err, results) {
    res.render('visitas/visitaCreate', {
      visitantes: results
    });
  });
});

router.post('/agendar', authenticationMiddleware(), function (req, res, next) {

  let filtroVisita = {
    morador_id: req.user._id,
    data: req.body.data
  };

  db.findVisitas(filtroVisita, function (err, results) {

    let token = gerarRandomToken(6);

    if (results.length > 0) {
      while (verificarTokenDuplicado(results, token)) {
        token = gerarRandomToken(6);
      }
    }

    let visita = {
      data: req.body.data,
      hora: req.body.hora + ":00",
      codigo: token,
      entradas: [],
      morador_id: ObjectId(req.user._id),
      visitante_id: ObjectId(req.body.visitante),
      isValido: true
    };
    db.createVisita(visita, (err, result) => {
      if (err) res.redirect('/visitas/novo?fail=true');
      mail.enviarEmail(visita);
      res.redirect('/visitas');
    });

  });
});

/* jshint ignore:start */
router.delete('/cancelar', authenticationMiddleware(), async function (req, res, next) {
  await db.updateById("visitas", req.body.id, {
    isValido: false
  });
  res.status(204).end();
});
/* jshint ignore:end */

module.exports = router;