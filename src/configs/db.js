const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectMongoDB = (app) => {
    mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Conectado ao MongoDB!')
    })
    .catch((error) => {
        console.log('Erro ao se conectar ao MongoDB: ', error)
    })
}

module.exports = connectMongoDB
