async function buscarPokemon(nombre) {
    const nombreMinusculas = nombre.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombreMinusculas}`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            console.log(`[Error] No se encontró el pokémon "${nombre}". Status: ${respuesta.status}`);
            return null;
        }

        return await respuesta.json();

    } catch (error) {
        console.error("Error de red o conexión:", error.message);
        return null;
    }
}

async function ejecutarPokedex() {
    console.log("====== INICIANDO PRUEBAS DE LA PÓKEDEX ======");

    const pokemonAProbar = ['ditto', 'CHARIZARD', 'mew', 'goku'];

    for (const nombrePoke of pokemonAProbar) {
        console.log(`\nConsultando a: ${nombrePoke}...`);
        const resultado = await buscarPokemon(nombrePoke);

        if (resultado !== null) {
            console.log(`-> ¡Encontrado! Nombre oficial: ${resultado.name} | ID en Pokédex: ${resultado.id}`);
        } else {
            console.log(`-> Saltando procesamiento porque el resultado fue null.`);
        }
    }

    console.log("\n====== PRUEBAS FINALIZADAS ======");
}

function mostrarFicha(datos) {
    if (!datos) {
        console.log("[Aviso] No hay datos disponibles para mostrar la ficha.");
        return;
    }

    console.log("\n========================================");
    console.log(`POKÉMON: ${datos.name.toUpperCase()} (N° ${datos.id})`);
    console.log("========================================");

    const listaTipos = [];
    for (const t of datos.types) {
        listaTipos.push(t.type.name);
    }
    console.log(`Tipo(s): ${listaTipos.join(" / ")}`);

    const alturaCm = datos.height * 10;
    const pesoKg = datos.weight / 10;
    console.log(`Altura: ${alturaCm} cm`);
    console.log(`Peso: ${pesoKg} kg`);

    console.log("\nEstadísticas:");
    for (const s of datos.stats) {
        console.log(`  - ${s.stat.name}: ${s.base_stat}`);
    }

    console.log("\nHabilidades:");
    for (const a of datos.abilities) {
        let textoHabilidad = `  - ${a.ability.name}`;
        if (a.is_hidden) {
            textoHabilidad += " (oculta)";
        }
        console.log(textoHabilidad);
    }
    console.log("========================================\n");
}

async function probarEjercicio3() {
    console.log("\n--- INICIANDO EJERCICIO 3 ---");

    const nuevosPokemon = ['bulbasaur', 'squirtle'];

    for (const nombre of nuevosPokemon) {
        const datosPokemon = await buscarPokemon(nombre);
        mostrarFicha(datosPokemon);
    }
}


function obtenerStat(datosPokemon, nombreStat) {
    if (!datosPokemon || !datosPokemon.stats) return null;

    for (const s of datosPokemon.stats) {
        if (s.stat.name === nombreStat) {
            return s.base_stat;
        }
    }
    return null; 
}

const STATS_VALIDAS = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];

async function compararPokemon(nombre1, nombre2, stat) {
    const datos1 = await buscarPokemon(nombre1);
    const datos2 = await buscarPokemon(nombre2);

    if (!datos1 || !datos2) {
        console.log(`\n[Aviso] No se puede comparar: no se encontró "${nombre1}" y/o "${nombre2}".`);
        return;
    }

    const valor1 = obtenerStat(datos1, stat);
    const valor2 = obtenerStat(datos2, stat);

    if (valor1 === null && valor2 === null) {
        console.log(`\n[Aviso] "${stat}" no es una stat válida. Las stats disponibles son: ${STATS_VALIDAS.join(", ")}.`);
        return;
    }

    console.log(`\n--- Comparando "${stat}" ---`);
    console.log(`${datos1.name.toUpperCase()}: ${valor1}`);
    console.log(`${datos2.name.toUpperCase()}: ${valor2}`);

    if (valor1 > valor2) {
        console.log(`🏆 ¡Gana ${datos1.name.toUpperCase()} en ${stat}!`);
    } else if (valor2 > valor1) {
        console.log(`🏆 ¡Gana ${datos2.name.toUpperCase()} en ${stat}!`);
    } else {
        console.log(`🤝 Empate entre ${datos1.name.toUpperCase()} y ${datos2.name.toUpperCase()} en ${stat}.`);
    }
}

async function probarEjercicio4() {
    console.log("\n--- INICIANDO EJERCICIO 4 ---");

    await compararPokemon('snorlax', 'machamp', 'attack');

    await compararPokemon('golem', 'lapras', 'defense');

    await compararPokemon('pikachu', 'raichu', 'fuerza');
}

async function pokemonMasFuerte(listaNombres, stat) {
    let mejorNombre = "";
    let mejorValor = -1;

    for (const nombre of listaNombres) {
        const datos = await buscarPokemon(nombre);

        if (datos === null) {
            continue;
        }

        const valorStat = obtenerStat(datos, stat);
        if (valorStat === null) {
            continue;
        }

        if (valorStat > mejorValor) {
            mejorValor = valorStat;
            mejorNombre = datos.name;
        }
    }

    if (mejorValor !== -1) {
        console.log(`\n🏆 ¡El Pokémon más fuerte en "${stat}" es ${mejorNombre.toUpperCase()} con un valor de ${mejorValor}!`);
        return mejorNombre;
    } else {
        console.log(`\n[Aviso] No se pudo determinar un ganador para la stat "${stat}".`);
        return null;
    }
}

async function correrDesafioFinal() {
    console.log("\n========================================");
    console.log("       INICIANDO DESAFÍO FINAL          ");
    console.log("========================================");

    const miEquipo = ['charizard', 'blastoise', 'venusaur', 'pikachu', 'dragonite', 'mewtwo'];
    console.log("Mi equipo seleccionado:", miEquipo.join(", "));

    console.log("\n--- Evaluando Ataque ---");
    const ganadorAtaque = await pokemonMasFuerte(miEquipo, 'attack');

    console.log("\n--- Evaluando Defensa ---");
    const ganadorDefensa = await pokemonMasFuerte(miEquipo, 'defense');

    if (ganadorAtaque) {
        console.log(`\n>>> MOSTRANDO FICHA COMPLETA DEL GANADOR EN ATAQUE (${ganadorAtaque.toUpperCase()}) <<<`);
        const datosGanador = await buscarPokemon(ganadorAtaque);
        mostrarFicha(datosGanador);
    }
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function correrTodoElTaller() {
    console.log("====== BIENVENIDO A LA PÓKEDEX INTERACTIVA ======");

    rl.question('Escribe el nombre del Pokémon que deseas buscar: ', async (entradaUsuario) => {
        console.log(`\nBuscando información para: "${entradaUsuario}"...`);

        const datos = await buscarPokemon(entradaUsuario);
        mostrarFicha(datos);

        rl.close();
    });
}


(async () => {
    await ejecutarPokedex();
    await probarEjercicio3();
    await probarEjercicio4();
    await correrDesafioFinal();

    await correrTodoElTaller();
})();