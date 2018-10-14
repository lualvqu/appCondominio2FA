const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

module.exports = function () {

  const KEY_URI_PATTER = "otpauth://totp/Condominio?secret=";
  const DIGITS = 6;
  const ENCONDING = 'base32';
  const PERIOD_MORADOR = 30;
  const WINDOW_MORADOR = 1;
  const PERIOD_VISITANTE = 30;
  const WINDOW_VISITANTE = 1;

  const generateSecret = (encode, lengthParam) => {
    let secret = speakeasy.generateSecret({
      length: lengthParam || 32
    });
    return encode ? secret[encode] : secret;
  };

  const getBase32 = secret => {
    return secret.base32;
  };

  /* jshint ignore:start */
  const generateQR = async otUrl => {
    try {
      return await QRCode.toDataURL(KEY_URI_PATTER + otUrl + "&digits=" + DIGITS + "&period=" + PERIOD_MORADOR);
    } catch (err) {
      return err;
    }
  };
  /* jshint ignore:end */

  const validarCodigoMorador = (secret, token) => {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: ENCONDING,
      token: token,
      window: WINDOW_MORADOR,
      step: PERIOD_MORADOR
    });
  };

  return {
    generateSecret,
    generateQR,
    getBase32,
    validarCodigoMorador
  };
}();