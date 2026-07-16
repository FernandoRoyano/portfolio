import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Projects from '../pages/Projects';
import projectsData from '../data/projectsData';

const renderProjects = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <Projects />
    </I18nextProvider>
  );

describe('Projects', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('es');
  });

  it('renderiza una tarjeta por cada proyecto', () => {
    renderProjects();
    for (const { id } of projectsData) {
      expect(screen.getByRole('heading', { name: i18n.t(`projects.items.${id}.name`) })).toBeInTheDocument();
    }
  });

  it('ordena delante los proyectos con captura', () => {
    renderProjects();
    const names = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    const withImage = projectsData.filter((p) => p.image).length;
    const firstBlock = names.slice(0, withImage);

    for (const name of firstBlock) {
      const project = projectsData.find((p) => i18n.t(`projects.items.${p.id}.name`) === name);
      expect(project.image).toBeDefined();
    }
  });

  it('enlaza cada proyecto a su URL en una pestaña nueva y de forma segura', () => {
    renderProjects();
    const amuzim = projectsData.find((p) => p.id === 'amuzim');
    const link = screen.getAllByRole('link', { name: /amuzim/i })[0];

    expect(link).toHaveAttribute('href', amuzim.link);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  // El acordeón no monta/desmonta: el texto vive siempre en el DOM y se revela
  // por CSS. aria-expanded es lo que comunica el estado real.
  it('despliega la descripción larga al pulsar Ver más', async () => {
    renderProjects();
    const toggles = screen.getAllByRole('button', { expanded: false });
    expect(toggles).toHaveLength(projectsData.length);

    await userEvent.click(toggles[0]);
    expect(screen.getAllByRole('button', { expanded: true })).toHaveLength(1);
  });

  it('traduce las tarjetas al cambiar de idioma', async () => {
    renderProjects();
    expect(screen.getByText('Ecosistema musical para creadores y oyentes.')).toBeInTheDocument();

    await act(() => i18n.changeLanguage('en'));
    expect(await screen.findByText('A music ecosystem for creators and listeners.')).toBeInTheDocument();
  });
});
