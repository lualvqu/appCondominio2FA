const crypt = require('./utils/crypt');

const createUser = function (username, password, email, callback){
    const cryptPwd = crypt.strToHash(password);
    console.log(cryptPwd);
    global.db.collection("users").insert({ username, password: cryptPwd, email }, function(err, result){
        callback(err, result)
    })
}
 
module.exports = { createUser }