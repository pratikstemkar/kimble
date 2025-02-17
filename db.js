const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "kimbledb",
});

module.exports = { pool };
