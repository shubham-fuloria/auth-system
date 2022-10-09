const jwt = require('jsonwebtoken')

const User = require('../models/users.model')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  //check json web token is present && verified
  if (token) {
    jwt.verify(token, 'shubham is a good boy', (err, decodedToken) => {
      if (err) {
        res.redirect('/login')
      } else {
        console.log('decoded token : ', decodedToken)
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

//check current user

const checkCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'shubham is a good boy', async (err, decodedToken) => {
      if (err) {
        console.log(err.message)
        res.locals.user = null
        next()
      } else {
        console.log('decoded token: ', decodedToken.id)
        const user = await User.findById(decodedToken.id)
        console.log(user)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports = { requireAuth, checkCurrentUser }
