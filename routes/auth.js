require("dotenv").config();
const express = require("express");
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const stmt = `
                    INSERT INTO users (firstName, lastName, email, password, role)
                    values (?, ?, ?, ?, ?)
                 `;
    const encPassword = String(crypto.MD5(password));

    db.pool.execute(
        stmt,
        [firstName, lastName, email, encPassword, "user"],
        (error, result) => {
            res.send(utils.createResult(error, result));
        }
    );
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const stmt = `
                    SELECT id, firstName, lastName
                    FROM users
                    WHERE email = ? AND password = ?
                 `;

    const encPassword = String(crypto.MD5(password));

    db.pool.query(stmt, [email, encPassword], (error, users) => {
        if (error) {
            res.send(utils.createError(error));
        } else {
            if (users.length == 0) {
                res.send(utils.createError("User does not exist."));
            } else {
                const { id, firstName, lastName } = users[0];
                const payload = { id, firstName, lastName };
                const token = jwt.sign(payload, process.env.JWT_SECRET);
                res.send(utils.createSuccess({ token, firstName, lastName }));
            }
        }
    });
});

module.exports = router;
