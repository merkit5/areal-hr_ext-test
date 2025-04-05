const express = require('express');
const router = express.Router();
const addressController = require('../controllers/passportController');

router.get('/', addressController.getAll);
router.post('/', addressController.create);
router.put('/:id', addressController.update);
router.delete('/:id', addressController.delete);

module.exports = router;