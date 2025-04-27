const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');

router.get('/me', authenticate, userController.getCurrentUser);
router.put('/me', authenticate, userController.updateCurrentUser);

router.get('/', authenticate, userController.getAll);
router.get('/:id', authenticate, userController.getById);
router.post('/', authenticate, checkRole('admin'), userController.create);
router.put('/:id', authenticate, userController.update);
router.delete('/:id', authenticate, checkRole('admin'), userController.delete);

module.exports = router;