const knex = require("knex");
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const cfg = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 7001,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'school_db',
    }
}
console.log(process.env.DB_PASS)
const db = knex(cfg);
module.exports = db;