import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMultiplePokemonById = createAsyncThunk(
  "pokemon/fetchByIdStatus",
  async (amount) => {
    // Create batches of 20 Pokemon for efficient API calls
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
    
    // Process each batch of Pokemon
    for (const batch of batches) {
      // Create array of promises for concurrent API calls
      const batchPromises = batch.map(id => Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      ]));

      // Wait for all API calls in the batch to complete
      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach(([pokemonResponse, speciesResponse]) => {
        // Get Korean name or fallback to English name
        const koreanName = speciesResponse.data.names.find(
          (name) => name.language.name === "ko"
        )?.name || pokemonResponse.data.name;

        // Get Korean description or empty string if not found
        const koreanDescription = speciesResponse.data.flavor_text_entries.find(
          (entry) => entry.language.name === "ko"
        )?.flavor_text || "";

        // Translate Pokemon types to Korean
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
              ...type.type,
              name_ko: typeTranslations[type.type.name] || type.type.name
            }
          };
        });

        // Add processed Pokemon data to array
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

    // Sort Pokemon by ID before returning
    return pokemons.sort((a, b) => a.id - b.id);
  }
);
