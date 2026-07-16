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
      <h1 className="section-title">{t('skills.title')}</h1>
      <p className="skills-subtitle">{t('skills.subtitle')}</p>
      {skills.map(({ id, items }) => (
        <div key={id} className="skill-category">
          <div className="category-header">
            <span className="category-icon" aria-hidden="true">{categoryIcons[id]}</span>
            <h2 className="category-title">{t(`skills.categories.${id}`)}</h2>
          </div>
          <div className="skills-grid">
            {items.map((skill) => (
              <div key={skill.name} className="skill-card">
                <img src={skill.icon} alt={skill.name} width="48" height="48" loading="lazy" />
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Skills;
