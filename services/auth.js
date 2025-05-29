const checarValidacao = (req, res, next) => {
    if(!req.session.userID){
        return res.redirect('/login?acesso-negado')
    }

    next()
}

module.exports = {checarValidacao}