var express = require('express');
var router = express.Router();
var passport = require('passport');
const dateUtils = require('../lib/utils/dateUtils.js');

// Definindo Middleware de autenticacao
function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login');
  }
}

/* GET home page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
  res.render('index/home.ejs', {});
});

/* GET Rota da tela de Login */
router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

/* POST Roda para enviar a requisicao de login e validar as inf 
    usando a estrategia de login definida no arquivo /lib/auth.js
 */
router.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login/?fail=true' })
);


// ==============================================================================================//
      /* ROTA DE TESTE QUE CHAMA A VIEW DE TESTE PARA TESTAR FUNCOES E MANDAR PARA A TELA */
// ==============================================================================================//
router.get('/teste', function(req, res, next) {
  global.db.collection("users").find({username:"lucas", email:"lucas@l*"}).toArray(function (err, result){
    res.render('telaTeste.ejs', { 
      lista:result
    });
  });
});


module.exports = router;