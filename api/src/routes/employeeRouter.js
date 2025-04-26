const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, EmployeeController.getAll);
router.get('/:id', authenticate, EmployeeController.getByIdFull);
router.post('/', authenticate, upload.array('files'), EmployeeController.createFull);
router.put('/:id', authenticate, upload.array('files'), EmployeeController.updateFull);
router.delete('/:id', authenticate, EmployeeController.deleteFull);

module.exports = router;
