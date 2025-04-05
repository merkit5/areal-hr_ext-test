const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.get('/', fileController.getAll);
router.post('/', fileController.create);
router.put('/:id', fileController.update);
router.delete('/:id', fileController.delete);

module.exports = router;