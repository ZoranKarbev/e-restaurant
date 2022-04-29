require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const globalRouter = require("./const/router.const")

const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(globalRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});