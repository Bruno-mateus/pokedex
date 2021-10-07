//https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png
//https://pokeapi.co/api/v2/pokemon/${id}

const urlPokemon =(id)=> `https://pokeapi.co/api/v2/pokemon/${id}`
const ul = document.querySelector('[data-js="pokedex"]')

const pokePromises = ()=>{
    return(
        Array(150).fill().map((_,i)=>
        fetch(urlPokemon(i+1)).then(res=>res.json())
    )
)
}

const fetchPokemon = ()=>{
/*     for(let i = 1;i<=150;i++){
        pokemonPromises.push(fetch(urlPokemon(i)).then(res=> res.json()))
    } */
    const pokemonPromises = pokePromises()
     
    Promise.all(pokemonPromises)
    .then(pokemons=>{
            const liPokemons = pokemons.reduce((acc,{name,types,id})=>{
                const Elementtypes= types.map(info=>info.type.name)
                acc+=`
                    <li class = "card ${Elementtypes[0]}">
                    <img class="card-image " alt="${name}"
                    src="https://cdn.traction.one/pokedex/pokemon/${id}.png"/>
                    <h2 class = "card-title">${id}. ${name}</h2>
            
                    <p class="card-subtitle">${Elementtypes.join(' | ')}</p>
                    </li>
                `
                return acc
            },'')
            ul.innerHTML+=liPokemons
        }
        )

}

fetchPokemon()