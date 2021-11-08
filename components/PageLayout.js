import styled from 'styled-components';
import Head from 'next/head';

import Navigation from '../components/Navigation';

export default function PageLayout({ children }) {
  return (
    <>
      <Navigation />
      <Wrapper>{children}</Wrapper>
    </>
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
