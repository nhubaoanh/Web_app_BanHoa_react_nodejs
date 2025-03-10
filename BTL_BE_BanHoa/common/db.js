import mysql from 'mysql2'
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
   password: '12345',
  database: 'qlbanhoa'
})
export default db;
