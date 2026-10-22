import React, { useEffect, useRef } from 'react';
import { PiPaintBrush, PiGearSix, PiRobot } from 'react-icons/pi';
import gsap from 'gsap';
import './Skills.css';
import skills from '../data/skillsData';
import { useTranslation } from 'react-i18next';

const categoryIcons = {
  frontend: <PiPaintBrush />,
  backend: <PiGearSix />,
  'ai-tools': <PiRobot />
};

function Skills() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(el.querySelector('.section-title'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(el.querySelector('.skills-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

      el.querySelectorAll('.skill-category').forEach((category) => {
        const header = category.querySelector('.category-header');
        const cards = category.querySelectorAll('.skill-card');

        tl.fromTo(header, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
          .fromTo(cards, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4 }, '-=0.3');
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>
      <p className="section-label">{t('skills.eyebrow')}</p>
      <h1 className="section-title">{t('skills.title')}</h1>
      <p className="skills-subtitle">{t('skills.subtitle')}</p>
      {skills.map(({ id, items }) => (
        <div key={id} className="skill-category">
          <div className="category-header">
            <span className="category-icon" aria-hidden="true">{categoryIcons[id]}</span>
            <h2 className="category-title">{t(`skills.categories.${id}`)}</h2>
            <p className="category-context">{t(`skills.context.${id}`)}</p>
          </div>
          <div className="skills-grid">
            {items.map((skill) => (
              <div key={skill.name} className="skill-card">
                {skill.icon ? <img src={skill.icon} alt="" width="32" height="32" loading="lazy" /> : <span className="skill-monogram" aria-hidden="true">{skill.name.slice(0, 2)}</span>}
                <p>{skill.name}{skill.occasional && <small className="skill-usage">{t('skills.occasional')}</small>}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <section className="education-panel" aria-labelledby="education-title">
        <div><p className="section-label">{t('skills.education.label')}</p><h2 id="education-title">{t('skills.education.title')}</h2><p>thePower · 2023–2025</p><a className="education-cv" href="/cv.pdf" target="_blank" rel="noopener noreferrer">{t('home.downloadCV')} ↗</a></div>
        <div><p>{t('skills.education.intro')}</p><ul>{t('skills.education.modules', { returnObjects: true }).map(module => <li key={module}>{module}</li>)}</ul><p className="education-source">{t('skills.education.note')} <a href="https://www.boe.es/eli/es/rd/2023/05/29/405" target="_blank" rel="noopener noreferrer">{t('skills.education.source')} ↗</a></p></div>
      </section>
      <section className="education-additional" aria-labelledby="education-additional-title">
        <h2 id="education-additional-title">{t('skills.education.additionalTitle')}</h2>
        <ul className="education-history">
          {t('skills.education.additional', { returnObjects: true }).map(({ title, detail }) => (
            <li key={title}><h3>{title}</h3><p>{detail}</p></li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default Skills;
