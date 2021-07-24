import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../client/theme';

export default class MyDocument extends Document {

  static async getInitialProps(ctx) {

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/*==== PWA primary color ====*/}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/*==== Reset css ====*/}
          <style>
            {`
                            body {
                                box-sizing: border-box;
                              }
                              
                              *, *::before, *::after {
                                box-sizing: inherit;
                              }
                              
                              h1, h2, h3, h4, h5, p {
                                margin: 0;
                              }
                              
                              input, textarea {
                                font-family: inherit;
                                border: 0;
                                margin: 0;
                                padding: 0;
                                background-color: transparent;
                                appearance: none;
                                -webkit-appearance: none;
                                border-radius: 0;
                              }
                              
                              button {
                                margin: 0;
                                border: 0;
                                font-family: inherit;
                                background-color: transparent;
                                appearance: none;
                              }
                              
                              a {
                                text-decoration: none;
                                cursor: pointer;
                              }
                              
                              ul {
                                margin: 0;
                                padding-left: 1em;
                              }
                        `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
