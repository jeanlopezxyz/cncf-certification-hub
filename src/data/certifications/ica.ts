import type { Certification } from '../types';

export const ica: Certification = {
  id: 'ica',
  acronym: 'ICA',
  name: 'Istio Certified Associate',
  description: 'cert.ica.description',
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
      name: 'Istio Installation, Upgrade & Configuration',
      weight: 7,
      topics: [
        'Using the Istio CLI to install a basic cluster',
        'Customizing the Istio installation with the IstioOperator API',
        'Using overlays to manage Istio component settings',
      ],
    },
    {
      name: 'Traffic Management',
      weight: 40,
      topics: [
        'Controlling network traffic flows within a service mesh',
        'Configuring sidecar injection',
        'Using the Gateway resource to configure ingress and egress traffic',
        'Understanding how to use ServiceEntry resources for adding entries to internal service registry',
        'Define traffic policies using DestinationRule',
        'Configure traffic mirroring capabilities',
      ],
    },
    {
      name: 'Resilience and Fault Injection',
      weight: 20,
      topics: [
        'Configuring circuit breakers (with or without outlier detection)',
        'Using resilience features',
        'Creating fault injection',
      ],
    },
    {
      name: 'Securing Workloads',
      weight: 20,
      topics: [
        'Understand Istio security features',
        'Set up Istio authorization for HTTP/TCP traffic in the mesh',
        'Configure mutual TLS at mesh, namespace, and workload levels',
      ],
    },
    {
      name: 'Advanced Scenarios',
      weight: 13,
      topics: [
        'Understand how to onboard non-Kubernetes workloads to the mesh',
        'Troubleshoot configuration issues',
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/certification/ica/',
    github: [
      'https://github.com/istio/istio',
      'https://github.com/mstrYoda/istio-certified-associate-ica-exam',
    ],
    practice: ['https://kodekloud.com/courses/istio-service-mesh/'],
  },
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
