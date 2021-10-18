import axios from 'axios';
import React, { useEffect, useState } from 'react';


const PokemonDetail = (props) => {
    /* console.log(props.location.state.id); */

    const [pokemonInfo, setPokemonInfo] = useState({});
    const [dataReceived, setDataReceived] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);


    let pokemonName = props.location.state.id

    const fetchData = async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        setPokemonInfo(response.data)
        setDataReceived(true)
    }


    return (
        <>
            {dataReceived &&
                <div>
                    {console.log(pokemonInfo)}
                    <h1>{pokemonName}</h1>
                    <span>Weight: {pokemonInfo.weight}</span> <br />
                    <span>Height: {pokemonInfo.height}</span>
                    <img src={pokemonInfo.sprites.other['official-artwork'].front_default} alt="" />
                </div>
            }
        </>
    );
}

export default PokemonDetail;