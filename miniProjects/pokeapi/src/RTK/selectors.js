import { createSelector } from '@reduxjs/toolkit';

// Base selectors
const selectPokemonState = state => state.pokemon;
const selectSelectedTypes = (_, selectedTypes) => selectedTypes || [];

// Memoized selector for pokemons list
export const selectPokemons = createSelector(
  [selectPokemonState],
  (pokemonState) => {
    if (!pokemonState || !pokemonState.pokemons) return [];
    return Array.isArray(pokemonState.pokemons) ? pokemonState.pokemons : [];
  }
);

// Memoized selector for filtered pokemons
export const selectFilteredPokemons = createSelector(
  [selectPokemons, selectSelectedTypes],
  (pokemons, selectedTypes) => {
    if (selectedTypes.length === 0) return pokemons;
    return pokemons.filter(pokemon => 
      pokemon.types.some(type => 
        selectedTypes.includes(type.type.name_ko) || selectedTypes.includes(type.type.name)
      )
    );
  }
);
