require("dotenv").config();
const express = require("express");
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const mailer = require("../mailer");

const router = express.Router();

router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const otp = Math.floor(Math.random() * 1000000);

    const stmt = `
                    INSERT INTO users (firstName, lastName, email, password, role, otp)
                    values (?, ?, ?, ?, ?, ?)
                 `;
    const encPassword = String(crypto.MD5(password));

    db.pool.execute(
        stmt,
        [firstName, lastName, email, encPassword, "user", otp],
        (error, result) => {
            if (!error) {
                mailer.sendEmail(
                    email,
                    "Welcome to Kimble!",
                    `
                    <h1>Welcome to Kimble!</h1>
                    <div>Hello, ${firstName} ${lastName}</div>
                    <br />
                    <div>Your OTP is
                        <br/>
                        <h2>${otp}</h2>
                    </div>
                    <br />
                    <div>Thank You,</div>
                    <div>Team Kimble</div>
                    `,
                    () => {
                        res.send(utils.createResult(error, result));
                    }
                );
            } else {
                res.send(utils.createError(error));
            }
        }
    );
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const stmt = `
                    SELECT id, firstName, lastName, pfp, email, role, isEmailVerified, isActive
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
            } else if (users[0].isActive == 0) {
                res.send(utils.createError("User account is deactivated!"));
            } else {
                const {
                    id,
                    firstName,
                    lastName,
                    pfp,
                    email,
                    role,
                    isEmailVerified,
                    isActive,
                } = users[0];
                const payload = {
                    id,
                    firstName,
                    lastName,
                    pfp,
                    email,
                    role,
                    isEmailVerified,
                    isActive,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET);
                res.send(
                    utils.createSuccess({
                        token,
                        id,
                        firstName,
                        lastName,
                        pfp,
                        email,
                        role,
                        isEmailVerified,
                        isActive,
                    })
                );
            }
        }
    });
});

router.patch("/verify", (req, res) => {
    const { email, otp } = req.body;

    const stmt = `
                    SELECT id
                    FROM users
                    WHERE email = ? AND otp = ?
                 `;
    db.pool.query(stmt, [email, otp], (error, result) => {
        if (error) {
            res.send(utils.createError(error));
        } else {
            if (result.length == 0) {
                res.send(utils.createError("Invalid OTP"));
            } else {
                const stmt2 = `
                                UPDATE users
                                SET isEmailVerified = 1
                                WHERE id = ?
                              `;
                db.pool.execute(stmt2, [req.user.id], (error, result) => {
                    res.send(utils.createResult(error, result));
                });
            }
        }
    });
});

module.exports = router;
