var express = require('express');
var router = express.Router();
const dateUtils = require('../public/utils/dateUtils.js');

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
router.get('/', function(req, res, next) {
  res.render('index', { 
    getDate: dateUtils.getDate,
    getDayWeek: dateUtils.getDayWeek,
    getMonth: dateUtils.getMonth,
    historico: historico
}
);
});

module.exports = router;
