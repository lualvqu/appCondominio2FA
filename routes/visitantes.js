const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const ObjectId = require("mongodb").ObjectId;



function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
}

/* ============ ROTAS VISITANTE ================ */

/* Roda de GET para criar um novo visitante */
router.get('/', authenticationMiddleware(), function (req, res, next) {
  db.findVisitantes({
    morador_id: ObjectId(req.user._id)
  }, function (err, results) {
    res.render('visitantes/visitanteIndex', {
      visitantes: results
    });
  });
});

/* Roda de GET para a view de criar um novo visitante */
router.get('/novo', authenticationMiddleware(), function (req, res, next) {
  res.render('visitantes/visitanteCreate');
});

/* Roda de GET para a view de criar um novo visitante */
router.get('/visitante/informacoes', authenticationMiddleware(), function (req, res, next) {
  db.findById('visitantes', req.query.id, function (err, visitante) {
    if (!err && db.compararIds(visitante.morador_id, req.user._id)) {
      res.send(visitante);
    }
  });
});

/* Rota de POST para criar um novo visitante */
router.post('/novo', authenticationMiddleware(), function (req, res, next) {
  let visitante = {
    nome: req.body.nome,
    rg: req.body.rg,
    cpf: req.body.cpf,
    telefoneFixo: req.body.telefoneFixo,
    celular: req.body.celular,
    email: req.body.email,
    morador_id: ObjectId(req.user._id)
  };
  db.createVisitante(visitante, (err, result) => {
    if (err) res.redirect('/visitante/novo?fail=true');
    res.redirect('/visitantes');
  });
});

/* Rota de POST exclusao de um Visitante */
router.delete('/remover', authenticationMiddleware(), function (req, res, next) {
  db.findById('visitantes', req.body.id, (err, doc) => { //TODO: refatorar documento para CONSTANTE STRING
    if (!doc) {
      return res.render('error', {
        message: 'Erro na exclusão',
        error: {
          status: 503,
          stack: 'Erro Interno não esperado na tentativa de exclusao'
        }
      });
    }

    if (JSON.stringify(doc.morador_id) === JSON.stringify(req.user._id)) {
      db.deleteById('visitantes', req.body.id, (err, numberOfDocsRemoved) => {
        if (!err) {
          res.status(204).end();
        }
      });
    } else {
      res.render('error', {
        message: 'Erro na exclusao',
        error: {
          status: 401,
          stack: 'Voce nao tem permissao para excluir este usuario'
        }
      });
    }
  });
});

/* jshint ignore:start */
/* Rota de edicao de visitante */
router.post('/editar/:id', async function (req, res, next) {
  await db.updateById('visitantes', req.params.id, req.body);
  res.status(204).end();
});
/* jshint ignore:end */

module.exports = router;