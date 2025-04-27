const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.get('/check', authenticate, authController.checkAuth);

module.exports = router;
