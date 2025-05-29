const express = require('express')
const router = express.Router()

const jokes = require('../controllers/JokesController')
const authCheck = require('../services/auth')

router.get('/dashboard', authCheck.checarValidacao, jokes.exibirDashboard)
router.get('/editar/:id', authCheck.checarValidacao, jokes.editarJoke)
router.get('/criar', authCheck.checarValidacao, jokes.criarJoke)
router.post('/inserir', authCheck.checarValidacao, jokes.inserirJoke)
router.post('/deletar/:id', authCheck.checarValidacao, jokes.deletarjoke)
router.post('/atualizar/:id', authCheck.checarValidacao, jokes.atualizarJoke)
router.get('/', jokes.exibir)

module.exports = router