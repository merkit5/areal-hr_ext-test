const express = require('express');
const router = express.Router();
const hrOperationsController = require('../controllers/hrOperationsController');

router.get('/', hrOperationsController.getAll);
router.post('/', hrOperationsController.create);
router.put('/:id', hrOperationsController.update);
router.delete('/:id', hrOperationsController.delete);

module.exports = router;