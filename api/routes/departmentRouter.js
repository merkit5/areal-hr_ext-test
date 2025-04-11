const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { validateCreateDepartment, validateUpdateDepartment } = require('../validators/departmentValidator');

router.get('/', departmentController.getAll);
router.post('/', validateCreateDepartment, departmentController.create);
router.put('/:id', validateUpdateDepartment, departmentController.update);
router.delete('/:id', departmentController.delete);

module.exports = router;