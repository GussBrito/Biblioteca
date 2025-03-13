const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const BibliotecarySchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    cpf: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (cpf) {
            return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
          },
          message: "CPF inválido! O formato deve ser XXX.XXX.XXX-XX",
        },
    },
    password: {type: String},
    role: {type: String, enum: 'bibliotecary', default: 'bibliotecary'}
})

const Bibliotecary = mongoose.model('Bibliotecary', BibliotecarySchema)
module.exports = Bibliotecary