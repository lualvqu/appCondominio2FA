var express = require('express');
var router = express.Router();
const db = require('../lib/db');
const twoAuth = require ('../lib/2auth');
const ObjectId = require("mongodb").ObjectId;

function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login');
  }
}

/* ============ ROTAS CODIGO 2AUTH ================ */

router.get('/', authenticationMiddleware(), async function(req, res, next){
    let qrCode;
    if (req.user.hashSeed !== "" ){
        qrCode = qrCode = await twoAuth.generateQR(req.user.hashSeed);
    }
    res.render('codigo/codigoIndex', {
        qrCode : qrCode
    });
});

router.get('/novoCodigo', authenticationMiddleware(), async function (req, res, next){
    let secret = twoAuth.generateSecret('base32');
    console.log(secret)
    await db.updateUser({_id:ObjectId(req.user._id)}, {hashSeed:secret});
    res.redirect('/codigo');
});

router.get('/validar', function(req, res, next){
    let blocos;
    db.getInformacoesCondominio(null, function (err, informacoes) {
        if (err) {
            console.log(JSON.stringify(err, null, 2));
            res.redirect('/');
        } else {
          informacoes.blocos ? blocos = informacoes.blocos : blocos = null
        }
        res.render('codigo/codigoValidar', {blocos:blocos})
    });
});

router.post('/autenticar', function(req, res, next){
        
    let token = req.body.codigo;

    let filtro = {
        bloco : req.body.bloco,
        apartamento: req.body.apartamento,
        isValido: true
    };

    db.findUser(filtro, function (err, user){
        if(user){
            res.send(twoAuth.validarCodigo(user.hashSeed, token));
        }
        else{
            res.send("usuario invalido");
        }
    });
});

module.exports = router;