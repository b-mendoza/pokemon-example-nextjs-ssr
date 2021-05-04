import axios from 'axios';
import LinkTo from 'components/LinkTo';
import { Pokemon } from 'models';
import Head from 'next/head';
import { useState } from 'react';
import { Card, CardColumns, Container, FormControl } from 'react-bootstrap';
import { useQuery } from 'react-query';

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

const getPokemon = async (_: string, query: string) => {
  const { data } = await axios.get<Pokemon[]>(`/api/search?q=${escape(query)}`);

  return data.map(pokemon => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english
      .toLowerCase()
      .replace(' ', '-')}.jpg`,
  }));
};

function Home() {
  const [query, setQuery] = useState('');

  const { data } = useQuery(['searchQuery', query], () =>
    getPokemon('searchQuery', query),
  );

  const handleSearch = (event: React.ChangeEvent<FormControlElement>) => {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    setQuery(inputValue);
  };

  return (
    <>
      <div>
        <Head>
          <title>Pokemon</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <FormControl
            aria-label="Search"
            placeholder="Search"
            value={query}
            onChange={handleSearch}
          />

          <br />

          {data ? (
            <CardColumns>
              {data.map(({ id, name, type, image }) => (
                <LinkTo key={id} href={`/pokemon/${name.english}`}>
                  <Card>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                      <Card.Title>{name.english}</Card.Title>
                      <Card.Subtitle>{type.join(', ')}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </LinkTo>
              ))}
            </CardColumns>
          ) : null}
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

export default Home;
