const router = require('express').Router()
const orderController = require('../controllers/order.controller')
const { verrifyToken, verrifyTokenAndAuthorization, verrifyTokenAndAdmin } = require('../middlewares/verrifyToken')

router.get('/:id', verrifyTokenAndAuthorization, orderController.getUserOrder)
router.get('/', verrifyTokenAndAdmin, orderController.getAllUserOrder)
router.post('/', verrifyToken, orderController.createOrder)
router.patch('/', verrifyTokenAndAuthorization, orderController.updateOrder)
router.delete('/', verrifyTokenAndAuthorization, orderController.deleteOrder)

module.exports = router