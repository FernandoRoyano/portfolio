// El texto visible (name, shortDescription, fullDescription) vive solo en src/i18n/{es,en}.json,
// indexado por el `id` de cada proyecto. Aquí únicamente los datos que no se traducen.
const projects = [
  {
    id: 'crm-health-fitness',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    link: 'https://github.com/FernandoRoyano/HealthyFitness'
  },
  {
    id: 'trainhub',
    technologies: ['Next.js', 'React', 'TypeScript', 'Stripe', 'PWA'],
    link: 'https://train-hub-five.vercel.app',
    image: '/projects/trainhub.png'
  },
  {
    id: 'wellnessreal',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: 'https://wellnessreal.es',
    image: '/projects/wellnessreal.png'
  },
  {
    id: 'amuzim',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Claude API'],
    link: 'https://amuzim-kappa.vercel.app/es',
    image: '/projects/amuzim.png'
  },
  {
    id: 'codeconnect',
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'Nodemailer'],
    link: 'https://codeconnect-ten.vercel.app',
    image: '/projects/codeconnect.png'
  },
  {
    id: 'dr-nutricion',
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS'],
    link: 'https://patologia-digestiva.vercel.app',
    image: '/projects/dr-nutricion.png'
  },
  {
    id: 'antea-salud',
    technologies: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'EmailJS'],
    link: 'https://anteasalud-landing.vercel.app',
    image: '/projects/antea-salud.png'
  },
  {
    id: 'caniches-con-amor',
    technologies: ['Next.js', 'React', 'TypeScript'],
    link: 'https://canichesconamor.com',
    image: '/projects/caniches.png'
  },
  {
    id: 'escapa-cantabria',
    technologies: ['Next.js', 'React', 'TypeScript'],
    link: 'https://autocaravanasescapacantabria.com/',
    image: '/projects/escapa.png'
  }
];

export default projects;
