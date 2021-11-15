import styled from 'styled-components';
import Head from 'next/head';

import Navigation from '../components/Navigation';
import PageLayout from '../components/PageLayout';

const Home = () => {
  return (
    <>
      <Head>
        <title>Igor Marcossi</title>
        <meta name="description" content="Hey, nice to meet ya!" />
        <meta property="og:image" content="/assets/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

Home.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default Home;
