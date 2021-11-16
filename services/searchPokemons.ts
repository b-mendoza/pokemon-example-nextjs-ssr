import { SearchPokemonsAPIResponse } from 'typings/api';

export const searchPokemons = async (searchQuery = '') => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/search?q=${encodeURI(
      searchQuery,
    )}`,
  );

  return (await response.json()) as Promise<SearchPokemonsAPIResponse>;
};
