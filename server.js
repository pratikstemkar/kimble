require("dotenv").config();
const express = require("express");
const utils = require("./utils");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    if (
        req.url == "/api/auth/login" ||
        req.url == "/api/auth/register" ||
        req.url == "/api/hello"
    ) {
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

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/api/hello", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT} ...`);
});
