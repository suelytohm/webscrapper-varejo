require("dotenv").config();
/*
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "1234",
  database : "bot"
});


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
});
 
module.exports = connection
*/

console.log(process.env.MENSAGEM);

const { Pool } = require("pg");

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("Conexão bem-sucedida ao banco de dados");
  release(); // Liberar o cliente para que ele possa ser reutilizado
});

module.exports = pool;
