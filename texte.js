const connection = require("./db");

async function buscarDados(){
    connection.query('SELECT * FROM historicoPreco', (err, rows) => {
      if (err) throw err;
    
      console.log(rows);
      connection.end();
    });
}

async function inserirDados(){
    connection.query('INSERT INTO historicoPreco')
}



buscarDados()
