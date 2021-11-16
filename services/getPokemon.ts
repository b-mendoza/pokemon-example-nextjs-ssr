import { GetPokemonAPIResponse } from 'typings/api';

export const getPokemon = async (name = 'bewear') => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pokemon?name=${encodeURI(name)}`,
  );

  return (await response.json()) as Promise<GetPokemonAPIResponse>;
};
