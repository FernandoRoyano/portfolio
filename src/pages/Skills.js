import React from 'react';
import './Skills.css';
import skills from '../data/skillsData';
import { useTranslation } from 'react-i18next';

const categoryIcons = {
  Frontend: '🎨',
  Backend: '⚙️',
  'IA & Herramientas': '🤖'
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
            <span>{categoryIcons[category]}</span>
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
