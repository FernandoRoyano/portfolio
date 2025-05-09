import React, { useState } from 'react';
import './Projects.css';
import projects from '../data/projectsData';

function Projects() {
  return (
    <section className="projects-section">
      <h2>Proyectos</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}

// Componente individual con transición suave
function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.shortDescription}</p>

      <button onClick={() => setExpanded((prev) => !prev)}>
        {expanded ? 'Ocultar detalles ▲' : 'Ver más ▼'}
      </button>

      <div className={`project-details ${expanded ? 'expanded' : ''}`}>
        {expanded && (
          <>
            <p>{project.fullDescription}</p>
            <p>
              <strong>Tecnologías:</strong> {project.technologies.join(', ')}
            </p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              Ver en GitHub / Demo
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Projects;
