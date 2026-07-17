import React, { useRef, useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import {
  PiCheckCircle,
  PiWarningCircle,
  PiEnvelopeSimple,
  PiMapPin,
  PiClock,
  PiPaperPlaneTilt
} from 'react-icons/pi';
import gsap from 'gsap';
import './Contact.css';
import { useTranslation } from 'react-i18next';

function Contact() {
  const form = useRef();
  const sectionRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(el.querySelector('.section-title'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo(el.querySelector('.contact-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo(el.querySelector('.contact-info'), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.3')
        .fromTo(el.querySelector('.contact-form-wrapper'), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.6')
        .fromTo(el.querySelectorAll('.field, .contact-form button'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.4');
    });

    return () => mm.revert();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    try {
      const payload = Object.fromEntries(new FormData(form.current));
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(`${response.status} ${body.error || 'unknown'}`);
      }

      setSent(true);
      setError(false);
      form.current.reset();
    } catch (err) {
      console.error('[Contact:sendEmail] fallo al enviar el formulario', err);
      setError(true);
      setSent(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-section" ref={sectionRef}>
      <h1 className="section-title">{t('contact.title')}</h1>
      <p className="contact-subtitle">{t('contact.subtitle')}</p>

      <div className="contact-layout">
        <aside className="contact-info">
          <div className="info-item">
            <div className="info-icon"><PiEnvelopeSimple /></div>
            <div>
              <span className="info-label">{t('contact.emailLabel')}</span>
              <a href="mailto:fernandoroyano.dev@gmail.com" className="info-value">fernandoroyano.dev@gmail.com</a>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><PiMapPin /></div>
            <div>
              <span className="info-label">{t('contact.locationLabel')}</span>
              <span className="info-value">{t('contact.locationValue')}</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><PiClock /></div>
            <div>
              <span className="info-label">{t('contact.responseLabel')}</span>
              <span className="info-value">{t('contact.responseValue')}</span>
            </div>
          </div>

          <div className="contact-links">
            <a href="https://github.com/FernandoRoyano" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/fernando-royano-cabrero-dev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </aside>

        <div className="contact-form-wrapper">
          <form ref={form} className="contact-form" onSubmit={sendEmail}>
            <div className="field">
              <input type="text" name="name" id="name" placeholder=" " autoComplete="name" required />
              <label htmlFor="name">{t('contact.name')}</label>
            </div>
            <div className="field">
              <input type="email" name="email" id="email" placeholder=" " autoComplete="email" required />
              <label htmlFor="email">{t('contact.email')}</label>
            </div>
            <div className="field">
              <textarea name="message" id="message" rows="5" placeholder=" " required></textarea>
              <label htmlFor="message">{t('contact.message')}</label>
            </div>

            {/* Trampa para bots: oculta y fuera del orden de tabulación. Si viene
                rellena, la función descarta el envío. */}
            <input
              type="text"
              name="website"
              className="hp-field"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <button type="submit" disabled={sending}>
              <PiPaperPlaneTilt /> {sending ? t('contact.sending') : t('contact.send')}
            </button>

            {sent && <p className="success-msg" role="status"><PiCheckCircle /> {t('contact.success')}</p>}
            {error && <p className="error-msg" role="alert"><PiWarningCircle /> {t('contact.error')}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
