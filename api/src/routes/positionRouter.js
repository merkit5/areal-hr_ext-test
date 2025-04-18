const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');
const { validateCreatePosition, validateUpdatePosition } = require('../validators/positionValidator');

router.get('/', positionController.getAll);
router.get('/:id', positionController.getById);
router.post('/', validateCreatePosition, positionController.create);
router.put('/:id', validateUpdatePosition, positionController.update);
router.delete('/:id', positionController.delete);

module.exports = router;
