const usuario = require('../models/UsuarioModel')
const bcrypt = require('bcryptjs')


class AuthController {
    static login(req, res){
        res.render('auth/login')
    }

    static registrar(req, res){
        res.render('auth/registro')
    }

    static async cadastrar(req, res){
        const {nome, email, senha, confirmaSenha} = req.body
        let verificacaoInvalida = false
        let sucesso = false
        let usuarioExiste = null
        let mensagem = ''

        if(!nome || !email || !senha || !confirmaSenha){
            verificacaoInvalida = true
            mensagem = 'Preencha todos os campos!'
            return res.render('auth/registro', {verificacaoInvalida, mensagem, sucesso})
        }

        if(senha != confirmaSenha){
            verificacaoInvalida = true
            mensagem = 'Senhas são diferentes!'
            return res.render('auth/registro', {verificacaoInvalida, mensagem, sucesso})
        }

        await usuario.buscar(email)
        .then(u => {
            usuarioExiste = u
        })
        .catch(erro => {
            console.log(erro)
        })

        if(!usuarioExiste){
            verificacaoInvalida = true
            mensagem = 'Email já cadastrado'
            return res.render('auth/registro', {verificacaoInvalida, mensagem, sucesso})
        }

        const salt = bcrypt.genSaltSync(10)
        const senhaHash = bcrypt.hashSync(senha, salt)

        try{
            await usuario.cadastrar(nome, email, senhaHash)
            const usuarioInfo = await usuario.buscarId(email)
            req.session.userID = usuarioInfo
            req.session.save(() => {
            res.redirect('/')
        })
        }
        catch(erro){
            console.log(erro)
            return
        }

    }

    static logout(req,res){
        req.session.destroy()
        res.redirect('/')
    }

    static async entrar(req, res){
        const {email, senha} = req.body
        let mensagem = ''
        let infoInvalida = true
        let verificarEmail = null
        let senhaHash = null
        let idUsuario = null

        try{
            verificarEmail = await usuario.buscar(email)
            senhaHash = await usuario.buscarSenha(email)
            idUsuario = await usuario.buscarId(email)
        }
        catch(erro){
            console.log(erro)
            return
        }

        if(verificarEmail.length == 0){
            mensagem = 'Email inválido!'
            return res.render('auth/login', {mensagem, infoInvalida})
        }

        let comparacaoSenha = bcrypt.compareSync(senha, senhaHash)

        if(!comparacaoSenha){
            mensagem = 'Senha inválida!'
            return res.render('auth/login', {mensagem, infoInvalida})
        }

        req.session.userID = idUsuario
        req.session.save(() => {
            res.redirect('/')
        })
    }
}

module.exports = AuthController