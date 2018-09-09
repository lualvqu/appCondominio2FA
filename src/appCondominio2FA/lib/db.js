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
    
    // =========  Area de Busca no Banco de Dados ========= //
    const findById = function (id, document, callback){
        const ObjectId = require("mongodb").ObjectId;
        global.db.collection(document).findOne({_id: ObjectId(id) }, (err, doc) => {
            callback(err, doc);
        });
    }

    const findUser = function (filtro, callback){
        global.db.collection("users").findOne(filtro, function(err, doc){
            callback(err, doc);
        });
    }

    const findVisitantes = function (filtro, callback){
        global.db.collection("visitantes").find(filtro).toArray(function(err, results){
            callback(err, results);
        });
    } 

    const getInformacoesCondominio = function (filtro, callback){
        global.db.collection("condominio").findOne(filtro, function(err, doc){
            callback(err, doc);
        });
    }

    // =========  Area de Atualizaçao de documentos no Banco de Dados ========= //

    const updateUser = function (filtro, novosValores){
        global.db.collection("users").updateOne(filtro, {$set:novosValores})
    }
    
    return {
        createUser, 
        createVisitante,
        findUser, 
        findById,
        findVisitantes,
        updateUser,
        getInformacoesCondominio
    }
}();