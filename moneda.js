const prompt = require("prompt-sync")();

async function convertirDolares() {
  const montoTexto = prompt("¿Cuántos dólares quieres convertir a pesos? ");
  const montoUSD = Number(montoTexto);
  const respuesta = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!respuesta.ok) {
    console.log("No se pudo consultar la tasa. Código:", respuesta.status);
    return;
  }
  const datos = await respuesta.json();
  const tasaCOP = datos.rates.COP;
  const totalPesos = montoUSD * tasaCOP;
  console.log(montoUSD, "USD equivalen a", totalPesos, "COP");
}
convertirDolares();