import axios from 'axios';
import React, { useEffect, useState } from 'react';


const PokemonDetail = (props) => {
    /* console.log(props.location.state.id); */
    let routePokeData = props.location.state.id
    const [pokemonInfo, setPokemonInfo] = useState(routePokeData);
    const [dataReceived, setDataReceived] = useState(false);

    
    return (
        <>
           
                <div>
                    <h1>{pokemonInfo.name}</h1>
                    <div>Weight: {pokemonInfo.size.weight}</div> <br />
                    <div>Height: {pokemonInfo.size.height}</div>
                    <img src={pokemonInfo.img} alt="" />
                </div>
        </>
    );
}

export default PokemonDetail;