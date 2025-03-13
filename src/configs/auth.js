//Função que verifica se o usuário está autenticado
module.exports = function isAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    else{
        req.flash('error_msg', 'Você precisa está logado para acessar esta página')
        res.redirect('/')
    }
}