const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const { validateCreateOrganization, validateUpdateOrganization } = require('../validators/organizationValidator');

router.get('/', organizationController.getAll);
router.get('/:id', organizationController.getById);
router.post('/', validateCreateOrganization, organizationController.create);
router.put('/:id', validateUpdateOrganization, organizationController.update);
router.delete('/:id', organizationController.delete);

module.exports = router;