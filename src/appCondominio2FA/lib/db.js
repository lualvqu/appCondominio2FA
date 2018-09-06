const crypt = require('./utils/crypt');
 
module.exports = function () { 
    
    // =========== Area de Inserções no Banco de Dados =============== //

    const createUser = function (usuario, callback){
        usuario.password = crypt.strToHash(usuario.password)
        global.db.collection("users").insert(usuario, function(err, result){
            callback(err, result);
        });
    }

    const createVisitante = function (visitante, callback){
        global.db.collection("visitantes").insert(visitante, function (err, result){
            callback(err, result);
        });      
    }
    
    // =========  Area de Busca de Usuario no Banco de Dados ========= //
    const findById = function (id, document, callback){
        const ObjectId = require("mongodb").ObjectId;
        global.db.collection(document).findOne({_id: ObjectId(id) }, (err, doc) => {
            callback(err, doc);
        });
    }

    const findUser = function (username, callback){
        global.db.collection("users").findOne({"username": username}, function(err, doc){
            callback(err, doc);
        });
    }

    const findVisitantes = function (filtro, callback){
        global.db.collection("visitantes").find(filtro).toArray(function(err, results){
            callback(err, results);
        });
    } 
    
    return {
        createUser, 
        createVisitante,
        findUser, 
        findById,
        findVisitantes
    }
}();