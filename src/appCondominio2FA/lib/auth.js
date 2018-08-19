const crypt = require('./utils/crypt');
const db = require('./db');
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport) {

// =========  Funções de serialização e desserialização de usuário ========= //
passport.serializeUser(function(user, done){
    done(null,user._id);
});

passport.deserializeUser(function(id, done){
    db.findUserById(id, function(err,user){
        done(err, user);
    });
});

// =========  Estratégia de Autenticaçao ========= //

passport.use(new LocalStrategy( { 
    usernameField: 'username',
    passwordField: 'password'
},
(username, password, done) => {
    db.findUser(username, (err, user) => {
        
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