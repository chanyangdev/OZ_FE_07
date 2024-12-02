import { useSelector } from "react-redux";
export default function Main() {
  const pokemonData = useSelector((state) => state.pokemon);

  return (
    <div>
      {pokemonData.map((el) => (
        <section key={el.id}>
          <img src={el.front} alt={el.name} />
          <div>{el.name}</div>
        </section>
      ))}
    </div>
  );
}

