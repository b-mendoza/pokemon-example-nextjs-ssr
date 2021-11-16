import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';

import pokemonList from 'pokemon.json';

import { Pokemon } from 'typings/pokemon';

type PokemonViewProps = {
  data: Pokemon | null;
};

const formatPokemonName = (name: string) =>
  name.toLowerCase().replace(' ', '-');

function PokemonView({ data }: PokemonViewProps) {
  const { base, name } = data ?? {};

  return (
    <>
      <Head>
        <title>{name?.english || 'Pokemon'}</title>
      </Head>

      <main>
        <Container>
          {data ? (
            <>
              <Row className="mb-3">
                <h1>{name?.english}</h1>
              </Row>

              <Row className="mb-3">
                {base
                  ? Object.entries(base).map(([propertie, value], index) => (
                      <Col
                        className="d-grid gap-4"
                        key={index}
                        md={4}
                        sm={6}
                        xs={12}
                      >
                        <div className="d-flex justify-content-between">
                          <p>{propertie}</p>

                          <p>
                            <strong>{value}</strong>
                          </p>
                        </div>
                      </Col>
                    ))
                  : null}
              </Row>

              {name?.english ? (
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
              ) : null}
            </>
          ) : null}

          <footer>
            <Link href="/">
              <a>
                <p>
                  <strong>Back to Home</strong>
                </p>
              </a>
            </Link>
          </footer>
        </Container>
      </main>

      <style jsx>{`
        main {
          padding: 1.5rem;
        }

        section.imageContainer {
          margin: 0 auto;

          max-width: 40rem;
        }
      `}</style>
    </>
  );
}

type RouteParams = {
  name: string;
};

export const getStaticPaths: GetStaticPaths<RouteParams> = () => ({
  fallback: false,
  paths: pokemonList.map((pokemon) => {
    const { name } = pokemon;

    return {
      params: { name: name.english },
    };
  }),
});

export const getStaticProps: GetStaticProps<PokemonViewProps, RouteParams> = (
  context,
) => {
  const { params } = context;

  const typedPokemonList = pokemonList as Pokemon[];

  const pokemon = typedPokemonList.find((pokemon) => {
    const { name } = pokemon;

    return name.english === params?.name;
  });

  return {
    props: { data: pokemon ?? null },
  };
};

export default PokemonView;
