import Document, { Head, Html, Main, NextScript } from 'next/document';

class __Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="/favicon.ico" rel="icon" />
          <meta content="Example app about SSR of NextJS" name="description" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default __Document;
