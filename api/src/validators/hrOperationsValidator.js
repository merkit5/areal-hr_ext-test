const Joi = require('joi');

const createHrOperationSchema = Joi.object({
  operation_type: Joi.string().required(),
  salary: Joi.number().positive().precision(2).required(),
  date: Joi.date().required(),
  employee_id: Joi.number().integer().positive().required(),
  department_id: Joi.number().integer().positive().allow(null),
  position_id: Joi.number().integer().positive().allow(null),
});

const updateHrOperationSchema = Joi.object({
  id: Joi.number().integer().positive(),
  operation_type: Joi.string(),
  salary: Joi.number().positive().precision(2),
  date: Joi.date(),
  employee_id: Joi.number().integer().positive(),
  department_id: Joi.number().integer().positive().allow(null),
  position_id: Joi.number().integer().positive().allow(null),
})
  .min(1)
  .unknown(true);

module.exports = {
  validateCreateHrOperation: (req, res, next) => {
    const { error } = createHrOperationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
  validateUpdateHrOperation: (req, res, next) => {
    const { error } = updateHrOperationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
};
