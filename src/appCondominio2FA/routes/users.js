var express = require('express');
var router = express.Router();
const db = require('../lib/db');

/* ===============  ROTAS USUARIO ============== */

/* Retorna a View de cadastro de Usuario para Login */
router.get('/signup', function(req, res, next) {
  let message;
  let blocos;
  db.getInformacoesCondominio(null, function (err, informacoes) {
    if (err) {
      
      console.log(JSON.stringify(err, null, 2));
      res.redirect('/');
    
    } else {

      informacoes.blocos ? blocos = informacoes.blocos : blocos = null
      
      req.query.fail ? message = 'Falha no cadastro do usuário!' : message = null
      
      res.render('signup', { message: message, blocos: blocos });

    }
  });
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
    
    if(user) { return res.redirect('/users/signup?fail=true&error=usernameError') }
    
    db.createUser(usuario, (err, result) => {
      if(err) res.redirect('/users/signup?fail=true');
      res.redirect('/');
    });
  });
});

module.exports = router;
