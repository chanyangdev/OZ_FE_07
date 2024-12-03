import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMultiplePokemonById = createAsyncThunk(
  "pokemon/fetchByIdStatus",
  async (amount) => {
    // Create arrays of IDs in chunks of 20 for better performance
    const batchSize = 20;
    const batches = [];
    for (let i = 1; i <= amount; i += batchSize) {
      const batch = [];
      for (let j = i; j < Math.min(i + batchSize, amount + 1); j++) {
        batch.push(j);
      }
      batches.push(batch);
    }

    const pokemons = [];
    
    // Process each batch
    for (const batch of batches) {
      const batchPromises = batch.map(id => Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      ]));

      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach(([pokemonResponse, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        )?.name || pokemonResponse.data.name;

        const koreanDescription = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "ko"
        )?.flavor_text || "";

        const types = pokemonResponse.data.types.map((type) => {
          const typeTranslations = {
            normal: "노말",
            fire: "불꽃",
            water: "물",
            electric: "전기",
            grass: "풀",
            ice: "얼음",
            fighting: "격투",
            poison: "독",
            ground: "땅",
            flying: "비행",
            psychic: "에스퍼",
            bug: "벌레",
            rock: "바위",
            ghost: "고스트",
            dragon: "드래곤",
            dark: "악",
            steel: "강철",
            fairy: "페어리"
          };
          return {
            type: {
              name: typeTranslations[type.type.name] || type.type.name
            }
          };
        });

        pokemons.push({
          id: pokemonResponse.data.id,
          name: koreanName,
          description: koreanDescription,
          types: types,
          height: pokemonResponse.data.height,
          weight: pokemonResponse.data.weight,
          stats: pokemonResponse.data.stats,
          sprites: pokemonResponse.data.sprites
        });
      });
    }

    // Sort by ID before returning
    return pokemons.sort((a, b) => a.id - b.id);
  }
);
