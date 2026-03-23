import React, { useRef, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { PiCheckCircle, PiWarningCircle } from 'react-icons/pi';
import emailjs from 'emailjs-com';
import './Contact.css';
import { useTranslation } from 'react-i18next';

function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

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
    <section className="contact-section">
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
