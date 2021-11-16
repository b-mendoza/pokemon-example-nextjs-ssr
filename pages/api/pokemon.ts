import { NextApiRequest, NextApiResponse } from 'next';

import pokemonList from 'pokemon.json';

import { Pokemon } from 'typings/pokemon';

type Data = Pokemon | { message: string };

export default function getPokemon(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!req.query.name) {
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
        ? pokemon
        : { message: `Pokemon ${req.query.name as string} - Not Found` },
    );
}
