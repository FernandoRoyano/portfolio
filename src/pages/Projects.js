import React, { useState, useEffect, useRef } from 'react';
import { PiArrowRight, PiCaretDown, PiCaretUp } from 'react-icons/pi';
import gsap from 'gsap';
import './Projects.css';
import projects from '../data/projectsData';
import { useTranslation } from 'react-i18next';

function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const sortedProjects = [...projects].sort((a, b) => {
    const aHas = !!a.image;
    const bHas = !!b.image;
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;
    return 0;
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Las animaciones solo se construyen si no hay preferencia por reducir
    // movimiento. Pausar el timeline no valdría: GSAP aplicaría el estado
    // inicial (opacity 0) y la página quedaría en blanco.
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(el.querySelector('.section-title'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(el.querySelector('.projects-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo(el.querySelectorAll('.project-card'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 }, '-=0.2');
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="projects-section" ref={sectionRef}>
      <h1 className="section-title">{t('projects.title')}</h1>
      <p className="projects-subtitle">{t('projects.subtitle')}</p>
      <div className="projects-grid">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const name = t(`projects.items.${project.id}.name`);

  return (
    <div className={`project-card ${project.image ? 'has-image' : ''}`}>
      {project.image && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-thumb"
          aria-label={t('projects.openAria', { name })}
        >
          <img src={project.image} alt={name} loading="lazy" />
        </a>
      )}
      <div className="project-card-body">
        <div className="project-card-header">
          <h2 className="project-title">{name}</h2>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card-link">
              {t('projects.view')} <PiArrowRight />
            </a>
          )}
        </div>
        <p>{t(`projects.items.${project.id}.shortDescription`)}</p>
        <div className="tech-tags">
          {project.technologies.map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
        </div>
        <button
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`details-${project.id}`}
        >
          {expanded ? <><PiCaretUp /> {t('projects.hide')}</> : <><PiCaretDown /> {t('projects.show')}</>}
        </button>
        <div id={`details-${project.id}`} className={`project-details ${expanded ? 'expanded' : ''}`}>
          <p>{t(`projects.items.${project.id}.fullDescription`)}</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;
