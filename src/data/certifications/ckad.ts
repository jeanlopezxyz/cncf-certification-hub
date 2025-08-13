import type { Certification } from '../types';

export const ckad: Certification = {
  id: 'ckad',
  acronym: 'CKAD',
  name: 'Certified Kubernetes Application Developer',
  description: 'cert.ckad.description',
  level: 'intermediate',
  type: 'performance',
  duration: 120,
  price: 445,
  requiredFor: ['Kubestronaut', 'Golden Kubestronaut'],
  color: 'from-blue-600 to-blue-800',
  kubernetesVersion: '1.33',
  examAttempts: 2,
  simulatorProvider: 'Killer.sh',
  simulatorAccess: '2 attempts (36 hours each)',
  examFormat:
    'Online proctored, performance-based test requiring solving multiple command-line tasks',
  retakePolicy:
    'CKAD exam fees cover two attempts. If additional attempts are needed, candidates must repurchase the exam.',
  prerequisites: 'No prerequisites',
  domains: [
    {
      name: 'Application Design and Build',
      weight: 20,
      topics: [
        'Define, build and modify container images',
        'Choose and use the right workload resource (Deployment, DaemonSet, CronJob, etc.)',
        'Understand multi-container Pod design patterns (e.g. sidecar, init and others)',
        'Utilize persistent and ephemeral volumes',
      ],
    },
    {
      name: 'Application Deployment',
      weight: 20,
      topics: [
        'Use Kubernetes primitives to implement common deployment strategies (e.g. blue/green or canary)',
        'Understand Deployments and how to perform rolling updates',
        'Use the Helm package manager to deploy existing packages',
        'Kustomize',
      ],
    },
    {
      name: 'Application Observability and Maintenance',
      weight: 15,
      topics: [
        'Understand API deprecations',
        'Implement probes and health checks',
        'Use built-in CLI tools to monitor Kubernetes applications',
        'Utilize container logs',
        'Debugging in Kubernetes',
      ],
    },
    {
      name: 'Application Environment, Configuration and Security',
      weight: 25,
      topics: [
        'Discover and use resources that extend Kubernetes (CRD, Operators)',
        'Understand authentication, authorization and admission control',
        'Understand requests, limits, quotas',
        'Understand ConfigMaps',
        'Define resource requirements',
        'Create & consume Secrets',
        'Understand ServiceAccounts',
        'Understand Application Security (SecurityContexts, Capabilities, etc.)',
      ],
    },
    {
      name: 'Services and Networking',
      weight: 20,
      topics: [
        'Demonstrate basic understanding of NetworkPolicies',
        'Provide and troubleshoot access to applications via services',
        'Use Ingress rules to expose applications',
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/certification/ckad/',
    github: [
      'https://github.com/dgkanatsios/CKAD-exercises',
      'https://github.com/kodekloudhub/certified-kubernetes-application-developer-course',
      'https://github.com/bmuschko/ckad-prep',
    ],
    practice: [
      'https://killer.sh',
      'https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad/',
      'https://killercoda.com/killer-shell-ckad',
    ],
  },
};
