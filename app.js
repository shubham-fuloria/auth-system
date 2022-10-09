const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth.routes')
const {
  requireAuth,
  checkCurrentUser
} = require('./middlewares/auth.middleware')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI =
  'mongodb+srv://shubhamfuloria:Double@10200@cluster0.8rl7kxj.mongodb.net/?retryWrites=true&w=majority'
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(result => {
    app.listen(3000)
    console.log('Connected to the database')
  })
  .catch(err => console.log(err))

// routes
app.get('*', checkCurrentUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRouter)

// app.get('/set-cookies', (req, res) => {
//   //res.setHeader('Set-Cookie', 'new-user=true')
//   res.cookie('new-user', false, { maxAge: 1000 * 60 * 60 * 24, secure: true })
//   res.cookie('isEmployee', true, {})
//   res.status(200).send('YOu got the cooki es')
// })

// app.get('/get-cookies', (req, res) => {
//   console.log(req.cookies)
//   res.json(req.cookies)
// })
