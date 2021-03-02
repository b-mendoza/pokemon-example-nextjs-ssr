import { Col, Container, Row } from 'react-bootstrap'
import { GetServerSideProps } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Pokemon as PokemonType } from 'models'

const getPokemon = async (name: string) => {
  const response = await fetch(`/api/pokemon?name=${escape(name)}`)

  const data: PokemonType = await response.json()

  return data
}

type Props = {
  data: PokemonType
}

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

          <Link href="/">
            <a>
              <h3>Return to Home</h3>
            </a>
          </Link>
        </Container>
      </div>

      <style jsx>{`
        div {
          padding: 3rem;
        }
      `}</style>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getPokemon(params ? (params.name as string) : 'bewear')

  return {
    props: {
      data: data
    }
  }
}

export default Pokemon
