const express = require('express');
const router = express.Router();
const passport = require('passport');
const teste = require('./../lib/utils/dateUtils');
const mail = require('./../lib/mail');


// Definindo Middleware de autenticacao
function authenticationMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
}

/* GET home page. */
router.get('/', authenticationMiddleware(), function (req, res, next) {
  res.render('index/home.ejs', {});
});

/* GET Rota da tela de Login */
router.get('/login', function (req, res) {
  if (req.query.fail)
    res.render('login', {
      message: 'Usuário e/ou senha incorretos!'
    });
  else
    res.render('login', {
      message: null
    });
});

/* POST Roda para enviar a requisicao de login e validar as inf 
    usando a estrategia de login definida no arquivo /lib/auth.js
 */
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/?fail=true'
  })
);


// ==============================================================================================//
/* ROTA DE TESTE QUE CHAMA A VIEW DE TESTE PARA TESTAR FUNCOES E MANDAR PARA A TELA */
// ==============================================================================================//
router.get('/teste', function (req, res, next) {
  console.log('bateu aqui');
  console.log(teste.getStringHora());
  mail.enviarEmail();
  //console.log(JSON.stringify(req.body, null, 2));
  res.end();
});


module.exports = router;