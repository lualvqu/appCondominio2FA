var express = require('express');
var router = express.Router();
const db = require('../lib/db');


/* ===============  ROTAS USUARIO ============== */

/* Retorna a View de cadastro de Usuario para Login */
router.get('/signup', function(req, res, next) {
  if(req.query.fail)
    res.render('signup', { message: 'Falha no cadastro do usuário!' });
  else
    res.render('signup', { message: null });
});
 
/* Rota de POST para criar um novo usuario */ 
router.post('/signup', function(req, res, next){
  db.createUser(req.body.username, req.body.password, req.body.email, (err, result) => {
    if(err) res.redirect('/signup?fail=true');
    res.redirect('/');
  });
});



/* ============ ROTAS VISITANTE ================ */

/* Roda de GET para criar um novo visitante */
router.get('/visitante/novo', function(req, res, next){
  res.render('visitanteCreate', {});
});

/* Rota de POST para criar um novo visitante */
router.post('/visitante/novo', function(req, res, next){
  let visitante = {
    nome: req.body.nome,
    rg:req.body.rg,
    cpf:req.body.cpf,
    telefoneFixo:req.body.telefoneFixo,
    celular:req.body.celular,
    email:req.body.email
  }
  db.createVisitante(visitante,(err, result) => {
    if (err) res.redirect('/visitante/novo?fail=true');
    res.redirect('/');
  });
});

module.exports = router;
