const { Schema } = require('mongoose')
const mongoose = require('mongoose')

//Criando modelo de usuário no banco de dados
const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, require: true},
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
    password: {type: String, required: true},
    tokenVerificacao: { type: String },
    emailVerificado: { type: Boolean, default: false },
    tokenVerificado: { type: String },
    role: {type: String, enum: ['bibliotecary', 'admin'], default: ''}
})

const User = mongoose.model('User', UserSchema)
module.exports = User