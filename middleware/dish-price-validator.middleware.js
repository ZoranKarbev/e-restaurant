const dishPriceValidator = (req, res, next) => {
    dishPrice = req.body.price
    if (dishPrice < 1 || dishPrice > 1000) {
        res.status(400).send({ msg: "The price should be lower than 1000 and higher than 0!" })
    } else {
        next();
    }

}

module.exports = dishPriceValidator;