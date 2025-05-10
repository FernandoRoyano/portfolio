import React, { useState } from 'react';
import './Projects.css';
import projects from '../data/projectsData';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();

  return (
    <section className="projects-section">
      <h2>{t('projects.title')}</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="project-card">
      <h3>{t(`projects.items.${index}.name`)}</h3>
      <p>{t(`projects.items.${index}.shortDescription`)}</p>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? t('projects.hide') : t('projects.show')}
      </button>
      <div className={`project-details ${expanded ? 'expanded' : ''}`}>
        <p>{t(`projects.items.${index}.fullDescription`)}</p>
        <p>
          <strong>{t('projects.tech')}:</strong> {project.technologies.join(', ')}
        </p>
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          {t('projects.link')}
        </a>
      </div>
    </div>
  );
}

export default Projects;
