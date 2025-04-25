const Joi = require('joi');

const createDepartmentSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  comment: Joi.string().allow('').optional(),
  organization_id: Joi.number().integer().positive().required(),
  parent_id: Joi.number().integer().positive().optional().allow(null),
});

const updateDepartmentSchema = Joi.object({
  name: Joi.string().min(2).max(255),
  comment: Joi.string().allow(''),
  organization_id: Joi.number().integer().positive(),
  parent_id: Joi.number().integer().positive().allow(null),
}).min(1);

module.exports = {
  validateCreateDepartment: (req, res, next) => {
    const { error } = createDepartmentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
  validateUpdateDepartment: (req, res, next) => {
    const { error } = updateDepartmentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
};
