require('dotenv').config()

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const conn = require('./db/conn')

const jcontroller = require('./controllers/JokesController')
const jokes = require('./routes/JokesRoutes')
const auth = require('./routes/AuthRoutes')

const app = express()

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.use(session({
    name: 'session',
    secret: 'nosso_segredo',
    resave: false,
    saveUninitialized: false,
    store: new fileStore({
        logfn: function(){},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
    }
}))

app.use((req, res, next) => {
    if(req.session.userID){
        res.locals.session = req.session
    }

    next()
})

app.get('/', jcontroller.exibir)
app.use('/jokes', jokes)
app.use('/', auth)

app.listen(process.env.PORT)
