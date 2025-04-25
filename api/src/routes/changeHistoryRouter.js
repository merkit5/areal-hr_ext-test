const express = require('express');
const router = express.Router();
const changeHistoryController = require('../controllers/changeHistoryController');

router.get('/', changeHistoryController.getAll);

module.exports = router;
