const mariadb = require('mariadb');

const pool = mariadb.createPool({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'sig',
});

module.exports = pool;