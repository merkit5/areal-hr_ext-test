const express = require('express');
const router = express.Router();
const hrOperationsController = require('../controllers/hrOperationsController');
const {
  validateCreateHrOperation,
  validateUpdateHrOperation,
} = require('../validators/hrOperationsValidator');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, hrOperationsController.getAll);
router.get('/:id', authenticate, hrOperationsController.getById);
router.get('/employee/:employeeId/history', authenticate, hrOperationsController.getEmployeeHistory);
router.post('/', authenticate, validateCreateHrOperation, hrOperationsController.create);
router.put('/:id', authenticate, validateUpdateHrOperation, hrOperationsController.update);
router.delete('/:id', authenticate, hrOperationsController.delete);

module.exports = router;
