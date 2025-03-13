const express = require('express')
const path = require('path')
const User = require('../models/User')
const routerLogin = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { isAuthenticated } = require('../configs/auth')
const Bibliotecary = require('../models/Bibliotecary')


routerLogin.get('/', (req, res) => {
    res.render('pages/login')
})

//Autenticando login do usuário
routerLogin.post('/', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
})


//Rota de Home page
routerLogin.get('/home', isAuthenticated, (req, res) => {
    const user = req.user
    Bibliotecary.find()
    .then((bibliotecary) => {
        res.render('pages/home', {
            user,
            bibliotecary
        })
    })
})


module.exports = routerLogin