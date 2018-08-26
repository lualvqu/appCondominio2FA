const crypt = require('./utils/crypt');
 
module.exports = function () { 
    
    // =========== Area de Inserções no BAnco de Dados =============== //

    const createUser = function (username, password, email, callback){
        const cryptPwd = crypt.strToHash(password);
        console.log(cryptPwd);
        global.db.collection("users").insert({ username, password: cryptPwd, email }, function(err, result){
            callback(err, result);
        });
    }

    const createVisitante = function (visitante, callback){
        global.db.collection("visitantes").insert(visitante, function (err, result){
            callback(err, result);
        });      
    }
    
    // =========  Area de Busca de Usuario no Banco de Dados ========= //
    function findUser(username, callback){
        global.db.collection("users").findOne({"username": username}, function(err, doc){
            callback(err, doc);
        });
    }
    
    function findUserById(id, callback){
        const ObjectId = require("mongodb").ObjectId;
        global.db.collection("users").findOne({_id: ObjectId(id) }, (err, doc) => {
            callback(err, doc);
        });
    }
    
    return {
        createUser, 
        createVisitante,
        findUser, 
        findUserById 
    }
}();