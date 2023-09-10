import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 10px 20px 20px;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
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

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Android Studio',
    'VueJS',
    'Django',
    'React',
    '.NET',
    'Node.js',
    'Three.js',
    'Laravel',
    'Qt',
    'Bootstrap',
    'Unity',
    'SpringBoot',
    'Processing',
    'Capistrano',
    'Snowflake',
    'UiPath',
  ];

  const programming_languages = [
    'C++',
    'C',
    'Java',
    'C#',
    'Python',
    'HTML5',
    'Javascript',
    'CSS',
    'PHP',
    'Latex',
    'Kotlin',
    'SQL',
    'VB Net',
  ];

  const languages = ['French   - Native', 'English  - C1', 'German   - B2'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I enjoy the development of projects and the process of creating concrete things from
              abstract models &amp; ideas. My interest in software development started while playing
              video games back when the{' '}
              <a href="https://fr.wikipedia.org/wiki/Nintendo_64">Nintendo 64</a> came out.
            </p>

            <p>
              Even if it doesn't sound very serious, it has always fascinate me how <em>games</em>{' '}
              were made, and what was the magic that made them <em>work</em>. Found out it was
              mainly <strong>mathematics</strong> and <strong>creativity </strong>
              bounded with the willpower to give life to pixels.
            </p>

            <p>
              Fast-forward to today, I had the opportunity to work with a large variety of tools,
              languages and frameworks to realize around{' '}
              <a href="https://github.com/MrAresInFlesh">20</a> different projects.
            </p>

            <p>
              Recently, my bachelor thesis was an Android project about thermal imaging using{' '}
              <a href="https://www.flir.com/products/flir-one-pro/">
                FLIR One Pro camera and its SDK
              </a>{' '}
              .
            </p>

            <p>Here are a few technologies I am using frequently:</p>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>

            <di>
              <p>Some programming languages I am comfortable with:</p>
            </di>

            <ul className="skills-list">
              {programming_languages && programming_languages.map((l, i) => <li key={i}>{l}</li>)}
            </ul>

            <di>
              <p>Languages that I speak and write fluently:</p>
            </di>

            <ul className="skills-list">
              {languages && languages.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
