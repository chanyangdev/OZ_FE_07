import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slice";

export const store = configureStore({
  reducer: pokemonReducer,
});
