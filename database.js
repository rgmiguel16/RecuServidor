var mysql = require('mysql');
const {promisify} = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'database_coches'
});

pool.getConnection((err, connection) => {
    if (connection) connection.release();
    console.log('BD CONECTADA');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;