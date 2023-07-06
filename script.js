function fetchPokemon(searchString) {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=2000&') // Fetching all 898 Pokemon
  .then(response => response.json())
  .then(data => {
    document.getElementById('cardContainer').innerHTML = 'Loading...';
    const pokemonList = data
      .results
      .filter(pokemon => {
        return searchString
          ? pokemon.name.includes(searchString)
          : true;
      })
      .slice(0, 16); // Limiting to the first 12 Pokemon for initial display
      let currentPage = 0;
      const cardsPerPage = 16;

    document.getElementById("cardContainer").innerHTML = "";
    // Fetch and store details of each Pokemon
    const fetchPokemonDetails = async () => {
      for (const pokemon of pokemonList) {
        await fetchPokemon(pokemon.url);
      }
    };

    // Fetch details of a specific Pokemon
    const fetchPokemon = async (url) => {
      const response = await fetch(url);
      const pokemonData = await response.json();
      const { name, sprites, types } = pokemonData;

      // Extracting the relevant information
      const pokemonName = name;
      const pokemonImage = sprites.front_default;
      const pokemonTypes = types.map(type => type.type.name);

      // Generate HTML for Pokemon card
      const cardHTML = `
        <div class="card">
          <h2>${pokemonName}</h2>
          <span><img src="${pokemonImage}" alt="${pokemonName}"></span>
          <span><p>${pokemonTypes.join(', ')}</p></span>
        </div>
      `;

      // Append the card to the cardContainer div
      document.getElementById('cardContainer').innerHTML += cardHTML;
    };

    // Call the function to fetch Pokemon details
    fetchPokemonDetails();
  })
  .catch(error => console.log(error));
}


// Search for a specific Pokemon
function searchPokemon() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();

 fetchPokemon(searchInput);
}


fetchPokemon();