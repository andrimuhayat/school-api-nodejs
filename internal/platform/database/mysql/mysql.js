const knex = require("knex");
const cfg = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'school_db',
    }
}

const db = knex(cfg);
module.exports = db;