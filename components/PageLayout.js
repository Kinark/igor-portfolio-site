import styled from 'styled-components';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import Navigation from '../components/Navigation';

const theme = {
  flexboxgrid: {
    // Defaults
    gridSize: 12, // columns
    gutterWidth: 3, // rem
    outerMargin: 2, // rem
    mediaQuery: 'only screen',
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 76, // rem
    },
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 64, // em
      lg: 75, // em
    },
  },
};

export default function PageLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.main`
  width: 95%;
  max-width: 1150px;
  margin: 120px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 3;
`;
