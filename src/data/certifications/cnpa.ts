import type { Certification } from '../types';

export const cnpa: Certification = {
  id: 'cnpa',
  acronym: 'CNPA',
  name: 'Cloud Native Platform Associate',
  description: 'cert.cnpa.description',
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
      name: 'Platform Engineering Core Fundamentals',
      weight: 36,
      topics: [
        'Declarative Resource Management',
        'DevOps Practices in Platform Engineering',
        'Application Environments and Infrastructure Concepts',
        'Platform Architecture and Capabilities',
        'Platform Engineering Goals, Objectives, and Approaches',
        'Continuous Integration Fundamentals',
        'Continuous Delivery and GitOps',
      ],
    },
    {
      name: 'Platform Observability, Security, and Conformance',
      weight: 20,
      topics: [
        'Observability Fundamentals: Traces, Metrics, Logs, and Events',
        'Secure Service Communication',
        'Policy Engines for Platform Governance',
        'Kubernetes Security Essentials',
        'Security in CI/CD Pipelines',
      ],
    },
    {
      name: 'Continuous Delivery & Platform Engineering',
      weight: 16,
      topics: [
        'Continuous Integration Pipelines Overview',
        'Incident Response in Platform Engineering',
        'CI/CD Relationship Fundamentals',
        'GitOps Basics and Workflows',
        'GitOps for Application Environments',
      ],
    },
    {
      name: 'Platform APIs and Provisioning Infrastructure',
      weight: 12,
      topics: [
        'Kubernetes Reconciliation Loop',
        'APIs for Self-Service Platforms (CRDs)',
        'Infrastructure Provisioning with Kubernetes',
        'Kubernetes Operator Pattern for Integration',
      ],
    },
    {
      name: 'IDPs and Developer Experience',
      weight: 8,
      topics: [
        'Simplified Access to Platform Capabilities',
        'API-Driven Service Catalogs',
        'Developer Portals for Platform Adoption',
        'AI/ML in Platform Automation',
      ],
    },
    {
      name: 'Measuring your Platform',
      weight: 8,
      topics: [
        'Platform Efficiency and Team Productivity',
        'DORA Metrics for Platform Initiatives',
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/',
    github: ['https://github.com/cncf/tag-app-delivery'],
    practice: [],
  },
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
