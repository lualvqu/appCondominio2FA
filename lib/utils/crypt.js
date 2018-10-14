const crypto = require('crypto');

module.exports = function () {

  // ========= Criptografar senha para hash ========== //
  const strToHash = function (string) {
    return crypto.createHmac('sha256', string)
      .update('Incremento de salt para aumentar a seguranca')
      .digest('hex');
  };

  return {
    strToHash
  };

}();