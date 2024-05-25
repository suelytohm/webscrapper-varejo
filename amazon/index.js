const axios = require("axios");
const cheerio = require("cheerio");
const UserAgent = require("user-agents");
let fs = require("fs");
let produtos = JSON.parse(fs.readFileSync("../produtos.json", "utf8"));
let conteudo = "";

let connection = require("../db");

async function buscarDados(prod) {
  const userAgent = await new UserAgent();

  const { data } = await axios.get(prod.link, {
    "User-Agent": userAgent.toString(),
  });
  const $ = cheerio.load(data);

  $(".a-container").map((index, element) => {
    if (index === 0) {
      let nome = $(element).find(".product-title-word-break").text().trim();
      let preco = $(element).find(".a-offscreen").first().text();

      if (preco.includes("R$")) {
        let valor = preco.replace("R$", "");
        valor = valor.replace(".", "");
        valor = valor.replace(",", ".");
        valor = parseFloat(valor);

        if (valor < prod.minimo || valor === prod.minimo) {
          const query = `INSERT INTO historicoPreco (nomeProduto,loja,link,menorPreco,precoAtual,dataMenorPreco) VALUES ('${nome}', 'Amazon', '${prod.link}', '${valor}', '${valor}', NOW())`;

          connection.query(query, (err, results) => {
            if (err) throw err;
            console.log("Registro criado com sucesso!");
          });

          conteudo =
            conteudo +
            nome +
            " - Menor valor já registrado (R$" +
            valor +
            "). Aproveita!!!" +
            "\n\n";
          console.log(conteudo);
        } else {
          const query = `INSERT INTO historicoPreco (nomeProduto,loja,link,menorPreco,precoAtual,dataMenorPreco) VALUES ('${nome}', 'Amazon', '${prod.link}', '${valor}', '${valor}', NOW())`;

          connection.query(query, (err, results) => {
            if (err) throw err;
            console.log("Registro criado com sucesso!");
          });

          conteudo =
            conteudo +
            nome +
            " - Valor atual: R$" +
            valor +
            ". Já esteve por R$" +
            prod.minimo +
            "\n\n";
          console.log(conteudo);
        }
      }
    }
  });
}

async function buscar() {
  for (let index = 0; index < produtos.length; index++) {
    const element = produtos[index];
    await sleep(10000);
    buscarDados(element);
  }
  fs.writeFileSync("resultado.txt", conteudo);
}

async function sleep(secconds) {
  return new Promise((resolve) => setTimeout(resolve, secconds));
}
buscar();
