import React, { useRef, useState, useEffect } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { PiCheckCircle, PiWarningCircle } from 'react-icons/pi';
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
      .fromTo(el.querySelectorAll('.contact-section > p'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo(el.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form button'), { opacity: 0, y: 25 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.2')
      .fromTo(el.querySelectorAll('.contact-links a'), { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.2');

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
      <p>{t('contact.subtitle', 'Hablemos sobre tu proyecto')}</p>

      <form ref={form} className="contact-form" onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder={t('contact.name', 'Tu nombre')} required />
        <input type="email" name="user_email" placeholder={t('contact.email', 'Tu email')} required />
        <textarea name="message" placeholder={t('contact.message', 'Cuéntame tu idea...')} rows="5" required></textarea>
        <button type="submit">{t('contact.send', 'Enviar mensaje')}</button>

        {sent && <p className="success-msg"><PiCheckCircle /> {t('contact.success', 'Mensaje enviado correctamente')}</p>}
        {error && <p className="error-msg"><PiWarningCircle /> {t('contact.error', 'Error al enviar. Inténtalo más tarde.')}</p>}
      </form>

      <div className="contact-links">
        <a href="https://github.com/FernandoRoyano" target="_blank" rel="noopener noreferrer">
          <FaGithub /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/fernando-royano-cabrero-dev/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin /> LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Contact;
