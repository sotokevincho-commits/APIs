async function obtenerClima() {
  const respuesta = await fetch("https://api.open-meteo.com/v1/forecast?latitude=4.6&longitude=-74.1&current=temperature_2m");

  if (!respuesta.ok) {
    console.log("Algo salió mal. Código:", respuesta.status);
    return;
  }

  const datos = await respuesta.json();
  console.log("Temperatura actual:", datos.current.temperature_2m, "°C");
}

obtenerClima();