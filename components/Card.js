import styled from 'styled-components';

const Card = ({ children, ...rest }) => (
  <OutWrapper {...rest}>
    <InnerWrapper>{children}</InnerWrapper>
  </OutWrapper>
);

export default Card;

const OutWrapper = styled.div`
  border-radius: 41px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.15);
`;

const InnerWrapper = styled.div`
  backdrop-filter: blur(20px);
  background: rgba(250, 250, 250, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 32px;
  border-radius: 40px;
`;
