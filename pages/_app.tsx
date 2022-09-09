import "../styles/globals.css";
import type { AppProps } from "next/app";
import "inter-ui/inter.css";
import Layout from "components/Layout";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "components/Datepicker/styles/override_datepicker.css";
import "components/Select/styles/override_select.css";
import FlightContextProvider from "context/FlightsContext";
import { AnimatePresence } from "framer-motion";
import Nav from "components/Nav";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Smiles Helper | @devCassa</title>
        <meta property="og:title" content={"Smiles Helper | @devCassa"} />
        <meta property="twitter:title" content={"Smiles Helper | @devCassa"} />

        <meta
          property="description"
          content={"Encontrá las mejores ofertas para vos!"}
        />
        <meta
          property="og:description"
          content={"Encontrá las mejores ofertas para vos!"}
        />
        <meta
          name="twitter:description"
          content={"Encontrá las mejores ofertas para vos!"}
        />

        <meta property="og:image" content={"https://i.imgur.com/vqqhYpu.png"} />
        <meta
          name="twitter:image"
          content={"https://i.imgur.com/vqqhYpu.png"}
        />
        <meta name="image" content={"https://i.imgur.com/vqqhYpu.png"} />

        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <FlightContextProvider>
        <Nav />
        <AnimatePresence initial>
          <Layout key={"index"}>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </FlightContextProvider>
    </>
  );
}

export default MyApp;
