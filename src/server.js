//Importando módulos
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const connectDataBase = require('./configs/db')
const passport = require('passport')

//Configurações

//Parser de json e formulário
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Engine hbs
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        eq: (a, b) => {
            return a===b
        }
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

//Configuração de sessão
app.use(
    session({
        secret: 'c4lmac4labr3zo',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
)

//Configuração do passport
const { passportConfig } = require('./configs/auth')
passportConfig(passport)
app.use(passport.initialize())
app.use(passport.session())

//Cofiguração das mensagens flash
app.use(flash())

//Configuração das mensagens flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash("error")
    res.locals.user = req.user

    next()
})

//Arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')))

//Conexão ao banco de dados
connectDataBase(app)

//Importação das rotas
const login = require('./routes/login')
const register = require('./routes/register')
const admin = require('./routes/admin')

app.use('/admin', admin)
app.use('/user', register)
app.use('/', login)

//Conexão ao servidor
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Conectado ao servidor na porta: ${PORT}`)
})

