import type { Certification } from '../../types';

export const cca: Certification = {
  id: 'cca',
  acronym: 'CCA',
  name: 'Cilium Certified Associate',
  description: 'cert.cca.description',
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
      name: 'Architecture',
      weight: 20,
      topics: [
        'Understand the Role of Cilium in Kubernetes Environments',
        'Cilium Architecture',
        'IP Address Management (IPAM) with Cilium',
        'Cilium Component Roles',
        'Datapath Models',
      ],
    },
    {
      name: 'Network Policy',
      weight: 18,
      topics: [
        'Interpret Cilium Network Polices and Intent',
        "Understand Cilium's Identity-based Network Security Model",
        'Policy Enforcement Modes',
        'Policy Rule Structure',
        'Kubernetes Network Policies versus Cilium Network Policies',
      ],
    },
    {
      name: 'Service Mesh',
      weight: 16,
      topics: [
        'Know How to use Ingress or Gateway API for Ingress Routing',
        'Service Mesh Use Cases',
        'Understand the Benefits of Gateway API over Ingress',
        'Encrypting Traffic in Transit with Cilium',
        'Sidecar-based versus Sidecarless Architectures',
      ],
    },
    {
      name: 'Network Observability',
      weight: 10,
      topics: [
        'Understand the Observability Capabilities of Hubble',
        'Enabling Layer 7 Protocol Visibility',
        'Know How to Use Hubble from the Command Line or the Hubble UI',
      ],
    },
    {
      name: 'Installation and Configuration',
      weight: 10,
      topics: [
        'Know How to Use Cilium CLI to Query and Modify the Configuration',
        'Using Cilium CLI to Install Cilium, Run Connectivity Tests, and Monitor its Status',
      ],
    },
    {
      name: 'Cluster Mesh',
      weight: 10,
      topics: [
        'Understand the Benefits of Cluster Mesh for Multi-cluster Connectivity',
        'Achieve Service Discovery and Load Balancing Across Clusters with Cluster Mesh',
      ],
    },
    {
      name: 'eBPF',
      weight: 10,
      topics: [
        'Understand the Role of eBPF in Cilium',
        'eBPF Key Benefits',
        'eBPF-based Platforms versus IPtables-based Platforms',
      ],
    },
    {
      name: 'BGP and External Networking',
      weight: 6,
      topics: [
        'Egress Connectivity Requirements',
        'Understand Options to Connect Cilium-managed Clusters with External Networks',
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/certification/cca/',
    github: [
      'https://github.com/cilium/cilium',
      'https://github.com/isovalent/cilium-certified-associate-cca-course',
    ],
    practice: ['https://isovalent.com/labs/'],
  },
  studyTimeWeeks: 6,
  passingScore: 75,
  validity: 3,
};
