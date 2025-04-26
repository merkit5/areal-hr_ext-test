const express = require('express');
const router = express.Router();
const changeHistoryController = require('../controllers/changeHistoryController');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, changeHistoryController.getAll);

module.exports = router;
