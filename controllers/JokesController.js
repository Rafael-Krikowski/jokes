const model = require('../models/JokesModel')

class JokesController {
    static async exibir(req, res){
        try{
            const data = await model.buscarTodas()
            console.log(data)
            return res.render('jokes/home', {data})
        }
        catch(erro){
            console.log(erro)
        }
        
    }

    static async exibirDashboard(req, res){
        const id = req.session.userID

        try{
            const data = await model.buscarJokes(id)
            return res.render('jokes/dashboard', {data})
            
        }
        catch(erro){
            console.log(erro)
            return
        }
        
        
    }

    static criarJoke(req, res){
        res.render('jokes/criacao')
    }

    static async inserirJoke(req, res){
        const id = req.session.userID
        const titulo = req.body.campoPiada
        let mensagem = 'Joke registrada com sucesso!'
        let verificado = false

        if(!titulo){
            mensagem = 'Campo vazio!'
            verificado = true
            res.render('jokes/criacao', {mensagem, verificado})
            return
        }

        try{
            await model.inserir(id, titulo)
            req.session.save(() => {
                res.render('jokes/criacao', {mensagem, verificado})
            })
        }
        catch(erro){
            console.log(erro)
            return
        }

    }

    static async deletarjoke(req, res){
        const id = req.params.id

        try{
            await model.deletar(id)
            return res.redirect('/jokes/dashboard')
        }
        catch(erro){
            console.log(erro)
        }

        
    }

    static async editarJoke(req, res){
        const id = req.params.id

        try{
            const data = await model.buscarJokePorId(id)
            console.log(data)
            return res.render('jokes/edicao', {id, data})
        }
        catch(erro){
            console.log(erro)
        }
        
    }

    static atualizarJoke(req, res){
        const id = req.params.id
        const joke = req.body.campoPiada

        try {
            model.atualizar(id, joke)
            res.redirect('/jokes/dashboard')
        }
        catch(erro){
            console.log(erro)
        }



        
    }
}

module.exports = JokesController