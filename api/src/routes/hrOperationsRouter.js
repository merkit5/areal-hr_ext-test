const express = require('express');
const router = express.Router();
const hrOperationsController = require('../controllers/hrOperationsController');
const { validateCreateHrOperation, validateUpdateHrOperation } = require('../validators/hrOperationsValidator');

router.get('/', hrOperationsController.getAll);
router.post('/', validateCreateHrOperation, hrOperationsController.create);
router.put('/:id', validateUpdateHrOperation, hrOperationsController.update);
router.delete('/:id', hrOperationsController.delete);

module.exports = router;