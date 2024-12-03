import { createSlice } from "@reduxjs/toolkit";
import { fetchMultiplePokemonById } from "./thunk";

// Initial state for the Pokemon store
const initialState = {
  pokemons: [],      // Array to store all Pokemon data
  favorites: [],     // Array to store favorite Pokemon IDs
  loading: false,    // Loading state for API calls
  error: null,       // Store any error messages
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    // Toggle Pokemon favorite status
    toggleFavorite: (state, action) => {
      const pokemonId = action.payload;
      const index = state.favorites.indexOf(pokemonId);
      // Remove from favorites if exists, add if doesn't
      if (index === -1) {
        state.favorites.push(pokemonId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Set loading state when fetch starts
      .addCase(fetchMultiplePokemonById.pending, (state) => {
        state.loading = true;
      })
      // Update state with fetched Pokemon data
      .addCase(fetchMultiplePokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload;
      })
      // Handle any errors during fetch
      .addCase(fetchMultiplePokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite } = pokemonSlice.actions;
export default pokemonSlice.reducer;
