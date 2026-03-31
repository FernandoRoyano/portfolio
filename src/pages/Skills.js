import React, { useEffect, useRef } from 'react';
import { PiPaintBrush, PiGearSix, PiRobot } from 'react-icons/pi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';
import skills from '../data/skillsData';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

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
      gsap.from('.skills-section h2', {
        scrollTrigger: { trigger: '.skills-section', start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.skills-subtitle', {
        scrollTrigger: { trigger: '.skills-section', start: 'top 75%' },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });

      const categories = gsap.utils.toArray('.skill-category');
      categories.forEach((category) => {
        gsap.from(category.querySelector('.category-header'), {
          scrollTrigger: { trigger: category, start: 'top 85%' },
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
        });

        gsap.from(category.querySelectorAll('.skill-card'), {
          scrollTrigger: { trigger: category, start: 'top 80%' },
          opacity: 0,
          y: 30,
          scale: 0.95,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power3.out',
        });
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
