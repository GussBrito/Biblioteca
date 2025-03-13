const express = require('express')
const path = require('path')
const User = require('../models/User')
const routerLogin = express.Router()
const bcrypt = require('bcryptjs')


routerLogin.get('/', (req, res) => {
    res.render('pages/login')
})

routerLogin.post('/', (req, res) => {
    const { cpf, password, admPassword } = req.body

    User.findOne({cpf})
    .then((user) => {
        if(!user){
            req.flash('error_msg', 'Usuário não encontrado!')
            return res.redirect(req.headers.referer)
        }
        if(user.admPassword !== admPassword){
            req.flash('error_msg', 'Senha de administrador incorreta!')
            return res.redirect(req.headers.referer)
        }
        if(user.emailVerificado == false){
            req.flash('error_msg', 'Por favor! valide seu email para ter acesso ao sistema.')
            return res.redirect(req.headers.referer)
        }

        bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
            if (!isMatch) {
                req.flash('error_msg', 'Senha incorreta!')
                return res.redirect(req.headers.referer)
            }

            res.redirect('/home')

        })
        .catch((error) => {
            console.log(error)
        })
    })
    .catch((error) => {
        req.flash('error_msg', 'Erroa ao tentar fazer o login!')
        console.log(error)
        return res.redirect(req.headers.referer)
    })
})

//Rota de Home page
routerLogin.get('/home', (req, res) => {
    const user = req.user
    res.render('pages/home', {user})
})


module.exports = routerLogin