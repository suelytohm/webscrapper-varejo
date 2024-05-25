const axios = require('axios');
const cheerio = require('cheerio');

// URL da página que você deseja fazer o scraping
const url = 'https://www.lojagriffus.com.br/43695/p';

// Função para fazer a solicitação HTTP e extrair o texto da classe skuPrice
async function scrape() {
  try {
    // Faz a solicitação HTTP para a página
    const response = await axios.get(url);

    // Carrega o HTML da página no Cheerio
    const $ = cheerio.load(response.data);

    // Encontra o elemento com a classe skuPrice e obtém o texto
    const skuPriceText = $('.skuPrice').text();

    let valor = skuPriceText.replace("R$", "");
    valor = valor.replace(".", "");
    valor = valor.replace(",", ".");
    valor = parseFloat(valor).toFixed(2);

    
      // Exibe o resultado
    console.log('Valor do kit: R$', valor);
    
  } catch (error) {
    console.error('Erro ao fazer scraping:', error.message);
  }
}

// Chama a função de scraping
scrape();
