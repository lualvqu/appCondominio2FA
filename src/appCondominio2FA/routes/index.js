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
    res.redirect('/login')
  }
}

//Dados Mockados para teste
let historico = [
{
    img: "https://files.gotocon.com/uploads/images/conference_3/topics/63/original/checkmark.svg",
    status: "Entrada Autoriazada",
    data: "04/08",
    hora: "10:40"
},
{   
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Emojione1_274C.svg/2000px-Emojione1_274C.svg.png",
    status: "Código Incorreto",
    data: "04/08",
    hora: "10:42"
},
{
    img: "https://files.gotocon.com/uploads/images/conference_3/topics/63/original/checkmark.svg",
    status: "Entrada Autoriazada",
    data: "04/08",
    hora: "10:45"
}
]

/* GET home page. */
router.get('/', authenticationMiddleware(), function(req, res, next) {
  res.render('index', { 
    getDate: dateUtils.getDate,
    getDayWeek: dateUtils.getDayWeek,
    getMonth: dateUtils.getMonth,
    historico: historico,
    username: req.user.username
}
);
});

/* GET Rota da tela de Login */
router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

/* POST Roda para enviar a requisicao de login e validar as inf */
router.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login?fail=true' })
);

module.exports = router;