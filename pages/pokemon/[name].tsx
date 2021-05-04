import LinkTo from 'components/LinkTo';
import { Pokemon as PokemonType } from 'models';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';

const getPokemon = async (name: string) => {
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? process.env.DEVELOPMENT_URL
      : process.env.PRODUCTION_URL;

  const response = await fetch(`${BASE_URL}/api/pokemon?name=${escape(name)}`);

  const data = (await response.json()) as PokemonType;

  return data;
};

type Props = {
  data: PokemonType;
};

function Pokemon({ data }: Props) {
  return (
    <>
      <div>
        <Head>
          <title>{(data ? data.name.english : null) || 'Pokemon'}</title>
        </Head>

        <Container>
          {data ? (
            <>
              <Row>
                <Col xs={6}>
                  <h1>{data.name.english}</h1>

                  <br />

                  {Object.entries(data.base).map(([key, value]) => (
                    <Row key={key}>
                      <Col xs={3}>
                        <p>{key}</p>
                      </Col>
                      <Col xs={4}>
                        <h5>{value}</h5>
                      </Col>
                    </Row>
                  ))}
                </Col>

                <Col xs={6}>
                  <Image
                    src={`/pokemon/${data.name.english
                      .toLowerCase()
                      .replace(' ', '-')}.jpg`}
                    height={350}
                    width={350}
                  />
                </Col>
              </Row>
            </>
          ) : null}

          <LinkTo href="/">
            <h3>Return to Home</h3>
          </LinkTo>
        </Container>
      </div>

      <style jsx>{`
        div {
          padding: 3rem;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const data = await getPokemon(params ? (params.name as string) : 'bewear');

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
    };
  }
};

export default Pokemon;
