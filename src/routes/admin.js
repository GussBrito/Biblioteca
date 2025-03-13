const express = require('express')
const { isAuthenticated } = require('../configs/auth')
const Bibliotecary = require('../models/Bibliotecary')
const routerAdmin = express.Router()
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()


//Rota para adicionar bibliotecário
routerAdmin.post('/addBibliotecary', isAuthenticated, (req, res) => {
    const { bname, bemail, bcpf } = req.body

    const newBibliotecary = new Bibliotecary({
        name: bname,  
        email: bemail, 
        cpf: bcpf 
    })

    newBibliotecary.save()
    .then((bibliotecary) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASS
            }
        })  

        const link = `https://biblioteca-1zio.onrender.com/user/finalyAccount/${bibliotecary._id}`

        transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: bibliotecary.email,
            subject: `Conclusão de criação da conta de Bibliotecário`,
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #007bff;">Bem-vindo(a) à nosso Sistema, ${bibliotecary.name}!</h2>
                    <p style="font-size: 16px; color: #333;">Sua conta de bibliotecário foi criada com sucesso. Para acessar o sistema, você precisa definir sua senha.</p>
                    <a href="${link}" style="
                        background-color: #007bff; 
                        color: white; 
                        padding: 12px 20px; 
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 16px;
                        display: inline-block;
                        margin-top: 15px;">
                        Criar Minha Senha
                    </a>
                    <p style="font-size: 14px; color: #777; margin-top: 20px;">Se o botão não funcionar, copie e cole o seguinte link no seu navegador:</p>
                    <p style="font-size: 14px; color: #007bff;">${link}</p>
                    <br>
                    <p style="font-size: 14px; color: #777;">Se você não reconhece este cadastro, ignore este e-mail.</p>
                </div>
            </div>
            `
        })
        .then(() => {
            req.flash('success_msg', 'Bibliotecário adicionado e e-mail de verificação enviado!')
            return res.redirect(req.headers.referer)
        })
        .catch((error) => {
            req.flash('error_msg', 'Erro ao adicionar bibliotecário!')
            console.log(error)
            return res.redirect(req.headers.referer)
        })
    })
    .catch((error) => {
        console.log(error)
    })
})




module.exports = routerAdmin