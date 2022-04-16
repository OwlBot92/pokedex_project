import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonCard } from 'fathom-story-comp';

import './Landing.css'
const App = () => {

  let data = [];
  let history = useHistory()
  //test
  const [state, setState] = useState({
    pokemonArray: data,
    isDataReady: false,
    start: 0,
    end: 20,
  });

  useEffect(() => {
    let temp = [];
    let pokeStorage = JSON.parse(localStorage.getItem('pokeList')) //se non e` ancora stato inizializzato torna null
    if (pokeStorage !== null) {
      console.log('storage pieno');
      let start = parseInt(localStorage.getItem('start'));
      let end = parseInt(localStorage.getItem('end'));
      for (const iterator of pokeStorage) {
        temp.push(iterator)
      }
      setState({
        ...state,
        start: start,
        end: end,
        isDataReady: true,
        pokemonArray: temp,
      })
    }
    /* PRIMO ACCESSO AL POKEDEX inizializza effettuando la chiamata API la prima volta */
    else {
      axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
        .then(response => {
          data = response.data.results;
          (async () => {
            for (const pokemon of data) {
              let singlePokemonInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              let pokeImg = await singlePokemonInfo.data.sprites.other['official-artwork'].front_default
              temp.push({
                name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                apiName: pokemon.name,
                url: pokemon.url,
                img: pokeImg,
                size: {
                  height: singlePokemonInfo.data.height,
                  weight: singlePokemonInfo.data.weight
                },
                captured: false,
              })
              localStorage.setItem('pokeList', JSON.stringify(temp))
              localStorage.setItem('start', state.start)
              localStorage.setItem('end', state.end)
            }
            setState({
              ...state,
              isDataReady: true,
              pokemonArray: temp,
            })
          })()
        })
    }
  }, [])

  const nextPage = () => {
    if (state.start >= 151) {
      return;
    }
    setState({
      ...state,
      start: state.start += 20,
      end: state.end += 20,
    })
    localStorage.setItem('start', state.start)
    localStorage.setItem('end', state.end)
  }
  const prevPage = async () => {
    if (state.start <= 0) {
      return;
    }
    setState({
      ...state,
      start: state.start -= 20,
      end: state.end -= 20,
    })
    localStorage.setItem('start', state.start)
    localStorage.setItem('end', state.end)
  }

  const viewPokemonDetail = (pokemonInfo) => () => {
    history.push(`pokemon-details:${pokemonInfo.apiName}`, { id: pokemonInfo })
  }


  return (
    <main className='landing-main'> {/* implementare cambio di sfondo dinamico in base all ora della giornata */}
      {
        state.isDataReady &&
        <>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>POKEDEX</h1>
          <div className="landing-main-pokedex">
            {console.log('render')}
            {
              state.pokemonArray.slice(parseInt(localStorage.getItem('start')), parseInt(localStorage.getItem('end'))).map((item, index) => {
                return (
                  <div key={index} style={{ marginBottom: 10 }}>
                    <PokemonCard
                      name={item.name}
                      imgUrl={item.img}
                      onPress={viewPokemonDetail(item)}
                    />
                  </div>
                )
              })
            }
          </div>
        </>
      }
      {
        state.isDataReady &&
        <div className='landing-btn-container'>
          {/* da convertire in componenti */}
          <button onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>
      }

      {
        state.isDataReady === false &&
        <div><span style={{ fontSize: '35px' }}>LOADING...</span></div>
      }
    </main>
  );
}

export default App;



/* <div className='landing-pokemon-card' onClick={viewPokemonDetail(item)} key={index}>
    <div
      key={index}
    >{item.name}
    </div>
    <img src={item.img} alt="" />
    <div className='landing-pokeball-placeholder'>

    </div>
</div> */