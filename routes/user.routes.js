const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')


//REGISTRATION

router.post('/register', authController.signUp)
router.get('/login', authController.signIn)

module.exports = router