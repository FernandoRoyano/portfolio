import React, { useState, useEffect, useRef } from 'react';
import { PiArrowRight, PiCaretDown, PiCaretUp } from 'react-icons/pi';
import gsap from 'gsap';
import './Projects.css';
import projects from '../data/projectsData';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(el.querySelector('h2'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(el.querySelector('.projects-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(el.querySelectorAll('.project-card'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, '-=0.2');

    return () => tl.revert();
  }, []);

  return (
    <section className="projects-section" ref={sectionRef}>
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
