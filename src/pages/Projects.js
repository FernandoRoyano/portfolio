import React, { useState } from 'react';
import { PiArrowRight, PiCaretDown, PiCaretUp } from 'react-icons/pi';
import './Projects.css';
import projects from '../data/projectsData';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();

  return (
    <section className="projects-section">
      <h2>{t('projects.title')}</h2>
      <p className="projects-subtitle">{t('projects.subtitle', 'Proyectos reales para clientes y startups')}</p>
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
      <div className="project-card-header">
        <h3>{t(`projects.items.${index}.name`)}</h3>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
            Ver <PiArrowRight />
          </a>
        )}
      </div>
      <p>{t(`projects.items.${index}.shortDescription`)}</p>
      <div className="tech-tags">
        {project.technologies.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </div>
      <button className="expand-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? <><PiCaretUp /> {t('projects.hide')}</> : <><PiCaretDown /> {t('projects.show')}</>}
      </button>
      <div className={`project-details ${expanded ? 'expanded' : ''}`}>
        <p>{t(`projects.items.${index}.fullDescription`)}</p>
      </div>
    </div>
  );
}

export default Projects;
