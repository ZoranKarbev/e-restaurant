const Joi = require("joi");

const userSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    age: Joi.number().min(13).max(120).required(),
    email: Joi.string().required().email(),
    password: Joi.string().alphanum().min(8).required()
});

const userValidator = (req, res, next) => {
    const userData = req.body;
    const validation = userSchema.validate(userData);

    if (validation?.error) {
        console.log(validation.error.details[0].message)
        res.status(400).send({
            msg: validation.error.details[0].message
        });
    } else {
        next();
    }
};

module.exports = userValidator;