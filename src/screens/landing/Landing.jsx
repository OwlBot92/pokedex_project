import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonCard } from 'fathom-story-comp';
import LottieLoading from '../../components/loading/LottieLoading';

import backgroundDay from '../../assets/img/pokemon_day_forest.png';
import backgroundNoon from '../../assets/img/pokemon_noon_forest.png';
import backgroundNight from '../../assets/img/pokemon_night_forest.png';

import './Landing.css'
import * as dayjs from 'dayjs'



const App = () => {
  /* HOOKS & DATA */
  let data = [];
  let history = useHistory()
  let hour = dayjs().hour()


  console.log('CURRENT HOUR', hour);

  /* STATE */
  const [state, setState] = useState({
    pokemonArray: data,
    isDataReady: false,
    start: 0,
    end: 20,
  });

  /* COMPONENT LYFECYCLE */
  useEffect(() => {
    let pokeStorage = JSON.parse(localStorage.getItem('pokeList')) //se non e` ancora stato inizializzato torna null
    if (pokeStorage !== null) {
      getFromStorageData(pokeStorage);
    }
    /* PRIMO ACCESSO AL POKEDEX inizializza effettuando la chiamata API la prima volta */
    else {
      getFetchedData();
    }
  }, []);

  /* FUNCTIONS */
  const getFromStorageData = (pokeStorage) => {
    let temp = [];
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
  const getFetchedData = async () => {
    let temp = [];
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
  /* RENDER */ //test
  /* cambio di sfondo dinamico in base all ora della giornata */
  return (
    <main className='landing-main' style={{
      backgroundImage: `url(${hour >= 6 && hour <= 14 ? backgroundDay :
        hour >= 15 && hour <= 20 ? backgroundNoon :
          backgroundNight})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
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
        <>
          <LottieLoading />
        </>
      }
    </main>
  );
}

export default App;