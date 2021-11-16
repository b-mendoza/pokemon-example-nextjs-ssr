import Image from 'next/image';
import { Card } from 'react-bootstrap';

import { Pokemon } from 'typings/pokemon';

import { getPokemonImagePathname } from 'utils/getPokemonImagePathname';

type PokemonCardProps = Pokemon;

const PokemonCard = (props: PokemonCardProps) => {
  const { name, type } = props;

  return (
    <Card>
      <Image
        alt={name.english}
        height={270}
        layout="responsive"
        src={getPokemonImagePathname(name.english)}
        title={name.english}
        width={270}
      />

      <Card.Body>
        <Card.Title>{name.english}</Card.Title>
        <Card.Subtitle>{type.join(', ')}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
