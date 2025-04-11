const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const { validateCreateEmployee, validateUpdateEmployee } = require('../validators/employeeValidator');

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getByIdFull);
router.post('/', validateCreateEmployee, EmployeeController.createFull);
router.put('/:id', validateUpdateEmployee, EmployeeController.updateFull);
router.delete('/:id', EmployeeController.deleteFull);

module.exports = router;