const express = require('express')
const router = express.Router()

const auth = require('../controllers/AuthController')


router.get('/login', auth.login)
router.post('/login', auth.entrar)
router.get('/registrar', auth.registrar)
router.post('/registrar', auth.cadastrar)
router.get('/logout', auth.logout)

module.exports = router