import React, { useEffect, useRef } from 'react';
import { PiPaintBrush, PiGearSix, PiRobot } from 'react-icons/pi';
import gsap from 'gsap';
import './Skills.css';
import skills from '../data/skillsData';
import { useTranslation } from 'react-i18next';

const categoryIcons = {
  Frontend: <PiPaintBrush />,
  Backend: <PiGearSix />,
  'IA & Herramientas': <PiRobot />
};

function Skills() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(el.querySelector('h2'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(el.querySelector('.skills-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

    el.querySelectorAll('.skill-category').forEach((category) => {
      const header = category.querySelector('.category-header');
      const cards = category.querySelectorAll('.skill-card');

      tl.fromTo(header, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo(cards, { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4 }, '-=0.3');
    });

    return () => tl.revert();
  }, []);

  return (
    <section className="skills-section" ref={sectionRef}>
      <h2>{t('skills.title', 'Stack')}</h2>
      <p className="skills-subtitle">{t('skills.subtitle', 'Tecnologias con las que trabajo dia a dia')}</p>
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="skill-category">
          <div className="category-header">
            <span className="category-icon">{categoryIcons[category]}</span>
            <h3>{category}</h3>
          </div>
          <div className="skills-grid">
            {items.map((skill, index) => (
              <div key={index} className="skill-card">
                <img src={skill.icon} alt={skill.name} />
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
