import { NextApiRequest, NextApiResponse } from 'next';

import pokemon from 'pokemon.json';

import { SearchPokemonsAPIResponse } from 'typings/api';
import { Pokemon } from 'typings/pokemon';

type Data = SearchPokemonsAPIResponse;

export default function searchPokemon(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const typedPokemonList = pokemon as Pokemon[];

  const filter = req.query.q ? new RegExp(req.query.q as string, 'i') : /.*/;

  res.status(200).json({
    pokemonList: typedPokemonList
      .filter((pokemon) => {
        const { name } = pokemon;

        return filter.exec(name.english);
      })
      .slice(0, 10),
  });
}
