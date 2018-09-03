var express = require('express');
var router = express.Router();
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

/* ============ ROTAS VISITANTE ================ */

/* Roda de GET para criar um novo visitante */
router.get('/', authenticationMiddleware(), function(req, res, next){
  db.findVisitantes({morador_id:ObjectId(req.user._id)}, function (err, results){
    res.render('Visitantes/visitanteIndex', {
      visitantes:results
    });
  })
});

/* Roda de GET para criar um novo visitante */
router.get('/novo', authenticationMiddleware(), function(req, res, next){
  res.render('Visitantes/visitanteCreate', {teste : req.user._id});
});

/* Rota de POST para criar um novo visitante */
router.post('/novo', authenticationMiddleware(), function(req, res, next){
  let visitante = {
    nome: req.body.nome,
    rg:req.body.rg,
    cpf:req.body.cpf,
    telefoneFixo:req.body.telefoneFixo,
    celular:req.body.celular,
    email:req.body.email,
    morador_id: ObjectId(req.user._id)
  }
  db.createVisitante(visitante,(err, result) => {
    if (err) res.redirect('/visitante/novo?fail=true');
    res.redirect('/');
  });
});

/* Rota de POST exclusao de um Visitante */


module.exports = router;
