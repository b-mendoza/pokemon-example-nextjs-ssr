import { Pokemon } from './pokemon';

export type GetPokemonAPIResponse = { pokemon: Pokemon } | { message: string };

export type SearchPokemonsAPIResponse = {
  pokemonList: Pokemon[];
};
