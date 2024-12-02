export const selectPokemonById = (id) => (state) => {
  console.log('State:', state);
  return state.data?.find((pokemon) => pokemon.id === Number(id)) || null;
};

