const router = require('express').Router()
const plantController = require ('../controllers/plant.controller')
const { verrifyToken, verrifyTokenAndAuthorization, verrifyTokenAndAdmin } = require('../middlewares/verrifyToken')

router.get('/', plantController.allPlants)
router.get('/:id', plantController.onePlant)
router.post('/', verrifyTokenAndAdmin, plantController.createPlant)
router.patch('/:id', verrifyTokenAndAdmin, plantController.updatePlant)
router.delete('/:id', verrifyTokenAndAdmin, plantController.deletePlant)

module.exports = router