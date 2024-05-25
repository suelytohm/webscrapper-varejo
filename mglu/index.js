const puppeteer = require("puppeteer");
let fs = require("fs");

// const produtos = require("../produtos.json");
// const produtosLista = JSON.parse(fs.readFileSync(produtos, "utf8"));

async function buscar() {
  // console.log(produtosLista);
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto("https://www.magazineluiza.com.br/selecao/ofertasdodia/");
  await page.waitForSelector(".sc-bCfvAP");

  // let lista = await page.$$eval(".sc-bCfvAP");
  // console.log(lista);

  let lista = await page.$$eval(".sc-bCfvAP", (elements) => {
    return elements.map((element) => element.textContent);
  });
}

buscar();
