import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';

import { Pokemon } from 'typings/pokemon';

import { formatPokemonName } from 'utils/formatPokemonName';

type PokemonData = Pokemon;

const PokemonData = (props: PokemonData) => {
  const { base, name } = props;

  return (
    <>
      <Row className="mb-3">
        <h1>{name.english}</h1>
      </Row>

      <Row className="mb-3">
        {Object.entries(base).map(([property, value], index) => (
          <Col className="d-grid gap-4" key={index} md={4} sm={6} xs={12}>
            <div className="d-flex justify-content-between">
              <p>{property}</p>

              <p>
                <strong>{value}</strong>
              </p>
            </div>
          </Col>
        ))}
      </Row>

      <section className="imageContainer">
        <Image
          alt={name.english}
          height={248}
          layout="responsive"
          priority
          src={`/pokemon/${formatPokemonName(name.english)}.jpg`}
          title={name.english}
          width={248}
        />
      </section>

      <style jsx>{`
        section.imageContainer {
          margin: 0 auto;

          max-width: 40rem;
        }
      `}</style>
    </>
  );
};

export default PokemonData;
