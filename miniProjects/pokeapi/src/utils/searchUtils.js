import { getRegExp, explode } from 'korean-regexp';

export const filterPokemonsBySearch = (pokemons, searchInput) => {
  // If no query, return all Pokemon
  if (!searchInput) return pokemons;

  // Convert search input to lowercase for case-insensitive matching
  const normalizedInput = searchInput.toLowerCase();

  // Create advanced Korean-friendly regex
  const koreanRegex = getRegExp(normalizedInput, {
    initialSearch: true,  // Match from the start of syllables
    ignoreSpace: true,    // Ignore spaces in matching
    ignoreCase: true      // Case-insensitive matching
  });

  return pokemons.filter(pokemon => {
    // Check matching against Korean and English names
    const nameMatches = (name) => {
      // Try full name match
      if (koreanRegex.test(name.toLowerCase())) return true;

      // Try phoneme-based matching
      try {
        // Explode the name into phonemes
        const namePhonemes = explode(name);
        const inputPhonemes = explode(normalizedInput);

        // Check if input phonemes are a subset of name phonemes
        return inputPhonemes.every(phoneme => 
          namePhonemes.includes(phoneme)
        );
      } catch {
        // Fallback to standard regex if phoneme extraction fails
        return false;
      }
    };

    return (
      (pokemon.name_ko && nameMatches(pokemon.name_ko)) || 
      nameMatches(pokemon.name)
    );
  });
};

export const filterPokemonsByType = (pokemons, selectedTypes) => {
  if (!selectedTypes || selectedTypes.length === 0) return pokemons;
  
  return pokemons.filter(pokemon =>
    selectedTypes.every(selectedType =>
      pokemon.types.some(type => type.type.name_ko === selectedType)
    )
  );
};
