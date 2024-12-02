import { useSelector } from "react-redux";
import { Card } from "../component/Card";

export default function Main() {
  const pokemonData = useSelector((state) => state.data);
  const isLoading = useSelector((state) => state.loading);

  if (isLoading || !pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {pokemonData.map((el) => (
        <Card key={el.id} pokemon={el} />
      ))}
    </>
  );
}
