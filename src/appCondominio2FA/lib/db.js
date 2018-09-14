const crypt = require('./utils/crypt');
const ObjectId = require("mongodb").ObjectId;

 
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
    const findById = function (collection, id, callback){
        global.db.collection(collection).findOne({_id: ObjectId(id) }, (err, doc) => {
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

    // =========  Area de Exclusao de documentos no Banco de Dados ========= //

    const deleteById = function (collection, id, callback){
        global.db.collection(collection).remove({_id:ObjectId(id)}, function(err, numberOfRemovedDocs){
            callback(err, numberOfRemovedDocs);
        });
    }
    
    return {
        createUser, 
        createVisitante,
        findUser, 
        findById,
        findVisitantes,
        updateUser,
        getInformacoesCondominio,
        deleteById
    }
}();
