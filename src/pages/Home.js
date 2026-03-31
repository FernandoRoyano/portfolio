import React, { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  PiHandshake,
  PiLightbulb,
  PiRobot,
  PiBrain,
  PiBinoculars,
  PiTreeStructure,
  PiMegaphone,
  PiTarget,
  PiUsersThree,
  PiFileText
} from 'react-icons/pi';
import gsap from 'gsap';
import './Home.css';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const avatar = el.querySelector('.avatar');
    const h1 = el.querySelector('h1');
    const headline = el.querySelector('.headline');
    const intro = el.querySelector('.short-intro');
    const buttons = el.querySelectorAll('.home-buttons a');
    const valueCards = el.querySelectorAll('.value-grid > div');
    const softSkills = el.querySelector('.soft-skills');
    const softItems = el.querySelectorAll('.soft-skills li');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(avatar, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 })
      .fromTo(h1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(headline, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .fromTo(intro, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(buttons, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.2')
      .fromTo(valueCards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7 }, '-=0.2')
      .fromTo(softSkills, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .fromTo(softItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, '-=0.3');

    return () => tl.revert();
  }, []);

  return (
    <section className="home" ref={sectionRef}>
      <img
        src="/images/avatar.png"
        alt="Fernando Royano"
        className="avatar"
      />

      <h1>{t('home.title')}</h1>

      <h2 className="headline">
        {t('home.headline')}<br />
        <span className="sub">{t('home.subheadline')}</span>
      </h2>

      <p className="short-intro">
        {t('home.intro')}
      </p>

      <div className="value-grid">
        <div>
          <h3><PiHandshake className="value-icon" /> {t('home.values.collaborate')}</h3>
          <p>{t('home.values.collaborateText')}</p>
        </div>
        <div>
          <h3><PiLightbulb className="value-icon" /> {t('home.values.product')}</h3>
          <p>{t('home.values.productText')}</p>
        </div>
        <div>
          <h3><PiRobot className="value-icon" /> {t('home.values.ai')}</h3>
          <p>{t('home.values.aiText')}</p>
        </div>
      </div>

      <div className="soft-skills">
        <h3><PiBrain className="value-icon" /> {t('home.softSkills.title')}</h3>
        <ul>
          <li><PiBinoculars className="list-icon" /> {t('home.softSkills.vision')}</li>
          <li><PiTreeStructure className="list-icon" /> {t('home.softSkills.systems')}</li>
          <li><PiMegaphone className="list-icon" /> {t('home.softSkills.communication')}</li>
          <li><PiTarget className="list-icon" /> {t('home.softSkills.focus')}</li>
          <li><PiUsersThree className="list-icon" /> {t('home.softSkills.teamwork')}</li>
        </ul>
      </div>

      <div className="home-buttons">
        <a href="https://github.com/FernandoRoyano" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/fernando-royano-cabrero-dev/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <PiFileText /> {t('home.downloadCV')}
        </a>
      </div>
    </section>
  );
}

export default Home;
