import debounce from 'lodash.debounce';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import useSWR from 'swr';

import PokemonCard from 'components/PokemonCard';

import { searchPokemons } from 'services/searchPokemons';

import { SearchPokemonsAPIResponse } from 'typings/api';
import { CustomPageProps } from 'typings/shared';

const initialURLRequest = `/api/search?q=${encodeURI('')}`;

function Home() {
  const { data: response, mutate } = useSWR<SearchPokemonsAPIResponse, Error>(
    initialURLRequest,
  );

  const pokemonList = response?.pokemonList;

  const debouncedHandleSearch = useMemo(
    () =>
      debounce<
        NonNullable<React.ComponentProps<typeof FormControl>['onChange']>
      >(async (event) => {
        const input = event.target as HTMLInputElement;

        const inputValue = input.value;

        try {
          const data = await searchPokemons(inputValue);

          await mutate(data, false);
        } catch {
          console.error('__ERROR__', 'Fetching more Pokemons');
        }
      }, 500),
    [mutate],
  );

  return (
    <>
      <Head>
        <title>Pokemon</title>
      </Head>

      <main>
        <Container className="p-0">
          <FormControl
            aria-label="Search"
            className="mb-4"
            placeholder="Search"
            onChange={debouncedHandleSearch}
          />

          {pokemonList?.length ? (
            <Row xs={1} md={2} lg={3} xl={4}>
              {pokemonList.map((pokemon) => {
                const { id, name } = pokemon;

                return (
                  <Col key={id} className="mb-4">
                    <Link
                      href={`/pokemon/${encodeURI(name.english)}`}
                      prefetch={false}
                    >
                      <a>
                        <PokemonCard {...pokemon} />
                      </a>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          ) : null}
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

export const getServerSideProps: GetServerSideProps<CustomPageProps> = async () => {
  try {
    const data = await searchPokemons();

    return {
      props: {
        fallback: { [`${initialURLRequest}`]: data },
      },
    };
  } catch {
    return {
      props: {
        fallback: { [`${initialURLRequest}`]: null },
      },
    };
  }
};

export default Home;
