require("dotenv").config();
const express = require("express");
const utils = require("./utils");
const jwt = require("jsonwebtoken");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    if (req.url == "/auth/login" || req.url == "/auth/register") {
        next();
    } else {
        const token = req.headers["token"];
        if (!token) {
            res.send(utils.createError("Token Not Found!"));
        } else {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                req.user = payload;
                next();
            } catch (ex) {
                res.send(utils.createError(ex.message));
            }
        }
    }
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} ...`);
});
