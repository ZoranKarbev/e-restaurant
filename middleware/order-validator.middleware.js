const Joi = require("joi");

const orderSchema = Joi.object({
    dishName: Joi.string().min(3),
    status: Joi.valid("new", "cancelled", "done").required(),
})

const orderValidator = (req, res, next) => {
    const orderData = req.body;
    const validation = orderSchema.validate(orderData);
    if (validation?.error) {
        res.status(400).send({
            msg: validation.error.details[0].message
        });
    } else {
        next();
    }
};

module.exports = orderValidator;