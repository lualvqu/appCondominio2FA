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
    res.redirect('/visitantes');
  });
});

/* Rota de POST exclusao de um Visitante */
router.get('/excluir/:id', authenticationMiddleware(), function (req, res, next){
  db.findById('visitantes', req.params.id, (err, doc) => { //TODO: refatorar documento para CONSTANTE STRING
    if (JSON.stringify(doc.morador_id) === JSON.stringify(req.user._id)){
      db.deleteById('visitantes', req.params.id, (err, numberOfDocsRemoved) => {
        if ( !err ) { res.redirect('/visitantes') }
      })
    }
    else{
      res.render('error', {
        message:'Erro na exclusao', 
        error: {
          status:401, 
          stack:'Voce nao tem permissao para excluir este usuario' 
        }
      });
    }
  });
});

/* Rota de teste */
router.post('/editar/:id', function (req, res, next){
  console.log('bateu aqui')
  console.log(JSON.stringify(req.body, null, 2));
});

module.exports = router;
