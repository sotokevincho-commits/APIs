async function explorarPokemon() {
    const pokemon = 'pikachu'; 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    try {
        const respuesta = await fetch(url);
        
        console.log("Status de la respuesta:", respuesta.status);

        const datos = await respuesta.json();

        console.log("\n--- Datos Completos del Pokémon ---");
        console.log(datos);

        console.log("\n--- Resumen de claves principales ---");
        console.log("Clave 'name':", datos.name);
        console.log("Clave 'id':", datos.id);
        console.log("Clave 'height':", datos.height);
        console.log("Clave 'weight':", datos.weight);
        console.log("Clave 'types':", datos.types);
        console.log("Clave 'stats':", datos.stats);
        console.log("Clave 'abilities':", datos.abilities);

        console.log("\n====== RESULTADOS DESGLOSADOS (EJERCICIO 1) ======");

        console.log(`- Nombre: ${datos.name}`);
        console.log(`- ID en Pokédex: ${datos.id}`);
        console.log(`- Altura: ${datos.height} decímetros`);
        console.log(`- Peso: ${datos.weight} hectogramos`);

        console.log("\n--- Tipos del Pokémon ---");
        for (const t of datos.types) {
            console.log(`- Tipo: ${t.type.name}`);
        }

        console.log("\n--- Estadísticas (Stats) ---");
        for (const s of datos.stats) {
            console.log(`- ${s.stat.name}: ${s.base_stat}`);
        }

        console.log("\n--- Habilidades (Abilities) ---");
        for (const a of datos.abilities) {
            console.log(`- Habilidad: ${a.ability.name}`);
        }

    } catch (error) {
        console.error("Hubo un error al conectar con la API:", error);
    }
}

explorarPokemon();