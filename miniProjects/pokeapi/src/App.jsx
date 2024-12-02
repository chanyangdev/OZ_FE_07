import "./App.css";
import { useEffect } from "react";
import { fetchMultiplePokemonById } from "./RTK/thunk";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const pokemonData = useSelector((state) => state.pokemon);
  console.log(pokemonData);
  useEffect(() => {
    dispatch(fetchMultiplePokemonById(151));
  }, [dispatch]);

  return <></>;
}

export default App;
