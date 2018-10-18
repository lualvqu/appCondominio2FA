const nodemailer = require('nodemailer');
const db = require('./db');

module.exports = function () {

  const enviarEmail = (visita) => {

    db.findById('visitantes', visita.visitante_id, function (err, visitante) {
      if (err) return console.log("Erro ao encontrar visitante");
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "condominio2auth@gmail.com",
          pass: "emailtcc"
        }
      });

      let mailOptions = {
        from: 'condominio2auth@gmail.com',
        to: visitante.email,
        subject: 'Uma visita foi agendada para você.',
        text: 'Sua visita foi agendada dia ' + visita.data + ' as ' + visita.hora + ' , para acessar o condominio utilize o seguinte codigo: ' + visita.codigo,
        html: 'Sua  visita foi agendada dia ' + visita.data + ' as ' + visita.hora + ' , para acessar o condominio utilize o seguinte codigo: <b>' + visita.codigo + '</b>'
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
      });
    });
  };

  return {
    enviarEmail
  };

}();