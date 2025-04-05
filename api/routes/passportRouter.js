const express = require('express');
const router = express.Router();
const passportController = require('../controllers/passportController');

router.get('/', passportController.getAll);
router.post('/', passportController.create);
router.put('/:id', passportController.update);
router.delete('/:id', passportController.delete);

module.exports = router;