import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const App = () => {

	let data = [];
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
		axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
			.then(response => {
				data = response.data;
				console.log(data);
			})
	}

	return (
		<div className="App">
			{
				state.pokemonArray.slice(state.start, state.end).map((item, index) => {
					return (
						<div style={{cursor: 'pointer'}} key={index} onClick={viewPokemonDetail(item.name)}>{item.name}</div>
					)
				})
			}
			<button onClick={nextPage}>next page</button>
			<button onClick={prevPage}>previous page</button>

		</div>
	);
}

export default App;
