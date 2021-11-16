import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';

import { getPokemon } from 'services/getPokemon';

import { GetPokemonAPIResponse } from 'typings/api';

import { formatPokemonName } from 'utils/formatPokemonName';

type PokemonViewProps = GetPokemonAPIResponse;

function PokemonView(props: PokemonViewProps) {
  if ('message' in props) return <h1>{props.message}</h1>;

  const { base, name } = props.pokemon;

  return (
    <>
      <Head>
        <title>{name.english || 'Pokemon'}</title>
      </Head>

      <main>
        <Container>
          <>
            <Row className="mb-3">
              <h1>{name.english}</h1>
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

export const getServerSideProps: GetServerSideProps<
  PokemonViewProps,
  RouteParams
> = async (context) => {
  try {
    const { params } = context;

    const getPokemonResponse = await getPokemon(params?.name);

    if ('pokemon' in getPokemonResponse) {
      return {
        props: { pokemon: getPokemonResponse.pokemon },
      };
    }

    return {
      props: { message: getPokemonResponse.message },
    };
  } catch {
    return {
      props: { message: 'Something went wrong', pokemon: null },
    };
  }
};

export default PokemonView;
