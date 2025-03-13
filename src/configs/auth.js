const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Importando os dois modelos
const User = require('../models/User');
const Bibliotecary = require('../models/Bibliotecary');

function passportConfig(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'cpf', passwordField: 'password' },
        async (cpf, password, done) => {
            try {
                // Primeiro busca no User
                let usuario = await User.findOne({ cpf });
                if (usuario) {
                    // Verificando a senha do usuário
                    const isMatch = await bcrypt.compare(password, usuario.password);
                    if (isMatch) return done(null, usuario);
                    return done(null, false, { message: 'Senha incorreta!' });
                }
                
                // Se não encontrou no User, busca no Bibliotecary
                let bibliotecario = await Bibliotecary.findOne({ cpf });
                if (bibliotecario) {
                    // Verificando a senha do bibliotecário
                    const isMatch = await bcrypt.compare(password, bibliotecario.password);
                    if (isMatch) return done(null, bibliotecario);
                    return done(null, false, { message: 'Senha incorreta!' });
                }

                // Se não encontrou no User nem no Bibliotecary
                return done(null, false, { message: 'Conta não encontrada!' });
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((usuario, done) => {
        done(null, { id: usuario.id, role: usuario instanceof User ? 'user' : 'bibliotecary' });
    });

    passport.deserializeUser((obj, done) => {
        const Model = obj.role === 'user' ? User : Bibliotecary;
        Model.findById(obj.id)
            .then(usuario => {
                if (!usuario) return done(new Error('Usuário não encontrado'), null);
                done(null, usuario);
            })
            .catch(error => done(error, null));
    });
}

// Middleware para verificar se o usuário está autenticado
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Você precisa estar logado para acessar esta página');
    res.redirect('/');
}

// Middleware específico para bibliotecários
function isBibliotecary(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof Bibliotecary) {
        return next();
    }
    req.flash('error_msg', 'Acesso negado! Apenas bibliotecários podem acessar esta página.');
    res.redirect('/');
}

module.exports = {
    passportConfig,
    isAuthenticated,
    isBibliotecary
};
