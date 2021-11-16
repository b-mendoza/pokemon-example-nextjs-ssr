import { formatPokemonName } from './formatPokemonName';

export const getPokemonImagePathname = (pokemonName: string) => {
  return `/pokemon/${formatPokemonName(pokemonName)}.jpg`;
};
