const router = require('express').Router()
const cartController = require('../controllers/cart.controller')
const { verrifyToken, verrifyTokenAndAuthorization, verrifyTokenAndAdmin } = require('../middlewares/verrifyToken')

router.get('/:id', verrifyTokenAndAuthorization, cartController.getUserCart)
router.get('/', verrifyTokenAndAdmin, cartController.getAllUserCart)
router.post('/', verrifyToken, cartController.createCart)
router.patch('/', verrifyTokenAndAuthorization, cartController.updateCart)
router.delete('/', verrifyTokenAndAuthorization, cartController.deleteCart)

module.exports = router