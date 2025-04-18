const Joi = require('joi');

const createHrOperationSchema = Joi.object({
    salary: Joi.number()
        .positive()
        .precision(2)
        .required(),
    employee_id: Joi.number()
        .integer()
        .positive()
        .required(),
    department_id: Joi.number()
        .integer()
        .positive()
        .allow(null),
    position_id: Joi.number()
        .integer()
        .positive()
        .allow(null),
});

const updateHrOperationSchema = Joi.object({
    salary: Joi.number()
        .positive()
        .precision(2),
    department_id: Joi.number()
        .integer()
        .positive()
        .allow(null),
    position_id: Joi.number()
        .integer()
        .positive()
        .allow(null),
}).min(1);

module.exports = {
    validateCreateHrOperation: (req, res, next) => {
        const { error } = createHrOperationSchema.validate(req.body);
        if (error)
            return res.status(400).json({ error: error.message });
        next();
    },
    validateUpdateHrOperation: (req, res, next) => {
        const { error } = updateHrOperationSchema.validate(req.body);
        if (error)
            return res.status(400).json({ error: error.message });
        next();
    },
};