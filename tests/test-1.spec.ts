import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.magazineluiza.com.br/selecao/ofertasdodia/");
  await page.getByRole("link", { name: "magalu indica Smart TV 50”" }).click();
  await page.getByText("Calcular frete e prazo").click();
  await page.getByTestId("zipcode-input").click();
  await page.getByTestId("zipcode-input").fill("56515-140");
  await page.locator('[id="\\32 "]').getByText("Frete Grátis").click();
  await page.locator('[id="\\31 "]').getByText("Frete Grátis").click();
  await page.goto("https://www.magazineluiza.com.br/selecao/ofertasdodia/");
  await page.getByRole("link", { name: "Mala de bordo com rodinhas" }).click();
  await page.getByTestId("shipping-item").getByText("R$").click();
});
