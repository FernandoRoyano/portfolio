// Las etiquetas de categoría viven en src/i18n/{es,en}.json bajo skills.categories,
// indexadas por el `id`. Aquí únicamente los datos que no se traducen.
const skills = [
  {
    id: 'frontend',
    items: [
      { name: 'HTML5', icon: '/skills-icons/html5.svg' },
      { name: 'CSS3', icon: '/skills-icons/css3.svg' },
      { name: 'JavaScript', icon: '/skills-icons/javascript.svg' },
      { name: 'TypeScript', icon: '/skills-icons/typescript.svg' },
      { name: 'React', icon: '/skills-icons/react.svg' },
      { name: 'Next.js', icon: '/skills-icons/nextjs.svg' }
    ]
  },
  {
    id: 'backend',
    items: [
      { name: 'Node.js', icon: '/skills-icons/nodejs.svg' },
      { name: 'Python', icon: '/skills-icons/python.svg' },
      { name: 'Express.js', icon: '/skills-icons/express.svg' },
      { name: 'MongoDB', icon: '/skills-icons/mongodb.svg' },
      { name: 'PostgreSQL', icon: '/skills-icons/postgresql.svg' },
      { name: 'Supabase', icon: '/skills-icons/supabase.svg' }
    ]
  },
  {
    id: 'ai-tools',
    items: [
      { name: 'Claude Code', icon: '/skills-icons/claude.svg' },
      { name: 'OpenAI API', icon: '/skills-icons/openai.svg' },
      { name: 'Git', icon: '/skills-icons/git.svg' },
      { name: 'GitHub', icon: '/skills-icons/github.svg' },
      { name: 'Figma', icon: '/skills-icons/figma.svg' },
      { name: 'WordPress', icon: '/skills-icons/wordpress.svg' }
    ]
  }
];

export default skills;
