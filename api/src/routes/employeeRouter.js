const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');
const upload = require('../middleware/upload');

router.get('/', EmployeeController.getAll);
router.get('/:id', EmployeeController.getByIdFull);
router.post('/', upload.array('files'), EmployeeController.createFull);
router.put('/:id', upload.array('files'), EmployeeController.updateFull);
router.delete('/:id', EmployeeController.deleteFull);

module.exports = router;
