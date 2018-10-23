const express = require('express');
const router = express.Router();
const db = require('../lib/db');

/* ===============  ROTAS USUARIO ============== */

/* Retorna a View de cadastro de Usuario para Login */
router.get('/signup', function (req, res, next) {
  let message;
  let blocos;
  db.getInformacoesCondominio(null, function (err, informacoes) {
    if (err) {

      console.log(JSON.stringify(err, null, 2));
      res.redirect('/');

    } else {

      informacoes.blocos ? blocos = informacoes.blocos : blocos = null;

      req.query.fail ? message = 'Falha no cadastro do usuário!' : message = null;

      res.render('signup', {
        message: message,
        blocos: blocos
      });

    }
  });
});

/* Rota de POST para criar um novo usuario */
router.post('/signup', function (req, res, next) {
  let usuario = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    nome: req.body.nome,
    rg: req.body.rg,
    dataNascimento: req.body.dataNascimento,
    telefone: req.body.telefone,
    apartamento: req.body.apartamento,
    bloco: req.body.bloco,
    hashSeed: "",
    isValido: true //True Mockado até implementar o administrador
  };

  db.findUser({
    username: usuario.username
  }, function (err, user) {

    if (user) {
      return res.status(500).send({"status": "500", "stack" : "Username já esta em uso."});
    }

    db.createUser(usuario, (err, result) => {
      if (err) res.status(500).send({"status": "500", "stack" : "Erro ao inserir usuario no banco"});
      res.status(200).send('Usuário cadastrado com sucesso!');
    });
  });
});

/* Rota de Get para checar se o nome de usuario ja esta em uso */
router.get('/checkUsername/:username', function (req, res, next) {
  db.findUser({
    username: req.params.username
  }, function (err, doc) {
    doc ? res.send(true) : res.send(false);
  });
});

module.exports = router;