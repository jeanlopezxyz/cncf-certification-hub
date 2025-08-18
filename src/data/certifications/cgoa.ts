import type { Certification } from '../../types';

export const cgoa: Certification = {
  id: 'cgoa',
  acronym: 'CGOA',
  name: 'Certified GitOps Associate',
  description: 'cert.cgoa.description',
  level: 'entry',
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
      name: 'GitOps Terminology',
      weight: 20,
      topics: [
        'Continuous',
        'Declarative Description',
        'Desired State',
        'State Drift',
        'State Reconciliation',
        'GitOps Managed Software System',
        'State Store',
        'Feedback Loop',
        'Rollback',
      ],
    },
    {
      name: 'GitOps Principles',
      weight: 30,
      topics: [
        'Declarative',
        'Versioned and Immutable',
        'Pulled Automatically',
        'Continuously Reconciled',
      ],
    },
    {
      name: 'Related Practices',
      weight: 16,
      topics: [
        'Configuration as Code (CaC)',
        'Infrastructure as Code (IaC)',
        'DevOps and DevSecOps',
        'CI and CD',
      ],
    },
    {
      name: 'GitOps Patterns',
      weight: 20,
      topics: [
        'Deployment and Release Patterns',
        'Progressive Delivery Patterns',
        'Pull vs. Event-driven',
        'Architecture Patterns (in-cluster and external reconciler, state store management, etc.)',
      ],
    },
    {
      name: 'Tooling',
      weight: 14,
      topics: [
        'Manifest Format and Packaging',
        'State Store Systems (Git and alternatives)',
        'Reconciliation Engines (ArgoCD, Flux, and alternatives)',
        'Interoperability with Notifications, Observability, and Continuous Integration Tools',
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/certification/cgoa/',
    github: [
      'https://github.com/open-gitops/documents',
      'https://github.com/gitops-working-group/gitops-working-group',
    ],
    practice: ['https://opengitops.dev/'],
  },
  studyTimeWeeks: 4,
  passingScore: 75,
  validity: 3,
};
