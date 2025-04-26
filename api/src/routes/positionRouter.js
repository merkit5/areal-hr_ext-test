const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');
const {
  validateCreatePosition,
  validateUpdatePosition,
} = require('../validators/positionValidator');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, positionController.getAll);
router.get('/:id', authenticate, positionController.getById);
router.post('/', authenticate, validateCreatePosition, positionController.create);
router.put('/:id', authenticate, validateUpdatePosition, positionController.update);
router.delete('/:id', authenticate, positionController.delete);

module.exports = router;
