import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

import PokemonData from 'components/PokemonData';

import { getPokemon } from 'services/getPokemon';

import { GetPokemonAPIResponse } from 'typings/api';

type PokemonViewProps = GetPokemonAPIResponse;

function PokemonView(props: PokemonViewProps) {
  if ('message' in props) return <h1>{props.message}</h1>;

  const { name } = props.pokemon;

  return (
    <>
      <Head>
        <title>{name.english || 'Pokemon'}</title>
      </Head>

      <main>
        <Container>
          <PokemonData {...props.pokemon} />

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
