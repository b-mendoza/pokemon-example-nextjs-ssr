import { NextApiRequest, NextApiResponse } from 'next'

import { Pokemon } from 'models'

import pokemon from 'pokemon.json'

type Data = Pokemon

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (!req.query.name) {
    res.statusCode = 400

    res.end('Must have a name')
  } else {
    const found = pokemon.filter(
      ({ name: { english } }) => english === req.query.name
    )

    if (found.length === 0) {
      res.statusCode = 404

      res.end(`Pokemon ${req.query.name} - Not Found`)
    } else {
      res.statusCode = 200

      res.setHeader('Content-Type', 'application/json')

      res.end(JSON.stringify(found[0]))
    }
  }
}
