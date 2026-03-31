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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('h2', { opacity: 0, y: 30, duration: 0.7 })
        .from('.skills-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3');

      const categories = gsap.utils.toArray('.skill-category');
      categories.forEach((category) => {
        tl.from(category.querySelector('.category-header'), {
          opacity: 0, y: 20, duration: 0.5,
        }, `-=0.2`)
        .from(category.querySelectorAll('.skill-card'), {
          opacity: 0, y: 30, scale: 0.95, stagger: 0.05, duration: 0.4,
        }, '-=0.3');
      });
    }, sectionRef);

    return () => ctx.revert();
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
