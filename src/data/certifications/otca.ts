import type { Certification } from '../types';

export const otca: Certification = {
  id: 'otca',
  acronym: 'OTCA',
  name: 'OpenTelemetry Certified Associate',
  description: 'cert.otca.description',
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
      name: 'The OpenTelemetry API and SDK',
      weight: 46,
      topics: [
        'Data Model',
        'Composability and Extension',
        'Configuration',
        'Signals (Tracing, Metric, Log)',
        'SDK Pipelines',
        'Context Propagation',
        'Agents',
      ],
    },
    {
      name: 'The OpenTelemetry Collector',
      weight: 26,
      topics: ['Configuration', 'Deployment', 'Scaling', 'Pipelines', 'Transforming Data'],
    },
    {
      name: 'Fundamentals of Observability',
      weight: 18,
      topics: [
        'Telemetry Data',
        'Semantic Conventions',
        'Instrumentation',
        'Analysis and Outcomes',
      ],
    },
    {
      name: 'Maintaining and Debugging Observability Pipelines',
      weight: 10,
      topics: ['Context Propagation', 'Debugging Pipelines', 'Error Handling', 'Schema Management'],
    },
  ],
  resources: {
    official: 'https://opentelemetry.io/',
    github: ['https://github.com/open-telemetry'],
    practice: [],
  },
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
