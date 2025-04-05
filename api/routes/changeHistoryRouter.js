const express = require('express');
const router = express.Router();
const changeHistoryController = require('../controllers/changeHistoryController');

router.get('/', changeHistoryController.getAll);
router.post('/', changeHistoryController.create);
router.put('/:id', changeHistoryController.update);
router.delete('/:id', changeHistoryController.delete);

module.exports = router;