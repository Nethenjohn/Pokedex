function fetchPokemon(searchString) {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=2000') // Fetching all 898 Pokemon
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('cardContainer').innerHTML = 'Loading...';

    const pokemonList = data
      .results
      .filter(pokemon => {
        return searchString
          ? pokemon.name.includes(searchString)
          : true;
      })
      .slice(0, 32); // Limiting to the first 32 Pokemon for initial display
     

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
      const pokemonTypes = pokemonData.types.map(type => {
        return `<li style="background-color: ${typeColors[type.type.name] || '#000'}">${type.type.name}</li>`;
      });

      
      
      // Generate HTML for Pokemon card
      const cardHTML = `
      <div class="card" onclick="redirectToPokemon('${pokemonName}')">
       <span><img src="${pokemonImage}" alt="${pokemonName}"></span>
       <h2>${pokemonName}</h2>
       <ul class="types">${pokemonTypes.join('')}</ul>
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

function createPokemonPage(pokemonName, pokemonData) {
  // Use the Pokémon data to dynamically generate the content of the individual webpage
  // You can customize the webpage layout and include relevant details about the Pokémon
  // Save the generated content to a new HTML file with the Pokémon name as the filename
  // Repeat this process for each Pokémon in the list
}


function redirectToPokemon(pokemonName) {
  // Redirect to the webpage specifically about the Pokémon
  // Replace "pokemonpage.html" with the desired URL or file name
  window.location.href = `pokemonpage.html?name=${pokemonName}`;
}

// Search for a specific Pokemon
function searchPokemon() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();

 fetchPokemon(searchInput);
}

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  // Add more Pokémon types and corresponding colors as needed
};

function redirectToPokemon(pokemonName) {
  window.location.href = `pokemon/${pokemonName}.html`;
}


fetchPokemon();

