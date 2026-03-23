import React from 'react';
import { PiPaintBrush, PiGearSix, PiRobot } from 'react-icons/pi';
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

  return (
    <section className="skills-section">
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
