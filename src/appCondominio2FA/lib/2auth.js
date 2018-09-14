const speakeasy = require('speakeasy');
const QRCode = require('qrcode')

module.exports = function() {

    const KEY_URI_PATTER = "otpauth://totp/Condominio?secret=";
    const DIGITS = 6;
    const PERIOD = 30;
    const WINDOW = 1;
    const ENCONDING = 'base32';

    const generateSecret = (encode, lengthParam) => {
        let secret = speakeasy.generateSecret({length: lengthParam || 32})
        return encode ? secret[encode] : secret;
    };

    const getBase32 = secret => {
        return secret.base32;
    };

    const generateQR = async otUrl => {
        try{
            return await QRCode.toDataURL(KEY_URI_PATTER + otUrl + "&digits="+ DIGITS + "&period=" + PERIOD);    
        } catch(err){
            return err
        }
    };

    const validarCodigo = (secret, token) => {
        return speakeasy.totp.verify({
            secret: secret,         
            encoding: ENCONDING,     
            token: token,           
            window: WINDOW,             
            step: PERIOD
        });
    };

    return {
        generateSecret,
        generateQR,
        getBase32,
        validarCodigo
    };
}();
