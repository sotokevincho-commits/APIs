// Definimos la función asíncrona como pide el Paso 1
async function explorarPokemon() {
    // Reemplaza 'pikachu' por el pokémon en minúsculas que prefieras
    const pokemon = 'pikachu'; 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    try {
        // Hacemos el fetch y esperamos la respuesta con await
        const respuesta = await fetch(url);
        
        // Imprimimos el status de la respuesta
        console.log("Status de la respuesta:", respuesta.status);

        // Traducimos el resultado con .json() usando su propio await
        // Guardamos el resultado en la variable 'datos'
        const datos = await respuesta.json();

        // Paso 2: Imprimimos los datos completos para revisar la estructura
        console.log("\n--- Datos Completos del Pokémon ---");
        console.log(datos);

        // Opcional: Un pequeño vistazo a las claves que menciona la tabla
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

        // 1. Recorrer y mostrar todos los tipos
        console.log("\n--- Tipos del Pokémon ---");
        for (const t of datos.types) {
            console.log(`- Tipo: ${t.type.name}`);
        }

        // 2. Recorrer y mostrar todas las stats (Nombre y Valor)
        console.log("\n--- Estadísticas (Stats) ---");
        for (const s of datos.stats) {
            console.log(`- ${s.stat.name}: ${s.base_stat}`);
        }

        // 3. Recorrer y mostrar todas las habilidades
        console.log("\n--- Habilidades (Abilities) ---");
        for (const a of datos.abilities) {
            console.log(`- Habilidad: ${a.ability.name}`);
        }

    } catch (error) {
        console.error("Hubo un error al conectar con la API:", error);
    }
}

// Ejecutamos la función
explorarPokemon();