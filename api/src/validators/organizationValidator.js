const Joi = require('joi');

const createOrganizationSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  comment: Joi.string().allow('').optional(),
});

const updateOrganizationSchema = Joi.object({
  name: Joi.string().min(2).max(255),
  comment: Joi.string().allow(''),
}).min(1);

module.exports = {
  validateCreateOrganization: (req, res, next) => {
    const { error } = createOrganizationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
  validateUpdateOrganization: (req, res, next) => {
    const { error } = updateOrganizationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
};
