require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const connection = require("./db");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para listar todos os registros
app.get('/historico', (req, res) => {
  const query = 'SELECT * FROM historicoPreco';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Rota para buscar um registro pelo ID
app.get('/historico/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM historicoPreco WHERE id=${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Rota para criar um novo registro
app.post('/historico', (req, res) => {
  const { nomeProduto, loja, link, menorPreco, precoAtual, dataMenorPreco } = req.body;
  const query = `INSERT INTO historicoPreco (nomeProduto,loja,link,menorPreco,precoAtual,dataMenorPreco) VALUES ('${nomeProduto}', '${loja}', '${link}', '${menorPreco}', '${precoAtual}', '${dataMenorPreco}')`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.status(201).json({message: "Registro criado com sucesso!"})
  });
});

// Rota para atualizar um registro existente
app.put('/historico/:id', (req, res) => {
  const { id } = req.params;
  const { nomeProduto, loja, link, menorPreco, precoAtual, dataMenorPreco } = req.body;
  const query = `UPDATE historicoPreco SET nomeProduto = '${nomeProduto}', loja = '${loja}', link = '${link}', menorPreco = '${menorPreco}', precoAtual = '${precoAtual}', dataMenorPreco = '${dataMenorPreco}' WHERE id=${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.status(200).json({message: "Registro atualizado com sucesso!"})

  });
});

// Rota para excluir um registro
app.delete('/historico/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM historicoPreco WHERE id=${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.status(201).json({message: "Registro excluído com sucesso!"})

  });
});

app.listen(3004, () => {
  console.log('Servidor rodando na porta 3000');
});

