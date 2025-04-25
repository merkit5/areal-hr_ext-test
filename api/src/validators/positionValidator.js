const Joi = require('joi');

const createPositionSchema = Joi.object({ name: Joi.string().min(2).max(255).required() });

const updatePositionSchema = Joi.object({
  name: Joi.string().min(2).max(255),
}).min(1);

module.exports = {
  validateCreatePosition: (req, res, next) => {
    const { error } = createPositionSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
  validateUpdatePosition: (req, res, next) => {
    const { error } = updatePositionSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    next();
  },
};
