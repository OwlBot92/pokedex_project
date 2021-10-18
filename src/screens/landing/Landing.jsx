import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const App = () => {

	let data = [];

	let history = useHistory()

	const [state, setState] = useState({
		pokemonArray: data,
		start: 0,
		end: 20,
	});

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=151`)
			.then(response => {
				data = response.data.results;
				setState({
					...state,
					pokemonArray: data
				})
			})
		console.log('component did mount');
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
	}

	const viewPokemonDetail = (pokemonName) => () => {
		history.push(`pokemon-details:${pokemonName}`, {id: pokemonName})
	}

	const goToPage = () => {
	}

	return (
		<div className="App">
			{
				state.pokemonArray.slice(state.start, state.end).map((item, index) => {
					return (
						<div style={{
							cursor: 'pointer',
							backgroundColor: 'lightgrey',
							marginBottom: '.5rem'
						}}
							key={index}
							onClick={viewPokemonDetail(item.name)}>{item.name}
						</div>
					)
				})
			}
			<button onClick={nextPage}>next page</button>
			<button onClick={prevPage}>previous page</button>
			<button onClick={goToPage}>Specific Pokemon</button>
		</div>
	);
}

export default App;
