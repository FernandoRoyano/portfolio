import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Header from '../components/Header';
import { ThemeProvider } from '../context/ThemeContext';

// Header monta ThemeToggle, que exige el ThemeProvider por encima.
const renderHeader = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    </I18nextProvider>
  );

describe('Header', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('es');
  });

  it('muestra la navegación en español por defecto', () => {
    renderHeader();
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Habilidades' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Proyectos' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeInTheDocument();
  });

  // Regresión: la nav estaba hardcodeada en español y pulsar EN no la cambiaba.
  it('traduce la navegación al pulsar EN', async () => {
    renderHeader();
    await userEvent.click(screen.getByRole('button', { name: 'English' }));

    expect(await screen.findByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Inicio' })).not.toBeInTheDocument();
  });

  it('marca el idioma activo con aria-pressed', async () => {
    renderHeader();
    expect(screen.getByRole('button', { name: 'Español' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('expone el estado del menú móvil a lectores de pantalla', async () => {
    renderHeader();
    const toggle = screen.getByRole('button', { name: 'Abrir menú' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
