import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMultiplePokemonById = createAsyncThunk(
  "pokemon/fetchMultiplePokemonById",
  async (limit) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const data = await response.json();
    
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const detail = await res.json();
        
        // Fetch species data for description
        const speciesRes = await fetch(detail.species.url);
        const speciesData = await speciesRes.json();
        
        // Get English description
        const description = speciesData.flavor_text_entries
          .find(entry => entry.language.name === "en")?.flavor_text
          .replace(/\f/g, ' '); // Clean up formatting

        return {
          id: detail.id,
          name: detail.name,
          front: detail.sprites.front_default,
          description,
          types: detail.types.map(type => type.type.name),
          height: detail.height,
          weight: detail.weight
        };
      })
    );
    
    return pokemonDetails;
  }
);
