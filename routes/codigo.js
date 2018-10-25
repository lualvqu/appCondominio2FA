const express = require('express');
const router = express.Router();
const dateUtils = require('../lib/utils/dateUtils');
const db = require('../lib/db');
const twoAuth = require('../lib/2auth');
const ObjectId = require("mongodb").ObjectId;

function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
}

/* ============ ROTAS CODIGO 2AUTH ================ */

// Disable Jshint code review by async/await incompatibility.
/* jshint ignore:start */
router.get('/', authenticationMiddleware(), async function (req, res, next) {
  let qrCode;
  if (req.user.hashSeed !== "") {
    qrCode = qrCode = await twoAuth.generateQR(req.user.hashSeed);
  }
  res.render('codigo/codigoIndex', {
    qrCode: qrCode
  });
});

router.get('/novoCodigo', authenticationMiddleware(), async function (req, res, next) {
  let secret = twoAuth.generateSecret('base32');
  await db.updateUser({
    _id: ObjectId(req.user._id)
  }, {
    hashSeed: secret
  });
  res.redirect('/codigo');
});

router.get('/validar', function (req, res, next) {
  let blocos;
  db.getInformacoesCondominio(null, function (err, informacoes) {
    if (err) {
      res.redirect('/');
    } else {
      informacoes.blocos ? blocos = informacoes.blocos : blocos = [];
    }
    res.render('codigo/codigoValidar', {
      blocos: blocos
    });
  });
});

router.post('/autenticar/:tipo', function (req, res, next) {

  let token = req.body.codigo;

  let filtroUser = {
    bloco: req.body.bloco,
    apartamento: req.body.apartamento,
    isValido: true
  };

  if (req.params.tipo == "morador") {

    db.findUser(filtroUser, function (err, user) {
      if (user) {
        res.send(twoAuth.validarCodigoMorador(user.hashSeed, token));
      } else {
        res.send("usuario invalido");
      }
    });

  } else if (req.params.tipo == "visitante") {
    let today = dateUtils.getStringDate();
    db.findUser(filtroUser, function (err, user) {
      let filtroVisita = {
        morador_id: ObjectId(user._id),
        codigo: token,
        data: today,
        isValido: true
      };

      db.findVisitas(filtroVisita, async function (err, results) {
        if (results.length == 1 && dateUtils.verificarHorarioVisita(results[0].hora)) {
          let entradas = results[0].entradas;
          entradas.push({
            hora: dateUtils.getStringHora()
          });
          await db.updateById("visitas", results[0]._id, {
            entradas: entradas
          });
          res.send(true);
        } else
          res.send(false);
      });
    });

  } else {
    res.status(404).end();
  }
});

/* jshint ignore:end */

module.exports = router;