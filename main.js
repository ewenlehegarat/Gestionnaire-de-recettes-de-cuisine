async function getPokemon() {
  try {
    const reponse = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/151");
    const resultat = await reponse.json();

    const pokemonContainer = document.querySelector('.pokemon_container');

    resultat.forEach(pokemon => {
      const pokemonDiv = document.createElement('div');
      const pokemonNom = document.createElement('h2');

      pokemonNom.textContent = pokemon.name;

      pokemonDiv.appendChild(pokemonNom);
      pokemonContainer.appendChild(pokemonDiv);
    });

  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

getPokemon();