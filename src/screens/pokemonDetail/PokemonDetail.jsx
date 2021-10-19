import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../pokemonDetail/PokemonDetail.css'

const PokemonDetail = (props) => {
    /* console.log(props.location.state.id); */
    let routePokeData = props.location.state.id
    let history = useHistory();
    const [pokemonInfo, setPokemonInfo] = useState(routePokeData);
    const [dataReceived, setDataReceived] = useState(false);


    const goHome = () => {
		history.push('/')
    }

    return (
        <div className='detail-pokemon-main'>
            <div className='detail-pokedex'>
                <div className='detail-pokedex-left'>
                    <div>
                        <div className='detail-pokedex-left-azure-circle'>
                        </div>
                    </div>
                    <div className='detail-pokedex-image-frame'>
                        <img src={pokemonInfo.img} alt="" />
                    </div>
                    <div>

                    </div>
                </div>

                <div className='detail-pokedex-right'>

                    <div className='detail-pokedex-right-screen'>
                        <h1 className='detail-pokedex-name'>{pokemonInfo.name}</h1>
                        <p className='detail-pokedex-size'>Weight: {pokemonInfo.size.weight}</p> <br />
                        <p className='detail-pokedex-size'>Height: {pokemonInfo.size.height}</p>
                    </div>

                    <div style={{width: '80%', marginTop: '1rem'}}>
                        <input className='detail-input-pokedex' type="text" />
                    </div>

                    <div className='detail-btn-container'>
                        <button onClick={goHome}>Home</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PokemonDetail;