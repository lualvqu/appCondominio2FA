const crypt = require('./utils/crypt');
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {

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

// =========  Funções de serialização e desserialização de usuário ========= //
passport.serializeUser(function(user, done){
    done(null,user._id);
});

passport.deserializeUser(function(id, done){
    findUserById(id, function(err,user){
        done(err, user);
    });
});

// =========  Estratégia de Autenticaçao ========= //

passport.use(new LocalStrategy( { 
    usernameField: 'username',
    passwordField: 'password'
},
(username, password, done) => {
    findUser(username, (err, user) => {
        
        if (err) { return done(err) }
        
        // usuário inexistente
        if (!user) { return done(null, false) }
        
        // comparando as senhas
        if(crypt.strToHash(password) == user.password){ return done(null, user); }
        else { return done(null, false); }
  })
}
));

}