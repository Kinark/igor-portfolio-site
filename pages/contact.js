import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Col, Row } from 'react-styled-flexboxgrid';
import { useForm } from '@formcarry/react';
import Lottie from 'react-lottie';

import PageLayout from '../components/PageLayout';
import Navigation from '../components/Navigation';
import LottieWrapper from '../components/LottieWrapper';
import FadeAwaySection from '../components/FadeAwaySection';
import useIsPageClosing from '../hooks/useIsPageClosing';
import successLottie from '../assets/lottie/64787-success.json';

const defaultLottieOptions = {
  loop: false,
  autoplay: false,
  animationData: successLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Contact() {
  const isPageClosing = useIsPageClosing();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isStopped, setIsStopped] = useState(true);
  const { state, submit } = useForm({
    id: 'xbP1lvMtAqA',
  });

  const handleSubmit = (e, ...rest) => {
    e.preventDefault();
    submit(e, ...rest);
  };

  const closeOverlay = (e) => {
    setIsStopped(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    if (state.submitted) setIsStopped(false);
  }, [state.submitted]);
  return (
    <>
      <Head>
        <title>Get in touch</title>
        <meta name="description" content="Hey, nice to meet ya!" />
        <meta property="og:image" content="/assets/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LottieWrapper active={!isStopped}>
        <Lottie options={defaultLottieOptions} height={300} width={300} isStopped={isStopped} isPaused={false} />
        <TitleSmall>Thanks! I&apos;ll get in touch ASAP!</TitleSmall>
        <Button onClick={closeOverlay}>Close</Button>
      </LottieWrapper>
      <FadeAwaySection goAway={isPageClosing}>
        <Wrapper onSubmit={handleSubmit} loading={state.submitting}>
          <Title>Let&apos;s talk!</Title>
          <p>Send me a message if you want to work together or just say hi.</p>
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </Card>
            </Col>
            <Col xs={12} md={12}>
              <Card>
                <Textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  name="message"
                  placeholder="Hey, Igor! How is it going?"
                />
              </Card>
            </Col>
          </Row>
          <Button fullWidth type="submit">
            {state.submitting ? 'Just a second...' : 'Send'}
          </Button>
        </Wrapper>
      </FadeAwaySection>
    </>
  );
}

const Button = styled.button`
  background: #a247cc;
  border-radius: 32px;
  padding: 16px 32px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
  border: none;
  display: block;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  cursor: pointer;
  margin-top: 8px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 18px;
  font-family: inherit;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  width: 100%;
  font-size: 18px;
  border: none;
  background: transparent;
  outline: none;
  resize: vertical;
  min-height: 150px;
`;

const Title = styled.h1`
  font-size: 72px;
  color: #a247cc;
  margin: 0;
  line-height: 72px;
`;

const TitleSmall = styled.h1`
  font-size: 24px;
  color: #a247cc;
  margin: 0;
  line-height: 72px;
`;

const Card = styled.div`
  background: #f6f6f6;
  border-radius: 32px;
  padding: 32px;
  margin: 8px 0;
`;

const Wrapper = styled.form`
  margin: 0 16px;
  pointer-events: ${(props) => (props.loading ? 'none' : 'auto')};
  p {
    margin: 0 0 16px;
  }
`;

Contact.getLayout = (page) => <PageLayout>{page}</PageLayout>;
