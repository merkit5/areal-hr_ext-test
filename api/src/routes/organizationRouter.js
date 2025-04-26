const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const {
  validateCreateOrganization,
  validateUpdateOrganization,
} = require('../validators/organizationValidator');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, organizationController.getAll);
router.get('/:id', authenticate, organizationController.getById);
router.post('/', authenticate, validateCreateOrganization, organizationController.create);
router.put('/:id', authenticate, validateUpdateOrganization, organizationController.update);
router.delete('/:id', authenticate, organizationController.delete);

module.exports = router;
