import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 140vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 30px 0 60px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 100px 0 20px 2px;
    }
  }

  h2 {
    margin: 20px 0 10px 4px;
    font-size: 56px;
  }

  h3 {
    margin-top: 20px;
    color: var(--slate);
    line-height: 1.2;
    font-size: 24px;
  }

  p {
    margin: 10px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 25px;
    margin-bottom: 10px;
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 25px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi there, my name is</h1>;
  const two = <h2 className="big-heading">Simon Meier</h2>;
  const three = (
    <h3 className="big-heading">
      I build all kind of apps and lazily make video games with epic metal soundtracks featuring my
      beloved{' '}
      <u>
        <em>Legator Ghost</em>
      </u>
      .
      <div className="inner">
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/legator_ghost.png"
              width={256}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
      <br></br>
    </h3>
  );

  const four = (
    <>
      <p>
        My objective is to develop functional and robust applications in both academic and
        industrial fields.
      </p>
      <p>
        In <strong>2022</strong>, I obtained a{' '}
        <a
          href="https://www.he-arc.ch/ingenierie/bachelor/informatique-et-systemes-de-communication/"
          target="_blank"
          rel="noreferrer">
          Bsc. in Computer Science
        </a>
        , spiecialized in software engineering following the courses from the{' '}
        <a href="https://he-arc.com/" target="_blank" rel="noreferrer">
          He-Arc
        </a>{' '}
        in <strong>Switzerland</strong>.
      </p>
    </>
  );

  const five = (
    <div className="inner">
      <a
        className="email-link"
        href="https://soundcloud.com/simon_meier/sets/the-shadows-hunger-ep"
        target="_blank"
        rel="noreferrer">
        New EP is out
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
