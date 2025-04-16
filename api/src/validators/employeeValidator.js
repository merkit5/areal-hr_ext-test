const Joi = require('joi');

const passportSchema = Joi.object({
    series: Joi.string()
        .length(4)
        .pattern(/^\d+$/)
        .required(),
    number: Joi.string()
        .length(6)
        .pattern(/^\d+$/)
        .required(),
    issue_date: Joi.date()
        .iso()
        .required(),
    issuer_code: Joi.string()
        .pattern(/^\d{3}-\d{3}$/)
        .required(),
    issuer: Joi.string()
        .min(5)
        .max(255)
        .required(),
});

const addressSchema = Joi.object({
    region: Joi.string()
        .min(2)
        .max(255)
        .required(),
    locality: Joi.string()
        .min(2)
        .max(255)
        .required(),
    street: Joi.string()
        .min(2)
        .max(255)
        .optional()
        .allow(''),
    house: Joi.string()
        .min(1)
        .max(10)
        .optional()
        .allow(''),
    building: Joi.string()
        .min(1)
        .max(10)
        .optional()
        .allow(''),
});

const createEmployeeSchema = Joi.object({
    first_name: Joi.string()
        .min(2)
        .max(255)
        .required(),
    last_name: Joi.string()
        .min(2)
        .max(255)
        .required(),
    patronymic: Joi.string()
        .min(2)
        .max(255)
        .optional()
        .allow(''),
    birth_date: Joi.date()
        .iso()
        .required(),
    passport: passportSchema.optional(),
    address: addressSchema.optional(),
});

const updateEmployeeSchema = Joi.object({
    first_name: Joi.string()
        .min(2)
        .max(255),
    last_name: Joi.string()
        .min(2)
        .max(255),
    patronymic: Joi.string()
        .min(2)
        .max(255)
        .allow(''),
    birth_date: Joi.date()
        .iso(),
    passport: passportSchema.optional(),
    address: addressSchema.optional(),
}).min(1);

module.exports = {
    validateCreateEmployee: (req, res, next) => {
        const { error } = createEmployeeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errors: error.details.map(d => ({
                    field: d.path.join('.'),
                    message: d.message
                }))
            });
        }
        next();
    },
    validateUpdateEmployee: (req, res, next) => {
        const { error } = updateEmployeeSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                errors: error.details.map(d => ({
                    field: d.path.join('.'),
                    message: d.message
                }))
            });
        }
        next();
    },
};