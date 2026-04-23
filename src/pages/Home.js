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
  PiFileText,
  PiArrowRight
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

    const badge = el.querySelector('.status-badge');
    const avatar = el.querySelector('.avatar-wrapper');
    const h1 = el.querySelector('.home-greeting');
    const headline = el.querySelector('.headline');
    const intro = el.querySelector('.short-intro');
    const buttons = el.querySelectorAll('.home-buttons a');
    const valueCards = el.querySelectorAll('.value-card');
    const softSkills = el.querySelector('.soft-skills');
    const softItems = el.querySelectorAll('.soft-skills li');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(badge, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo(avatar, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.2')
      .fromTo(h1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(headline, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo(intro, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(buttons, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, '-=0.2')
      .fromTo(valueCards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, '-=0.2')
      .fromTo(softSkills, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
      .fromTo(softItems, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.08, duration: 0.4 }, '-=0.4');

    return () => tl.revert();
  }, []);

  return (
    <section className="home" ref={sectionRef}>
      <div className="hero">
        <div className="status-badge">
          <span className="status-dot" aria-hidden="true"></span>
          <span>{t('home.available', 'Disponible para nuevos proyectos')}</span>
        </div>

        <div className="avatar-wrapper">
          <div className="avatar-glow" aria-hidden="true"></div>
          <img
            src="/images/avatar.png"
            alt="Fernando Royano"
            className="avatar"
          />
        </div>

        <p className="home-greeting">{t('home.title')}</p>

        <h1 className="headline">
          <span className="gradient-text">{t('home.headline')}</span>
          <span className="sub">{t('home.subheadline')}</span>
        </h1>

        <p className="short-intro">{t('home.intro')}</p>

        <div className="home-buttons">
          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" download className="btn btn-primary">
            <PiFileText /> {t('home.downloadCV')} <PiArrowRight className="btn-arrow" />
          </a>
          <a href="https://github.com/FernandoRoyano" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FaGithub /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/fernando-royano-cabrero-dev/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>

      <div className="value-grid">
        <div className="value-card" data-accent="violet">
          <div className="value-icon-wrapper"><PiHandshake /></div>
          <h3>{t('home.values.collaborate')}</h3>
          <p>{t('home.values.collaborateText')}</p>
        </div>
        <div className="value-card" data-accent="cyan">
          <div className="value-icon-wrapper"><PiLightbulb /></div>
          <h3>{t('home.values.product')}</h3>
          <p>{t('home.values.productText')}</p>
        </div>
        <div className="value-card" data-accent="pink">
          <div className="value-icon-wrapper"><PiRobot /></div>
          <h3>{t('home.values.ai')}</h3>
          <p>{t('home.values.aiText')}</p>
        </div>
      </div>

      <div className="soft-skills">
        <h3><PiBrain className="soft-skills-icon" /> {t('home.softSkills.title')}</h3>
        <ul>
          <li><PiBinoculars className="list-icon" /> {t('home.softSkills.vision')}</li>
          <li><PiTreeStructure className="list-icon" /> {t('home.softSkills.systems')}</li>
          <li><PiMegaphone className="list-icon" /> {t('home.softSkills.communication')}</li>
          <li><PiTarget className="list-icon" /> {t('home.softSkills.focus')}</li>
          <li><PiUsersThree className="list-icon" /> {t('home.softSkills.teamwork')}</li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
