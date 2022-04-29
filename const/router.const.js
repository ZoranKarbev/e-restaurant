const router = require("express").Router();
const dishesRouter = require("../routes/dishes.route");
const ordersRouter = require("../routes/orders.route");

router.use("/dishes", dishesRouter);
router.use("/orders", ordersRouter);
// globalRouter.use("/auth", authRouter);

router.get('*', (req, res) => {
    res.status(404).send({ msg: "Page not found!" });
});

module.exports = router;