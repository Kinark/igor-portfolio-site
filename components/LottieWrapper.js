import styled from 'styled-components';

import { DEFAULT_TRANSITION_DURATION } from '../constants/variables';

const LottieWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  background-color: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.5)' : 'transparent')};
  backdrop-filter: ${({ active }) => active && 'blur(16px) saturate(3)'};
  transition: background-color ${DEFAULT_TRANSITION_DURATION}ms ease-out,
    backdrop-filter ${DEFAULT_TRANSITION_DURATION}ms ease-out;
  & > * {
    opacity: ${({ active }) => (active ? '1' : '0')};
    transition: opacity ${DEFAULT_TRANSITION_DURATION}ms;
  }
`;

export default LottieWrapper;
