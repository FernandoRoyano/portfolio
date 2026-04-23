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
import emailjs from 'emailjs-com';
import gsap from 'gsap';
import './Contact.css';
import { useTranslation } from 'react-i18next';

function Contact() {
  const form = useRef();
  const sectionRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(el.querySelector('h2'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(el.querySelector('.contact-subtitle'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(el.querySelector('.contact-info'), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.3')
      .fromTo(el.querySelector('.contact-form-wrapper'), { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7 }, '-=0.6')
      .fromTo(el.querySelectorAll('.field, .contact-form button'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.4 }, '-=0.4');

    return () => tl.revert();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_zsg0e8k',
      'template_acck388',
      form.current,
      'YqaBS775_UBQweZfz'
    )
    .then(() => {
      setSent(true);
      setError(false);
      form.current.reset();
    })
    .catch(() => {
      setError(true);
      setSent(false);
    });
  };

  return (
    <section className="contact-section" ref={sectionRef}>
      <h2>{t('contact.title', 'Contacto')}</h2>
      <p className="contact-subtitle">{t('contact.subtitle', 'Hablemos sobre tu proyecto')}</p>

      <div className="contact-layout">
        <aside className="contact-info">
          <div className="info-item">
            <div className="info-icon"><PiEnvelopeSimple /></div>
            <div>
              <span className="info-label">Email</span>
              <a href="mailto:fernandoroyano@gmail.com" className="info-value">fernandoroyano@gmail.com</a>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><PiMapPin /></div>
            <div>
              <span className="info-label">Ubicación</span>
              <span className="info-value">España · Remoto</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon"><PiClock /></div>
            <div>
              <span className="info-label">Respuesta</span>
              <span className="info-value">Normalmente en 24h</span>
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
              <input type="text" name="user_name" id="user_name" placeholder=" " required />
              <label htmlFor="user_name">{t('contact.name', 'Tu nombre')}</label>
            </div>
            <div className="field">
              <input type="email" name="user_email" id="user_email" placeholder=" " required />
              <label htmlFor="user_email">{t('contact.email', 'Tu email')}</label>
            </div>
            <div className="field">
              <textarea name="message" id="message" rows="5" placeholder=" " required></textarea>
              <label htmlFor="message">{t('contact.message', 'Cuéntame tu idea...')}</label>
            </div>

            <button type="submit">
              <PiPaperPlaneTilt /> {t('contact.send', 'Enviar mensaje')}
            </button>

            {sent && <p className="success-msg"><PiCheckCircle /> {t('contact.success', 'Mensaje enviado correctamente')}</p>}
            {error && <p className="error-msg"><PiWarningCircle /> {t('contact.error', 'Error al enviar. Inténtalo más tarde.')}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
