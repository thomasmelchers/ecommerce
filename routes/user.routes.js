const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')
const { verrifyToken, verrifyTokenAndAuthorization, verrifyTokenAndAdmin } = require('../middlewares/verrifyToken')


//REGISTRATION

router.post('/register', authController.signUp)
router.get('/login', authController.signIn)

//USER
router.patch('/:id', verrifyTokenAndAuthorization, userController.update)
router.delete('/delete', verrifyTokenAndAuthorization, userController.delete)
router.get('/:id', verrifyTokenAndAdmin, userController.admin)
router.get('/', verrifyTokenAndAdmin, userController.allUsers)
router.get('/statistics', verrifyTokenAndAdmin, userController.stats)

module.exports = router