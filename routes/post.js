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
                 `;

    db.pool.query(stmt, [], (error, result) => {
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

router.delete("/:postId", (req, res) => {
    const stmt = `
                    DELETE from posts
                    WHERE id = ? AND user_id = ?
                 `;
    db.pool.execute(stmt, [req.params.postId, req.user.id], (error, result) => {
        res.send(utils.createResult(error, result));
    });
});

module.exports = router;
