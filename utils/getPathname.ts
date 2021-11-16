export const getPokemonImagePathname = (pokemonName: string) => {
  return `/pokemon/${pokemonName.toLowerCase().replace(' ', '-')}.jpg`;
};
