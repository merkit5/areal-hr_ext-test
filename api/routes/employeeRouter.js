const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getByIdFull);
router.post('/', EmployeeController.createFull);
router.put('/:id', EmployeeController.updateFull);
router.delete('/:id', EmployeeController.deleteFull);

module.exports = router;