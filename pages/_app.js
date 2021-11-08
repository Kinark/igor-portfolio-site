import styled, { css, keyframes } from 'styled-components';

import Navigation from '../components/Navigation';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps}></Component>);
}

export default MyApp;
