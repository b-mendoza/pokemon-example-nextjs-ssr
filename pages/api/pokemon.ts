import { NextApiRequest, NextApiResponse } from 'next';

import pokemonList from 'pokemon.json';

import { GetPokemonAPIResponse } from 'typings/api';
import { Pokemon } from 'typings/pokemon';

type Data = GetPokemonAPIResponse;

export default function getPokemon(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!req.query.name || typeof req.query.name !== 'string') {
    res.status(400).json({ message: '`name` param was not provided' });

    return;
  }

  const typedPokemonList = pokemonList as Pokemon[];

  const pokemon = typedPokemonList.find((pokemon) => {
    const { name } = pokemon;

    return name.english === req.query.name;
  });

  res
    .status(pokemon ? 200 : 404)
    .json(
      pokemon
        ? { pokemon }
        : { message: `Pokemon ${req.query.name} - Not Found` },
    );
}
