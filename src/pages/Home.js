import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { PiArrowDown, PiArrowRight, PiEnvelopeSimple } from 'react-icons/pi';
import gsap from 'gsap';
import './Home.css';
import { useTranslation } from 'react-i18next';

const featuredProjects = [
  { id: 'amuzim', image: '/projects/amuzim.webp', tone: 'cobalt', index: '01' },
  { id: 'trainhub', image: '/projects/trainhub.webp', tone: 'coral', index: '02' },
  { id: 'wellnessreal', image: '/projects/wellnessreal.webp', tone: 'moss', index: '03' },
  { id: 'antea-salud', image: '/projects/antea-salud.webp', tone: 'sand', index: '04' }
];

function Home() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(el.querySelector('.hero-kicker'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 })
        .fromTo(el.querySelector('.hero-title'), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75 }, '-=0.2')
        .fromTo(el.querySelector('.hero-copy'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
        .fromTo(el.querySelectorAll('.hero-actions a'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.25')
        .fromTo(el.querySelector('.portrait-frame'), { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.9 }, '-=0.7')
        .fromTo(el.querySelector('.portrait-note'), { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.45 }, '-=0.25');
    });
    return () => mm.revert();
  }, []);

  return (
    <div className="portfolio-home" ref={sectionRef}>
      <section className="editorial-hero">
        <div className="hero-content">
          <p className="hero-kicker"><span aria-hidden="true" />{t('home.heroKicker')}</p>
          <h1 className="hero-title">{t('home.heroTitle')}<em>{t('home.heroTitleAccent')}</em></h1>
          <p className="hero-copy">{t('home.heroCopy')}</p>
          <div className="hero-actions">
            <a href="#selected-work" className="action-primary">{t('home.seeWork')} <PiArrowDown /></a>
            <Link to="/contact" className="action-text">{t('home.talk')} <PiArrowRight /></Link>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-frame">
            <img src="/images/fernando-portrait.webp" alt={t('home.portraitAlt')} width="1122" height="1402" fetchPriority="high" />
          </div>
          <p className="portrait-note"><span>{t('home.portraitNote')}</span>{t('home.portraitPlace')}</p>
        </div>
        <a href="#perspective" className="hero-scroll" aria-label={t('home.scrollAria')}><span>{t('home.scroll')}</span><PiArrowDown /></a>
      </section>

      <section className="proof-line" aria-label={t('home.proofAria')}>
        <p>{t('home.proofIntro')}</p>
        <ul><li>{t('home.proof.product')}</li><li>{t('home.proof.design')}</li><li>{t('home.proof.code')}</li><li>{t('home.proof.ai')}</li></ul>
      </section>

      <section className="perspective-section" id="perspective">
        <div className="section-label">{t('home.perspective.label')}</div>
        <div className="perspective-copy">
          <h2>{t('home.perspective.title')}</h2>
          <div><p>{t('home.perspective.copyOne')}</p><p>{t('home.perspective.copyTwo')}</p></div>
        </div>
        <blockquote>{t('home.perspective.quote')}</blockquote>
      </section>

      <section className="work-section" id="selected-work">
        <header className="work-header">
          <div><p className="section-label">{t('home.work.label')}</p><h2>{t('home.work.title')}</h2></div>
          <p>{t('home.work.intro')}</p>
        </header>
        <div className="featured-list">
          {featuredProjects.map((project) => (
            <article className="featured-project" data-tone={project.tone} key={project.id}>
              <a href={t(`home.work.items.${project.id}.link`)} target="_blank" rel="noopener noreferrer" className="project-visual" aria-label={t('projects.openAria', { name: t(`projects.items.${project.id}.name`) })}>
                <span className="project-index">{project.index}</span><img src={project.image} alt="" loading="lazy" />
              </a>
              <div className="project-story">
                <p className="project-type">{t(`home.work.items.${project.id}.type`)}</p>
                <h3>{t(`projects.items.${project.id}.name`)}</h3>
                <p className="project-thesis">{t(`home.work.items.${project.id}.thesis`)}</p>
                <dl>
                  <div><dt>{t('home.work.challenge')}</dt><dd>{t(`home.work.items.${project.id}.challenge`)}</dd></div>
                  <div><dt>{t('home.work.role')}</dt><dd>{t(`home.work.items.${project.id}.role`)}</dd></div>
                </dl>
                <a href={t(`home.work.items.${project.id}.link`)} target="_blank" rel="noopener noreferrer" className="project-link">{t('home.work.visit')} <PiArrowRight /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="all-work-link"><Link to="/projects">{t('home.work.all')} <PiArrowRight /></Link></div>
      </section>

      <section className="working-section">
        <div className="working-title"><p className="section-label">{t('home.working.label')}</p><h2>{t('home.working.title')}</h2></div>
        <div className="working-grid">
          {['understand', 'decide', 'build'].map((item, index) => (
            <div className="working-item" key={item}><span>0{index + 1}</span><h3>{t(`home.working.${item}.title`)}</h3><p>{t(`home.working.${item}.copy`)}</p></div>
          ))}
        </div>
      </section>

      <section className="human-section">
        <p className="section-label">{t('home.human.label')}</p>
        <div className="human-layout">
          <h2>{t('home.human.title')}</h2>
          <div>
            <p>{t('home.human.copyOne')}</p><p>{t('home.human.copyTwo')}</p>
            <div className="human-links">
              <a href="https://www.linkedin.com/in/fernando-royano-cabrero-dev/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
              <a href="https://github.com/FernandoRoyano" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">{t('home.cv')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <p>{t('home.cta.eyebrow')}</p><h2>{t('home.cta.title')}</h2>
        <Link to="/contact">{t('home.cta.action')} <PiEnvelopeSimple /></Link>
      </section>
    </div>
  );
}

export default Home;
