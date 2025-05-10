import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Home.css';

function Home() {
  return (
    <section className="home">
      {/* ✅ Avatar ilustrado */}
      <img
        src="/images/avatar.png"
        alt="Fernando Royano"
        className="avatar"
      />

      <h1>Hola, soy Fernando</h1>

      <h2 className="headline">
        Product Builder & Front-End Developer<br />
        <span className="sub">Llevo ideas digitales desde el concepto hasta el lanzamiento.</span>
      </h2>

      <p className="short-intro">
        Combino diseño, desarrollo y visión de negocio para dar forma a proyectos web con impacto real.
      </p>

      <div className="value-grid">
        <div>
          <h3>🤝 Colaboro</h3>
          <p>Me gusta trabajar con personas que tienen una idea y ayudarles a hacerla realidad.</p>
        </div>
        <div>
          <h3>🧠 Pienso en producto</h3>
          <p>No solo programo. Me involucro en la experiencia, el valor y el enfoque estratégico.</p>
        </div>
        <div>
          <h3>⚙️ Construyo con IA</h3>
          <p>Uso herramientas modernas e inteligencia artificial para acelerar y mejorar el desarrollo.</p>
        </div>
      </div>

      <div className="soft-skills">
  <h3>🧠 Habilidades blandas que marcan la diferencia</h3>
  <ul>
    <li>🔍 Visión estratégica de negocio y producto</li>
    <li>🧩 Diseño de sistemas, procesos y flujos digitales</li>
    <li>📣 Comunicación clara y capacidad de venta</li>
    <li>🎯 Enfoque en conversión, captación y escalabilidad</li>
    <li>🤝 Trabajo colaborativo con perfiles técnicos y no técnicos</li>
  </ul>
</div>


      <div className="home-buttons">
        <a href="https://github.com/FernandoRoyano" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/fernando-royano-cabrero-dev/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          📄 Ver / Descargar CV
        </a>
      </div>
    </section>
  );
}

export default Home;
