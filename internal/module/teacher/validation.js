const Joi = require('joi');

const registerSchema = Joi.object({
    teacher: Joi.string().email().required().messages({
        'string.empty': 'Teacher email is required',
        'string.email': 'Invalid teacher email format'
    }),
    students: Joi.array().items(Joi.string().email().required()).min(1).required().messages({
        'array.base': 'Students must be an array of email addresses',
        'array.min': 'At least one student email is required',
        'string.email': 'Invalid student email format'
    })
});

const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = {
    validateRegister
};