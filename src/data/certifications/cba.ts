import type { Certification } from '../../types';

export const cba: Certification = {
  id: 'cba',
  acronym: 'CBA',
  name: 'Certified Backstage Associate',
  description: 'cert.cba.description',
  level: 'intermediate',
  type: 'multiple-choice',
  duration: 90,
  price: 250,
  requiredFor: ['Golden Kubestronaut'],
  color: 'from-blue-700 to-indigo-800',
  kubernetesVersion: 'Not applicable',
  examAttempts: 2,
  simulatorProvider: 'No simulator - Multiple choice exam',
  simulatorAccess: 'Not applicable - No hands-on simulator provided',
  examFormat: 'Online proctored, multiple-choice test with 60 questions',
  retakePolicy: 'One free retake included with registration cost',
  prerequisites: 'No prerequisites',
  domains: [
    {
      name: 'Customizing Backstage',
      weight: 32,
      topics: [
        'Understand frontend versus backend plugins',
        'Customizing Backstage plugins',
        'Make changes to React code in Backstage App',
        'Using Material UI components',
      ],
    },
    {
      name: 'Backstage Development Workflow',
      weight: 24,
      topics: [
        'Build and run Backstage projects locally',
        'Understand local development workflows',
        'Compile a Backstage project with TypeScript',
        'Download and install dependencies for a Backstage project with NPM/Yarn',
        'Use Docker to build a container image of a Backstage project',
      ],
    },
    {
      name: 'Backstage Infrastructure',
      weight: 22,
      topics: [
        'Understand the Backstage framework',
        'Configure Backstage',
        'Deploy Backstage to production',
        'Understand Backstage client-server architecture',
      ],
    },
    {
      name: 'Backstage Catalog',
      weight: 22,
      topics: [
        'Understand how/why to use Backstage Catalog',
        'Populate Backstage Catalog',
        'Using annotations',
        'Working with manually registered entity locations',
        'Troubleshooting entity ingestion',
        'Working with automated ingestion',
      ],
    },
  ],
  resources: {
    official: 'https://backstage.io/',
    github: ['https://github.com/backstage/backstage'],
    practice: [],
  },
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
