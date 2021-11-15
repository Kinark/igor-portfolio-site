import styled, { css, keyframes } from 'styled-components';

import { DEFAULT_TRANSITION_DURATION } from '../constants/variables';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    transform: 1;
  }
`;

const FadeAwaySection = styled.div`
  transition: opacity ${DEFAULT_TRANSITION_DURATION}ms;
  opacity: ${({ goAway }) => (!goAway ? 1 : 0)};
  animation: ${fadeIn} ${DEFAULT_TRANSITION_DURATION}ms ease-out;
  margin: 32px 0;
  min-height: 100%;
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};
`;

export default FadeAwaySection;
