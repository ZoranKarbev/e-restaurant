const router = require("express").Router();

const dishesRouter = require("../routes/dishes.route");
const ordersRouter = require("../routes/orders.route");
const authRouter = require("../routes/auth.routes");

router.use("/auth", authRouter);
router.use("/dishes", dishesRouter);
router.use("/orders", ordersRouter);

router.get('*', (req, res) => {
    res.status(404).send({ msg: "Page not found!" });
});

module.exports = router;