const readline = require('readline');
const STATS_VALIDAS = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
async function buscarPokemon(nombre) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            console.log(`No se encontró el pokémon "${nombre}". Status: ${respuesta.status}`);
            return null;
        }
        return await respuesta.json();
    } catch (error) {
        console.error("Error de red o conexión:", error.message);
        return null;
    }
}
async function ejecutarPokedex() {
    console.log("iniciando pokedex");
    const pokemonAProbar = ['ditto', 'CHARIZARD', 'mew', 'goku'];
    for (const nombrePoke of pokemonAProbar) {
        console.log(`Consultando a: ${nombrePoke}...`);
        const resultado = await buscarPokemon(nombrePoke);
        if (resultado) {
            console.log(`Nombre oficial: ${resultado.name} | ID en Pokédex: ${resultado.id}`);
        } else {
            console.log(`Saltando procesamiento porque el resultado fue null`);
        }
    }
}
function mostrarFicha(datos) {
    if (!datos) {
        console.log("No hay datos disponibles para mostrar la ficha");
        return;
    }
    console.log(`POKEMON: ${datos.name.toUpperCase()} (# ${datos.id})`);
    console.log(`Tipo(s): ${datos.types.map(t => t.type.name).join(" / ")}`);
    console.log(`Altura: ${datos.height * 10} cm`);
    console.log(`Peso: ${datos.weight / 10} kg`);
    console.log("Estadísticas:");
    for (const s of datos.stats) {
        console.log(`  - ${s.stat.name}: ${s.base_stat}`);
    }
    console.log("Habilidades:");
    for (const a of datos.abilities) {
        console.log(`  - ${a.ability.name}${a.is_hidden ? " (oculta)" : ""}`);
    }
}
async function probarEjercicio3() {
    for (const nombre of ['bulbasaur', 'squirtle']) {
        mostrarFicha(await buscarPokemon(nombre));
    }
}
function obtenerStat(datosPokemon, nombreStat) {
    if (!datosPokemon || !datosPokemon.stats) return null;
    const stat = datosPokemon.stats.find(s => s.stat.name === nombreStat);
    return stat ? stat.base_stat : null;
}
async function compararPokemon(nombre1, nombre2, stat) {
    const datos1 = await buscarPokemon(nombre1);
    const datos2 = await buscarPokemon(nombre2);
    if (!datos1 || !datos2) {
        console.log(`No se puede comparar: no se encontro "${nombre1}" y "${nombre2}"`);
        return;
    }
    if (!STATS_VALIDAS.includes(stat)) {
        console.log(`"${stat}" no es una stat válida. Las stats disponibles son: ${STATS_VALIDAS.join(", ")}.`);
        return;
    }
    const valor1 = obtenerStat(datos1, stat);
    const valor2 = obtenerStat(datos2, stat);
    console.log(`Comparando "${stat}"`);
    console.log(`${datos1.name.toUpperCase()}: ${valor1}`);
    console.log(`${datos2.name.toUpperCase()}: ${valor2}`);
    if (valor1 > valor2) {
        console.log(`Gano ${datos1.name.toUpperCase()} en ${stat}`);
    } else if (valor2 > valor1) {
        console.log(`Gano ${datos2.name.toUpperCase()} en ${stat}`);
    } else {
        console.log(`Empate entre ${datos1.name.toUpperCase()} y ${datos2.name.toUpperCase()} en ${stat}`);
    }
}
async function probarEjercicio4() {
    await compararPokemon('snorlax', 'machamp', 'attack');
    await compararPokemon('golem', 'lapras', 'defense');
    await compararPokemon('pikachu', 'raichu', 'fuerza');
}
async function pokemonMasFuerte(listaNombres, stat) {
    let mejorNombre = "";
    let mejorValor = -1;
    for (const nombre of listaNombres) {
        const datos = await buscarPokemon(nombre);
        if (!datos) continue;
        const valorStat = obtenerStat(datos, stat);
        if (valorStat === null) continue;
        if (valorStat > mejorValor) {
            mejorValor = valorStat;
            mejorNombre = datos.name;
        }
    }
    if (mejorValor !== -1) {
        console.log(`El pokemon más fuerte en "${stat}" es ${mejorNombre.toUpperCase()} con un valor de ${mejorValor}`);
        return mejorNombre;
    }
    console.log(`No hay ganador para "${stat}"`);
    return null;
}
async function correrDesafioFinal() {
    const miEquipo = ['charizard', 'blastoise', 'venusaur', 'pikachu', 'dragonite', 'mewtwo'];
    console.log("Mi equipo:", miEquipo.join(", "));
    console.log("ataque");
    const ganadorAtaque = await pokemonMasFuerte(miEquipo, 'attack');
    console.log("defensa");
    await pokemonMasFuerte(miEquipo, 'defense');
    if (ganadorAtaque) {
        console.log(`mostrando informacion (${ganadorAtaque.toUpperCase()})`);
        mostrarFicha(await buscarPokemon(ganadorAtaque));
    }
}
async function pedirPokemonAlUsuario() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('Escribe el nombre del pokemon: ', async (entradaUsuario) => {
        console.log(`Buscando información para: "${entradaUsuario}"...`);
        mostrarFicha(await buscarPokemon(entradaUsuario));
        rl.close();
    });
}
(async () => {
    await ejecutarPokedex();
    await probarEjercicio3();
    await probarEjercicio4();
    await correrDesafioFinal();
    await pedirPokemonAlUsuario();
})();