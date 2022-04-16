import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import '../pokemonDetail/PokemonDetail.css'
import { PokedexScreen } from 'fathom-story-comp';


const PokemonDetail = (props) => {
	/* console.log(props.location.state.id); */
	let routePokeData = props.location.state.id
	let history = useHistory();
	const [pokemonInfo, setPokemonInfo] = useState(routePokeData);
	const [dataReceived, setDataReceived] = useState(false);
	console.log(routePokeData);

	const goHome = () => {
		history.push('/')
	}

	return (
		<div className='detail-pokemon-main'>
			<PokedexScreen
				name={pokemonInfo.name}
				weight={pokemonInfo.size.height}
				height={pokemonInfo.size.weight}
				imgUrl={pokemonInfo.img}
				onPress={goHome}
			/>
		</div>
	);
}

export default PokemonDetail;


/* 
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



			<div className='detail-btn-container'>
				<button onClick={goHome}>Home</button>
			</div>
		</div>
	</div>

</div> */