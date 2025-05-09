import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_zsg0e8k',          // ✅ Service ID
      'template_acck388',         // ✅ Template ID
      form.current,
      'YqaBS775_UBQweZfz'         // ✅ Public Key (user ID)
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
      <h2>Contacto</h2>
      <p>¿Quieres hablar conmigo? Rellena el formulario o encuéntrame en redes:</p>

      <form ref={form} className="contact-form" onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder="Tu nombre" required />
        <input type="email" name="user_email" placeholder="Tu email" required />
        <textarea name="message" placeholder="Tu mensaje..." rows="5" required></textarea>
        <button type="submit">Enviar</button>

        {/* ✅ Mensajes de feedback */}
        {sent && <p className="success-msg">✅ ¡Mensaje enviado correctamente!</p>}
        {error && <p className="error-msg">❌ Error al enviar. Inténtalo más tarde.</p>}
      </form>

      <div className="contact-links">
        <a href="https://github.com/FernandoRoyano" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/fernando-royano-cabrero-dev/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

export default Contact;
