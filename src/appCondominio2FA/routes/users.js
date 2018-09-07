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
  let usuario = {
    username: req.body.username, 
    password: req.body.password, 
    email: req.body.email,
    rg: req.body.rg,
    apartamento: req.body.apartamento,
    bloco: req.body.bloco,
    hashSeed: "",
    isValido: false
  }

  db.findUser(usuario.username, function (err, user){
    
    console.log("conteuo de err: " + err);
    if(user) { return res.redirect('/users/signup?fail=true&error=usernameError') }
    
    db.createUser(usuario, (err, result) => {
      if(err) res.redirect('/users/signup?fail=true');
      res.redirect('/');
    });

  });
});

module.exports = router;
