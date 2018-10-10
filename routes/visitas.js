const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const ObjectId = require("mongodb").ObjectId;


function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login');
  }
}

router.get('/', authenticationMiddleware(), function(req, res, next) {
    db.findVisitas({morador_id:ObjectId(req.user._id)}, function (err, results){
        res.render('visitas/visitaIndex', {
            visitas:results
        });
    });
});

router.get('/agendar', authenticationMiddleware(), function (req, res, next) {
    db.findVisitantes({morador_id:ObjectId(req.user._id)}, function (err, results){
        res.render('visitas/visitaCreate', {
            visitantes:results
          });
    });
});

router.post('/agendar', authenticationMiddleware(), function(req, res, next) {
    let visita = {
        data: req.body.data,
        codigo: "000000",
        entradas: [],
        morador_id: ObjectId(req.user._id),
        visitante_id: ObjectId(req.body.visitante),
        isValido: true
    }
    db.createVisita(visita, (err, result) => {
        if (err) res.redirect('/visitas/novo?fail=true');
        res.redirect('/visitas');
    });
});

router.delete('/cancelar', authenticationMiddleware(), async function(req, res, next) {
    await db.updateById("visitas", req.body.id, {isValido:false});
    res.status(204).end();
});

module.exports = router;
