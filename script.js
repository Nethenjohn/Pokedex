fetch('https://pokeapi.co/api/v2/pokemon?limit=898') // Fetching all 898 Pokemon
      .then(response => response.json())
      .then(data => {
        const pokemonList = data.results.slice(0, 12); // Limiting to the first 10 Pokemon for initial display

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
              <img src="${pokemonImage}" alt="${pokemonName}">
              <p>Type: ${pokemonTypes.join(', ')}</p>
            </div>
          `;

          // Append the card to the cardContainer div
          document.getElementById('cardContainer').innerHTML += cardHTML;
        };

        // Call the function to fetch Pokemon details
        fetchPokemonDetails();
      })
      .catch(error => console.log(error));

    // Search for a specific Pokemon
    function searchPokemon() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const cards = document.getElementsByClassName('card');

      // Hide or show cards based on the search input
      for (const card of cards) {
        const pokemonName = card.getElementsByTagName('h2')[0].innerText.toLowerCase();

        if (pokemonName.includes(searchInput)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
         if (!matchFound) {
        alert('Pokemon not found!');
    }
    }
