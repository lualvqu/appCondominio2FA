const crypt = require('./utils/crypt');
const ObjectId = require("mongodb").ObjectId;


module.exports = function () {

  // =========== Area de Inserções no Banco de Dados =============== //

  const createUser = function (usuario, callback) {
    usuario.password = crypt.strToHash(usuario.password);
    global.db.collection("users").insert(usuario, function (err, result) {
      callback(err, result);
    });
  };

  const createVisitante = function (visitante, callback) {
    global.db.collection("visitantes").insert(visitante, function (err, result) {
      callback(err, result);
    });
  };

  const createVisita = function (visita, callback) {
    global.db.collection("visitas").insert(visita, function (err, result) {
      callback(err, result);
    });
  };

  // =========  Area de Busca no Banco de Dados ========= //
  const findById = function (collection, id, callback) {
    global.db.collection(collection).findOne({
      _id: ObjectId(id)
    }, (err, doc) => {
      callback(err, doc);
    });
  };

  const findUser = function (filtro, callback) {
    global.db.collection("users").findOne(filtro, function (err, doc) {
      callback(err, doc);
    });
  };

  const findVisitantes = function (filtro, callback) {
    global.db.collection("visitantes").find(filtro).toArray(function (err, results) {
      callback(err, results);
    });
  };

  /* jshint ignore:start */
  const findVisitas = function (filtro, callback) {
    global.db.collection("visitas").find(filtro).toArray(async function (err, results) {
      if (!err) {
        let i;
        for (i = 0; i < results.length; i++) {
          results[i].visitante = await global.db.collection("visitantes").findOne({
            _id: ObjectId(results[i].visitante_id)
          });
        }
      }
      callback(err, results);
    });
  };
  /* jshint ignore:end */

  const getInformacoesCondominio = function (filtro, callback) {
    global.db.collection("condominio").findOne(filtro, function (err, doc) {
      callback(err, doc);
    });
  };

  // =========  Area de Atualizaçao de documentos no Banco de Dados ========= //

  const updateById = function (colletion, id, novosValores) {
    global.db.collection(colletion).updateOne({
      _id: ObjectId(id)
    }, {
      $set: novosValores
    });
  };

  const updateUser = function (filtro, novosValores) {
    global.db.collection("users").updateOne(filtro, {
      $set: novosValores
    });
  };

  // =========  Area de Exclusao de documentos no Banco de Dados ========= //

  const deleteById = function (collection, id, callback) {
    global.db.collection(collection).remove({
      _id: ObjectId(id)
    }, function (err, numberOfRemovedDocs) {
      callback(err, numberOfRemovedDocs);
    });
  };

  //========== Utils ===============//
  const compararIds = function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  return {
    createUser,
    createVisitante,
    createVisita,
    findUser,
    findById,
    findVisitantes,
    findVisitas,
    updateById,
    updateUser,
    getInformacoesCondominio,
    deleteById,
    compararIds
  };
}();