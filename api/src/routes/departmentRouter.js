const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const {
  validateCreateDepartment,
  validateUpdateDepartment,
} = require('../validators/departmentValidator');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, departmentController.getAll);
router.get('/parents', authenticate, departmentController.getParents);
router.get('/:id', authenticate, departmentController.getById);
router.post('/', authenticate, validateCreateDepartment, departmentController.create);
router.put('/:id', authenticate, validateUpdateDepartment, departmentController.update);
router.delete('/:id', authenticate, departmentController.delete);

module.exports = router;
