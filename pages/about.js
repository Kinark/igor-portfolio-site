import { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { Col, Row } from 'react-styled-flexboxgrid';

import igorPic from '../assets/me.jpg';
import cardAge from '../assets/CardAge.svg';
import cardLocation from '../assets/CardLocation.svg';
import cardMobileDev from '../assets/CardMobileDev.svg';
import cardWebDev from '../assets/CardWebDev.svg';
import cardDesigner from '../assets/CardDesigner.svg';
import cardSkills from '../assets/CardSkills.svg';
import cardLanguages from '../assets/CardLanguages.svg';
import oeste from '../assets/oeste.jpg';
import bidu from '../assets/bidu.jpg';
import Navigation from '../components/Navigation';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import useIsPageClosing from '../hooks/useIsPageClosing';
import { DEFAULT_TRANSITION_DURATION } from '../constants/variables';

const About = () => {
  const isPageClosing = useIsPageClosing();

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Hey, nice to meet ya!" />
        <meta property="og:image" content="/assets/ogimage.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section middle="xs" goAway={isPageClosing}>
        <Col xs={12} sm={4}>
          <IgorPicWrapper>
            <Image src={igorPic} height="350" width="350" alt="Igor Marcossi picture" />
          </IgorPicWrapper>
        </Col>
        <Col xs={12} sm={8}>
          <Title>
            I&apos;m Igor,
            <br />
            pleasure to meet ya 👋
          </Title>
          <BigText>
            I&apos;m a fullstack JS Developer for 8+ years of experience and a graphic/UI designer for 14+ years of
            experience.
          </BigText>
          <PhotoWrapper>
            <Image src={cardAge} height="110" width="110" alt="Igor Marcossi picture" />
            <Image src={cardLocation} height="110" width="110" alt="Igor Marcossi picture" />
            <Image src={cardMobileDev} height="110" width="110" alt="Igor Marcossi picture" />
            <Image src={cardWebDev} height="110" width="110" alt="Igor Marcossi picture" />
            <Image src={cardDesigner} height="110" width="110" alt="Igor Marcossi picture" />
          </PhotoWrapper>
        </Col>
      </Section>
      <Section middle="xs" goAway={isPageClosing}>
        <Col xs={12} sm={6} md={7}>
          <TitlePurple>What happened</TitlePurple>
          <Text>
            I&apos;ve been working with computers throughout all my life. I love technology and I have a deep passion
            for logic and solving problems. Creating solutions that make the world more beautiful and more functional is
            what makes me keep moving. I keep some open source projects on GitHub and contributed to some other ones.
            I&apos;ve been creating, designing and developing projects for so many years that it became my way of
            thinking. I always want to find better solutions to what we have.
          </Text>
        </Col>
        <CardsWrapper mdOffset={1} xs={12} sm={6} md={4}>
          <Image src={cardSkills} height="149" width="233" alt="Skills" />
          <Image src={cardLanguages} height="114" width="216" alt="Languages" />
        </CardsWrapper>
      </Section>
      <Section goAway={isPageClosing}>
        <Col xs={12}>
          <PicWrapper>
            <Image src={oeste} layout="responsive" alt="Oeste picture" />
            <OestePicLabelWrapper>
              <TitleOeste color="white">This is Oeste, our young cat.</TitleOeste>
              <Text color="white">I thought it&apos;d be exciting to see a cat pic in the middle of the text.</Text>
            </OestePicLabelWrapper>
          </PicWrapper>
        </Col>
      </Section>
      <Section align="right" goAway={isPageClosing}>
        <Col xs={12} md={8}>
          <TitlePurple>Nevertheless</TitlePurple>
          <Text>
            Other than that, I&apos;m a crypto enthusiast, a writer for hobby and I love video games. Oh, I’ve been a
            game designer back in time! I also deeply love UI/UX, so one of the things I most enjoy in building apps
            (web or mobile) is to make cool micro interactions and making the user experience the most awesome thing
            ever.
          </Text>
          <TitlePurple>Our old cat</TitlePurple>
          <Text>By the way, this is Bidu, our 17yo cat :D</Text>
        </Col>
        <Col xs={12} md={4}>
          <PicWrapper>
            <Image src={bidu} layout="responsive" alt="Oeste picture" />
          </PicWrapper>
        </Col>
      </Section>
    </>
  );
};

About.getLayout = (page) => <PageLayout>{page}</PageLayout>;

export default About;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    transform: 1;
  }
`;

const PicWrapper = styled.div`
  position: relative;
  border-radius: 80px;
  overflow: hidden;
  margin: 16px 0;
  @media (max-width: 960px) {
    border-radius: 40px;
  }
`;

const OestePicLabelWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px 56px;
  @media (max-width: 960px) {
    padding: 16px 28px;
  }
`;

const Section = styled(Row)`
  transition: opacity ${DEFAULT_TRANSITION_DURATION}ms;
  opacity: ${({ goAway }) => (!goAway ? 1 : 0)};
  animation: ${fadeIn} ${DEFAULT_TRANSITION_DURATION}ms ease-out;
  margin: 32px 0;
  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `};
`;

const IgorPicWrapper = styled.div`
  border-radius: 80px;
  overflow: hidden;
  display: block;
  font-size: 0;
  margin: 0 auto 20px;
  text-align: center;
  max-width: 350px;
`;

const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px auto 0;
  @media (max-width: 960px) {
    gap: 4px;
  }
`;

const CardsWrapper = styled(Col)`
  position: relative;
  height: 279px;
  margin: 16px 0;
  & > div:first-child {
    position: absolute !important;
    top: 0;
    left: 0;
    @media (max-width: 960px) {
      left: 20px;
    }
  }
  & > div:last-child {
    position: absolute !important;
    bottom: 0;
    right: 0;
    @media (max-width: 960px) {
      right: 20px;
    }
  }
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 8px;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitlePurple = styled.p`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 8px;
  color: #a247cc;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;

const TitleOeste = styled.p`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 8px;
  color: white;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 960px) {
      font-size: 18px;
      margin-bottom: 4px;
      line-height: 18px;
    }
`;

const BigText = styled.p`
  font-size: 24px;
  margin: 0;
`;

const Text = styled.p`
  font-size: 18px;
  margin: 8px 0;
  font-weight: 300;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 960px) {
    font-size: 16px;
    }
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;
