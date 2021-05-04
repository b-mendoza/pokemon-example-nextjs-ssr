import { Pokemon } from 'models';
import { NextApiRequest, NextApiResponse } from 'next';
import pokemon from 'pokemon.json';

type Data = Pokemon[];

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const filter = req.query.q ? new RegExp(req.query.q as string, 'i') : /.*/;

  res.statusCode = 200;

  res.setHeader('Content-Type', 'application/json');

  res.end(
    JSON.stringify(
      pokemon
        .filter(({ name: { english } }) => filter.exec(english))
        .slice(0, 10),
    ),
  );
};
