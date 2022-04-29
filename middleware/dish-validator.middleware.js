const Joi = require("joi");

const dishSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().min(1).max(1000).required()
})

const dishValidator = (req, res, next) => {
    const dishData = req.body;
    const validation = dishSchema.validate(dishData);

    if (validation?.error) {
        res.status(400).send({
            msg: validation.error.details[0].message
        });
    } else {
        next();
    }
};

module.exports = dishValidator;