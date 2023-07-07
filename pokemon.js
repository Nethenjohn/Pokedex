
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


function getPokemonDetails() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pokemonName = urlParams.get('name');

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(pokemonData => {
            const { name, sprites, types, abilities, stats } = pokemonData;
            const pokemonImage = sprites.other['official-artwork'].front_default;
            const images = [];
            images.push(sprites.back_default);
            images.push(sprites.back_shiny);
            images.push(sprites.front_default);
            images.push(sprites.front_shiny);
            const pokemonTypes = types.map(type => type.type.name);
            const pokemonAbilities = abilities.map(ability => ability.ability.name);
            const pokemonStats = stats.map(stat => {
                return {
                    name: stat.stat.name,
                    value: stat.base_stat
                };
            });

            displayPokemonDetails(name, pokemonImage, pokemonTypes, pokemonAbilities, pokemonStats, images);
        })
        .catch(error => console.log(error));
}

function displayPokemonDetails(name, image, types, abilities, stats, images) {
    document.getElementById('pokemonName').textContent = name;

    const pokemonImageContainer = document.getElementById('pokemonImage');
    const img = document.createElement('img');
    img.src = image;
    img.alt = name;
    pokemonImageContainer.appendChild(img);

    const pokemonImagesContainer = document.getElementById('images');
    images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = name;
        pokemonImagesContainer.appendChild(img);
    });


    const pokemonTypesContainer = document.getElementById('pokemonTypes');
    types.forEach(type => {
        const listItem = document.createElement('li');
        listItem.textContent = type;
        listItem.style.backgroundColor = typeColors[type];
        pokemonTypesContainer.appendChild(listItem);
    });


    const pokemonAbilitiesContainer = document.getElementById('pokemonAbilities');
    abilities.forEach(ability => {
        const listItem = document.createElement('li');
        listItem.textContent = ability;
        pokemonAbilitiesContainer.appendChild(listItem);
    });

    const pokemonStatsContainer = document.getElementById('pokemonStats');
    stats.forEach(stat => {
        const listItem = document.createElement('li');
        listItem.textContent = `${stat.name}: ${stat.value}`;
        pokemonStatsContainer.appendChild(listItem);
    });
}

getPokemonDetails();
