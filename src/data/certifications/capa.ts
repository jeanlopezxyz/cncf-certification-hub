import type { Certification } from '../../types';

export const capa: Certification = {
  id: 'capa',
  acronym: 'CAPA',
  name: 'Certified Argo Project Associate',
  description: 'cert.capa.description',
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
      name: 'Argo Workflows',
      weight: 36,
      topics: [
        'Understand Argo Workflow Fundamentals',
        'Generating and Consuming Artifacts',
        'Understand Argo Workflow Templates',
        'Understand the Argo Workflow Spec',
        'Work with DAG (Directed-Acyclic Graphs)',
        'Run Data Processing Jobs with Argo Workflows',
      ],
    },
    {
      name: 'Argo CD',
      weight: 34,
      topics: [
        'Understand Argo CD Fundamentals',
        'Synchronize Applications Using Argo CD',
        'Use Argo CD Application',
        'Configure Argo CD with Helm and Kustomize',
        'Identify Common Reconciliation Patterns',
      ],
    },
    {
      name: 'Argo Rollouts',
      weight: 18,
      topics: [
        'Understand Argo Rollouts Fundamentals',
        'Use Common Progressive Rollout Strategies',
        'Describe Analysis Template and AnalysisRun',
      ],
    },
    {
      name: 'Argo Events',
      weight: 12,
      topics: [
        'Understand Argo Events Fundamentals',
        'Understand Argo Event Components and Architecture',
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/certification/capa/',
    github: [
      'https://github.com/argoproj',
      'https://github.com/argoproj/argo-cd',
      'https://github.com/argoproj/argo-workflows',
    ],
    practice: ['https://killercoda.com/argoproj/courses'],
  },
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
