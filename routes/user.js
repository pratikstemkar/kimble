const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.get("/", (req, res) => {
    const stmt = `
                    SELECT id, firstName, lastName, email, role, createdAt
                    FROM users
                 `;
    db.pool.query(stmt, [], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

router.get("/:userId", (req, res) => {
    const stmt = `
                    SELECT id, firstName, lastName, email, pfp, role, isEmailVerified, isActive, createdAt
                    FROM users
                    WHERE id = ?
                 `;
    db.pool.query(stmt, [req.params.userId], (error, result) => {
        if (result.length == 0) {
            res.send(utils.createError("User does not exist!"));
        } else {
            res.send(utils.createResult(error, result));
        }
    });
});

router.post("/", (req, res) => {
    res.send("create a user");
});

router.put("/:userId", (req, res) => {
    const { firstName, lastName, pfp } = req.body;

    const stmt = `
                    UPDATE users
                    SET firstName = ?, lastName = ?, pfp = ?
                    WHERE id = ?
                 `;
    db.pool.execute(
        stmt,
        [firstName, lastName, pfp, req.user.id],
        (error, result) => {
            res.send(utils.createResult(error, result));
        }
    );
});

router.patch("/:userId", (req, res) => {
    res.send("password change");
});

router.patch("/:userId/toggle-active", (req, res) => {
    const { userId } = req.params;

    const stmt = `
                    UPDATE users
                    SET isActive = isActive ^ 1
                    WHERE id = ?
                 `;
    db.pool.execute(stmt, [userId], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

router.patch("/:userId/delete", (req, res) => {
    const { userId } = req.params;

    const stmt = `
                    UPDATE users
                    SET isDeleted = 1
                    WHERE id = ?
                 `;
    db.pool.execute(stmt, [userId], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

router.delete("/:userId", (req, res) => {
    const stmt = `
                    DELETE from users
                    WHERE id = ?
                 `;
    db.pool.execute(stmt, [req.params.userId], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

module.exports = router;
