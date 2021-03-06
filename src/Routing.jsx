import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Landing from '../src/screens/landing/Landing'
import PokemonDetail from '../src/screens/pokemonDetail/PokemonDetail'

const Routing = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/pokemon-details:name'component={PokemonDetail}/>
            </Switch>
        </Router>
    )
}

export default Routing;