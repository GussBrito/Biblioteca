const express = require('express')
const User = require('../models/User.js')
const routerRegister = express.Router()
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const Bibliotecary = require('../models/Bibliotecary.js')

//Rota para tela de cadastro
routerRegister.get('/register', (req, res) => {
    res.render('pages/register')
})

//Rota para cadastrar usuário
routerRegister.post('/register', (req, res) => {
    //Pegando dados do formulário
    const { username, email, cpf, password, passwordReap } = req.body

    //Validações
    if(password !== passwordReap){
        req.flash('error_msg', 'As senhas não coincidem!')
        return res.redirect(req.headers.referer)
    }
    if(password.length < 5){
        req.flash('error_msg', 'A senha tem que ter no mínimo 5 caracteres!')
        return res.redirect(req.headers.referer)
    }
    //Filtrando usuário pelo cpf e email
    User.findOne({$or: [{cpf}, {email}]})
    .then((user) => {
        if(user && user.cpf === cpf){
            req.flash('error_msg', 'CPF já cadastrado!')
            return res.redirect(req.headers.referer)
        }

        if(user && user.email === email){
            req.flash('error_msg', 'E-mail já cadastrado!')
            return res.redirect(req.headers.referer)
        }

        //Gerando token de autenticação
            const token = crypto.randomBytes(32).toString('hex')

            //Gerando senha de adm
            const length = 5
            const admPass = crypto.randomBytes(length).toString('base64').replace(/[^a-zA-Z0-9]/g, "").slice(0, length)


            //Criptografando senha
            const houndSalts = 10
            bcrypt
            .hash(password, houndSalts)
            .then((hash) => {

                //Criando usuário no banco de dados
                const newUser = new User({
                    username,
                    email,
                    cpf,
                    password: hash,
                    tokenVerificacao: token,
                    emailVerificado: false,
                    admPassword: admPass
                })

                //Salvando usuário
                newUser.save()
                .then((newUser) => {

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.USER_EMAIL,
                            pass: process.env.USER_PASS
                        }
                    })

                    //Gerando link de verificação
                    const link = `https://biblioteca-1zio.onrender.com/user/verifyEmail/${token}`

                    transporter.sendMail({
                        to: newUser.email,
                        from: process.env.USER_EMAIL,
                        subject: `Validação da conta`,
                        html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                            <h2>Olá, ${newUser.username}, Bem-vindo à nossa plataforma!</h2>
                            <p>Para ativar sua conta, clique no botão abaixo:</p>
                            <a href="${link}" style="
                            background-color: #007bff; 
                            color: white; 
                            padding: 10px 20px; 
                            text-decoration: none;
                            border-radius: 5px;
                            display: inline-block;">
                            Verificar E-mail
                            </a>
                            <p>Ou copie e cole este link no seu navegador:</p>
                            <p>${link}</p>
                            <br>
                            <p>A sua senha de admin é <strong>${newUser.admPassword}</strong></p>
                        </div>
                        `
                    })
                    .then(() => {
                        req.flash('success_msg', 'Cadastro realizado com sucesso, verifique seu email para validar a conta!')
                        return res.redirect('/')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
                .catch((error) => {
                    req.flash('error_msg', 'Erro ao tentar se cadastrar!')
                    console.log(error)
                    return res.redirect(req.headers.referer)
                })
            })
            .catch((error) => {
                console.log('Erro ao tentar criptografar senha!', error)
            })
        })

    })

//Rota para validar email
routerRegister.get('/verifyEmail/:token', (req, res) => {
    //Pegando token da url
    const { token } = req.params

    //Buscando usuário pelo token
    User.findOne({tokenVerificacao: token})
    .then((usuario) => {
        if(!usuario){
            return res.status(400).send('Link de validação inválido ou expirado!')
        }
        usuario.emailVerificado = true
        usuario.tokenVerificacao = null

        return usuario.save()
    })
    .then(() => {
        res.send('email validado com sucesso!')
    }).catch((error) => {
        console.log(`erro: ${error}`)
        if(!res.hasHeader){
            res.status(500).send(`Erro ao validar e-mail ERRO: ${error}`)
        }  
    })
})

//Rota para criação da senha
routerRegister.get('/finalyAccount/:idUser', (req, res) => {
    res.render('pages/finalyAccount')
})

//Rota para adição de senha de bibliotecário
routerRegister.post('/finalyAccount/:idUser', (req, res) => {
    const { idUser } = req.params
    const { password, passwordR } = req.body

    if(password !== passwordR){
        req.flash('error_msg', 'As senhas não coincidem!')
        return res.redirect(req.headers.referer)
    }

    if(password.length < 5){
        req.flash('error_msg', 'A senha tem que ter no mínimo 5 caracteres!')
        return res.redirect(req.headers.referer)
    }

    const houndSalts = 10
    bcrypt
    .hash(password, houndSalts)
    .then((hash) => {
        Bibliotecary.findByIdAndUpdate(idUser, { password: hash })
        .then(() => {
            req.flash('success_msg', 'Senha definida com sucesso!')
            return res.redirect('/')
        })
        .catch((error) => {
            req.flash('error_msg', 'Erro ao tentar definir senha!')
            console.log(error)
            return res.redirect(req.headers.referer)
        })
    })
})



module.exports = routerRegister