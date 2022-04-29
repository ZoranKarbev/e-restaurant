const router = require("express").Router();
const dishesRouter = require("../routes/dishes.route")

router.use("/dishes", dishesRouter);

// globalRouter.use("/orders", ordersRouter);

// globalRouter.use("/auth", authRouter);



router.get('*', (req, res) => {
    res.status(404).send({ msg: "Page not found!" });
});

module.exports = router;