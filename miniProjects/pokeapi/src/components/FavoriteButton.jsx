import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../RTK/slice";

function FavoriteButton({ pokemonId }) {
  const dispatch = useDispatch();
  // Check if this Pokemon is in favorites
  const isFavorite = useSelector((state) => 
    state.favorites.includes(pokemonId)
  );

  // Handle favorite toggle
  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Prevent event bubbling
    dispatch(toggleFavorite(pokemonId));
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-2 right-2 transition-transform hover:scale-110"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton; 