const Joi = require('joi');

const operationTypesWithSalary = ['hire', 'promote', 'demote', 'transfer'];

const createHrOperationSchema = Joi.object({
  operation_type: Joi.string().valid('hire', 'fire', 'promote', 'demote', 'transfer').required(),
  salary:Joi.alternatives().conditional('operation_type', {
    is: Joi.valid(...operationTypesWithSalary),
    then: Joi.number().positive().precision(2).required(),
    otherwise: Joi.any().valid(null),
  }),
  date: Joi.date().required(),
  employee_id: Joi.number().integer().positive().required(),
  department_id: Joi.alternatives().conditional('operation_type', {
    is: 'transfer',
    then: Joi.number().integer().positive().required(),
    otherwise: Joi.number().integer().positive().allow(null),
  }),
  position_id: Joi.alternatives().conditional('operation_type', {
    is: Joi.valid('hire', 'promote', 'demote', 'transfer'),
    then: Joi.number().integer().positive().required(),
    otherwise: Joi.any().valid(null),
  }),
});

const updateHrOperationSchema = Joi.object({
  id: Joi.number().integer().positive(),
  operation_type: Joi.string().valid('hire', 'fire', 'promote', 'demote', 'transfer'),

  salary: Joi.alternatives().conditional('operation_type', {
    is: Joi.valid(...operationTypesWithSalary),
    then: Joi.number().positive().precision(2),
    otherwise: Joi.any().valid(null),
  }),

  date: Joi.date(),
  employee_id: Joi.number().integer().positive(),

  department_id: Joi.alternatives().conditional('operation_type', {
    is: 'transfer',
    then: Joi.number().integer().positive(),
    otherwise: Joi.number().integer().positive().allow(null),
  }),

  position_id: Joi.alternatives().conditional('operation_type', {
    is: Joi.valid('hire', 'promote', 'demote', 'transfer'),
    then: Joi.number().integer().positive(),
    otherwise: Joi.any().valid(null),
  }),
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
