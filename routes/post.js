const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.post("/", (req, res) => {
    const { title, content } = req.body;

    const stmt = `
                    INSERT INTO posts (title, content, user_id)
                    values (?, ?, ?)
                 `;
    db.pool.execute(stmt, [title, content, req.user.id], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

router.get("/", (req, res) => {
    const stmt = `
                    SELECT id, title, content, user_id, createdAt
                    FROM posts
                    WHERE isDeleted = 0
                    ORDER BY createdAt DESC
                 `;

    db.pool.query(stmt, [], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

router.get("/:postId", (req, res) => {
    const stmt = `
                    SELECT id, title, content, user_id, createdAt
                    FROM posts
                    WHERE id = ?
                    AND isDeleted = 0
                 `;
    db.pool.query(stmt, [req.params.postId], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

router.get("/user/:userId", (req, res) => {
    const stmt = `
                    SELECT id, title, content, user_id, createdAt
                    FROM posts
                    WHERE user_id = ?
                    AND isDeleted = 0
                    ORDER BY createdAt DESC
                 `;
    db.pool.query(stmt, [req.params.userId], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

router.put("/:postId", (req, res) => {
    const { title, content } = req.body;

    const stmt = `
                    UPDATE posts
                    SET title = ?, content = ?
                    WHERE id = ?
                 `;
    db.pool.execute(
        stmt,
        [title, content, req.params.postId],
        (error, result) => {
            res.send(utils.createResult(error, result));
        }
    );
});

router.put("/:postId/delete", (req, res) => {
    const stmt1 = `
                    SELECT id, title, content, user_id
                    FROM posts
                    WHERE id = ?
                  `;
    db.pool.execute(stmt1, [req.params.postId], (error, result) => {
        if (result.length == 0) {
            res.send(utils.createError("Post does not exist!"));
        } else {
            if (
                result[0].user_id === req.user.id ||
                req.user.role === "admin"
            ) {
                const stmt = `
                UPDATE posts
                SET isDeleted = 1
                WHERE id = ?
             `;
                db.pool.execute(stmt, [req.params.postId], (error, result) => {
                    res.send(utils.createResult(error, result));
                });
            } else {
                res.send(
                    utils.createError("User not authorized to delete the post.")
                );
            }
        }
    });
});

router.delete("/:postId", (req, res) => {
    const stmt1 = `
                    SELECT id, title, content, user_id
                    FROM posts
                    WHERE id = ?
                  `;
    db.pool.execute(stmt1, [req.params.postId], (error, result) => {
        if (result.length == 0) {
            res.send(utils.createError("Post does not exist!"));
        } else {
            if (result.user_id === req.user.id || req.user.role === "admin") {
                const stmt = `
                DELETE from posts
                WHERE id = ?
             `;
                db.pool.execute(stmt, [req.params.postId], (error, result) => {
                    res.send(utils.createResult(error, result));
                });
            } else {
                res.send(
                    utils.createError("User not authorized to delete the post.")
                );
            }
        }
    });
});

module.exports = router;
