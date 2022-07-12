var lim = 200
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const loaderContainer = document.querySelector('.loader')


 
const generatePokemonPromises = () =>  Array(898).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

    

const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types}) => {
    const elementsTypes = types.map(typeinfo => typeinfo.type.name)
    accumulator += `
    <a href="./pokemon.html">
    <li class="card" ${types[0]}>
      <img class="card-image ${elementsTypes[0]}" alt="${name}"
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
         <h2 class="card-title">${id}. ${name}</h2>
         <p class="card-subtitle">${elementsTypes.join(' | ')} </p>
      </li>
    </a>
         `
    return accumulator
     }, '')
 

 const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
 }

 
    
const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)  

    const getNextPokemons = () => {
        lim = 100
        
        getPokemonUrl()
        pokemonPromises
        generatePokemonPromises()
        generateHTML()
        insertPokemonsIntoPage()
    }


    const removeLoader = () =>{
        setTimeout(() => {
            loaderContainer.classList.remove('show')
            getNextPokemons()
        }, 1000) 
    
    }
    
    const showLoader = () => {
         loaderContainer.classList.add('show')
         removeLoader()
    }
    
    
    window.addEventListener('scroll', () =>{
       const { clientHeight, scrollHeight, scrollTop  } = document.documentElement
        const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10
       if (isPageBottomAlmostReached){
       showLoader()
       }
    
    })

