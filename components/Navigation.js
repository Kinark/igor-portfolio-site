/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef, createRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styled, { css, keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

import { WAITING_FOR_PAGE_CLOSE_ANIMATION, PAGE_CLOSE_ANIMATION_DONE } from '../constants/events';
import { DEFAULT_TRANSITION_DURATION } from '../constants/variables';
import styles from '../styles/Home.module.css';

const floatingItems = [
  { label: 'My works', href: '/my-works', delay: Math.random(), speed: Math.random(), top: '10', left: '5' },
  { label: '🎊', href: '', delay: Math.random(), speed: Math.random(), top: '8', right: '34' },
  { label: '🎉', href: '', delay: Math.random(), speed: Math.random(), top: '20', left: '33' },
  { label: 'Get in touch', href: '/contact', delay: Math.random(), speed: Math.random(), bottom: '25', left: '10' },
  { label: '🚀', href: '', delay: Math.random(), speed: Math.random(), bottom: '25', right: '22' },
  { label: 'About', href: '/about', delay: Math.random(), speed: Math.random(), top: '22', right: '22' },
];

const rightIndex = (route) => floatingItems.findIndex((el) => el.href === route);

const resetAnimation = () => ({
  x: 0,
  y: 0,
  transition: {
    duration: DEFAULT_TRANSITION_DURATION / 1000,
  },
});
const startAnimation = ({ delay, speed }) => ({
  y: 40,
  transition: {
    delay,
    duration: 1.5 + speed,
    repeat: Infinity,
    repeatType: 'reverse',
  },
});
const restartAnimation = ({ speed }) => ({
  y: 40,
  transition: {
    delay: 0,
    duration: 1.5 + speed,
    repeat: Infinity,
    repeatType: 'reverse',
  },
});

const initialSelected = (pathname) => (rightIndex(pathname) !== -1 ? rightIndex(pathname) : null);

export default function Navigation() {
  const controls = useRef(floatingItems.map(useAnimation));
  const floatingElsRefs = useRef(floatingItems.map(() => createRef()));
  const floatingElsPositions = useRef(floatingItems.map(() => null));
  const currentTimer = useRef(null);
  const router = useRouter();
  const [selected, _setSelected] = useState(initialSelected(router.pathname));
  const selectedRef = useRef(selected);
  const prevSelectedRef = useRef(undefined);
  const currentPathname = useRef(router.pathname);

  const setSelected = (data) => {
    _setSelected((prevSelected) => {
      prevSelectedRef.current = prevSelected;
      selectedRef.current = data;
      return data;
    });
  };

  const closeLink = async () => {
    currentTimer.current = setTimeout(() => {
      if (currentPathname.current !== '/') router.push('/');
      currentTimer.current = null;
    }, DEFAULT_TRANSITION_DURATION);
    setSelected(null);
  };

  const openLink = (e, i) => {
    const currentHref = e && e.target.href;
    currentTimer.current = setTimeout(() => {
      if (currentHref) router.push(currentHref);
      currentTimer.current = null;
    }, 0);
    setSelected(i);
  };

  const onLinkClick = (i) => async (e) => {
    if (e) e.preventDefault();

    if (currentTimer.current) return;
    if (selected !== null) return document.dispatchEvent(new Event(WAITING_FOR_PAGE_CLOSE_ANIMATION));

    openLink(e, i);
  };

  const activateSelectedAnimation = () => {
    controls.current[selected].start({
      y: -floatingElsPositions.current[selected].y + 20,
      x: -floatingElsPositions.current[selected].x + 20,
      transition: {
        delay: 0,
        duration: DEFAULT_TRANSITION_DURATION / 1000,
      },
    });
  };

  const activateBreathingAnimation = async () => {
    await controls.current[prevSelectedRef.current].start(resetAnimation);
    controls.current[prevSelectedRef.current].start(restartAnimation);
  };

  useEffect(() => {
    controls.current.forEach((el, i) => {
      floatingElsPositions.current[i] = floatingElsRefs.current[i].current.getBoundingClientRect();
      if (i !== selected) el.start(startAnimation);
    });
    document.addEventListener(PAGE_CLOSE_ANIMATION_DONE, closeLink);
    return () => {
      document.removeEventListener(PAGE_CLOSE_ANIMATION_DONE, closeLink);
    };
  }, []);

  useEffect(() => {
    if (prevSelectedRef.current !== undefined && selected === null) activateBreathingAnimation();
    if (selected === null || !floatingElsPositions.current[selected]) return;
    activateSelectedAnimation();
  }, [selected, floatingElsPositions, prevSelectedRef]);

  useEffect(() => {
    currentPathname.current = router.pathname;
    if (router.pathname === '/' && selected !== null) closeLink();
    else if (rightIndex(router.pathname) !== -1 && selected !== rightIndex(router.pathname))
      openLink(null, rightIndex(router.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <Wrapper>
      {floatingItems.map(({ label, delay, speed, href, ...rest }, i) => (
        <Floating
          {...rest}
          href={selected === i ? '/' : href}
          ref={floatingElsRefs.current[i]}
          onClick={onLinkClick(i)}
          key={i}
          custom={{ delay, i, speed }}
          animate={controls.current[i]}
          selected={selected === i}
          inTheBg={selected !== null && selected !== i}
        >
          {label}
        </Floating>
      ))}
      <TextWrapper inTheBg={selected !== null}>
        <div>
          <Bold>Hey! 👋</Bold>
          <br />
          I&apos;m Igor Marcossi, a 23 years old <Light>UI Designer</Light> and <Light>front-end developer</Light>.
        </div>
      </TextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 95%;
  margin: auto;
  max-width: 1150px;
  height: 100%;
  z-index: 2;
`;
const TextWrapper = styled.div`
  height: 100%;
  max-width: 600px;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 40px;
  margin: auto;
  transition: top ${DEFAULT_TRANSITION_DURATION}ms, left ${DEFAULT_TRANSITION_DURATION}ms,
    filter ${DEFAULT_TRANSITION_DURATION}ms;
  filter: ${({ inTheBg }) => inTheBg && 'blur(20px)'};
  pointer-events: ${({ inTheBg }) => (inTheBg ? 'none' : 'auto')};
  @media (max-width: 960px) {
    font-size: 32px;
  }
`;

const Bold = styled.span`
  font-weight: 700;
  font-size: 48px;
  @media (max-width: 960px) {
    font-size: 40px;
  }
`;

const Light = styled.span`
  font-weight: 300;
  color: #a247cc;
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(20px);
  }
`;

const Floating = styled(motion.a)`
  border: none;
  cursor: pointer;
  position: fixed;
  background-color: #f6f6f6;
  border-radius: 18px;
  font-weight: 700;
  font-size: 24px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  @media (max-width: 960px) {
    font-size: 16px;
  }
  padding: 8px 16px;
  transition: background-color 300ms, top ${DEFAULT_TRANSITION_DURATION}ms, left ${DEFAULT_TRANSITION_DURATION}ms,
    filter ${DEFAULT_TRANSITION_DURATION}ms;
  filter: ${({ inTheBg }) => inTheBg && 'blur(20px)'};
  pointer-events: ${({ inTheBg }) => (inTheBg ? 'none' : 'auto')};
  &:hover {
    background-color: #f4f4f4;
  }
  &::before {
    margin-right: 4px;
    content: '';
    background-image: url('/assets/arrow-left-duotone.svg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 24px;
    width: ${({ selected }) => (selected ? '24px' : '0')};
    transition: width ${DEFAULT_TRANSITION_DURATION}ms;
  }
  ${({ top }) =>
    top &&
    css`
      top: ${top}%;
    `};
  ${({ left }) =>
    left &&
    css`
      left: ${left}%;
    `};
  ${({ right }) =>
    right &&
    css`
      left: ${100 - right}%;
    `};
  ${({ bottom }) =>
    bottom &&
    css`
      top: ${100 - bottom}%;
    `};
`;
