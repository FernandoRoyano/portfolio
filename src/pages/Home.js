import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Home.css';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <section className="home">
      {/* ✅ Avatar ilustrado */}
      <img
        src="/images/avatar.png"
        alt="Fernando Royano"
        className="avatar"
      />

      <h1>{t('home.title')}</h1>

      <h2 className="headline">
        {t('home.headline')}<br />
        <span className="sub">{t('home.subheadline')}</span>
      </h2>

      <p className="short-intro">
        {t('home.intro')}
      </p>

      <div className="value-grid">
        <div>
          <h3>🤝 {t('home.values.collaborate')}</h3>
          <p>{t('home.values.collaborateText')}</p>
        </div>
        <div>
          <h3>🧠 {t('home.values.product')}</h3>
          <p>{t('home.values.productText')}</p>
        </div>
        <div>
          <h3>⚙️ {t('home.values.ai')}</h3>
          <p>{t('home.values.aiText')}</p>
        </div>
      </div>

      <div className="soft-skills">
        <h3>🧠 {t('home.softSkills.title')}</h3>
        <ul>
          <li>🔍 {t('home.softSkills.vision')}</li>
          <li>🧩 {t('home.softSkills.systems')}</li>
          <li>📣 {t('home.softSkills.communication')}</li>
          <li>🎯 {t('home.softSkills.focus')}</li>
          <li>🤝 {t('home.softSkills.teamwork')}</li>
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
          📄 {t('home.downloadCV')}
        </a>
      </div>
    </section>
  );
}

export default Home;
