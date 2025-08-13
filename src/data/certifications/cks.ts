import type { Certification } from '../types';

export const cks: Certification = {
  id: 'cks',
  acronym: 'CKS',
  name: 'Certified Kubernetes Security Specialist',
  description: 'cert.cks.description',
  level: 'advanced',
  type: 'performance',
  duration: 120,
  price: 435, // Increased to $435 USD from January 2025
  prerequisite: 'CKA',
  requiredFor: ['Kubestronaut', 'Golden Kubestronaut'],
  color: 'from-blue-600 to-blue-800',
  // Exam details
  kubernetesVersion: '1.33', // Current exam version
  kubernetesVersionPolicy:
    'Exam environment aligns with most recent K8s minor version within 4-8 weeks of release',
  examAttempts: 2, // Two attempts included with registration
  simulatorProvider: 'Killer.sh',
  simulatorAccess: '2 attempts (36 hours each)',
  passingScore: undefined, // Not publicly disclosed
  examFormat:
    'Online proctored, performance-based test requiring solving multiple command-line tasks',
  retakePolicy: 'One free retake included with registration cost',
  prerequisites: 'CKA',
  domains: [
    {
      name: 'Cluster Setup',
      weight: 15,
      topics: [
        'Use Network security policies to restrict cluster level access',
        'Use CIS benchmark to review the security configuration of Kubernetes components (etcd, kubelet, kubedns, kubeapi)',
        'Properly set up Ingress with TLS',
        'Protect node metadata and endpoints',
        'Verify platform binaries before deploying',
      ],
    },
    {
      name: 'Cluster Hardening',
      weight: 15,
      topics: [
        'Use Role Based Access Controls to minimize exposure',
        'Exercise caution in using service accounts e.g. disable defaults, minimize permissions on newly created ones',
        'Restrict access to Kubernetes API',
        'Upgrade Kubernetes to avoid vulnerabilities',
      ],
    },
    {
      name: 'System Hardening',
      weight: 10,
      topics: [
        'Minimize host OS footprint (reduce attack surface)',
        'Using least-privilege identity and access management',
        'Minimize external access to the network',
        'Appropriately use kernel hardening tools such as AppArmor, seccomp',
      ],
    },
    {
      name: 'Minimize Microservice Vulnerabilities',
      weight: 20,
      topics: [
        'Use appropriate pod security standards',
        'Manage Kubernetes secrets',
        'Understand and implement isolation techniques (multi-tenancy, sandboxed containers, etc.)',
        'Implement Pod-to-Pod encryption (Cilium, Istio)',
      ],
    },
    {
      name: 'Supply Chain Security',
      weight: 20,
      topics: [
        'Minimize base image footprint',
        'Understand your supply chain (e.g. SBOM, CI/CD, artifact repositories)',
        'Secure your supply chain (permitted registries, sign and validate artifacts, etc.)',
        'Perform static analysis of user workloads and container images (e.g. Kubesec, KubeLinter)',
      ],
    },
    {
      name: 'Monitoring, Logging and Runtime Security',
      weight: 20,
      topics: [
        'Perform behavioral analytics to detect malicious activities',
        'Detect threats within physical infrastructure, apps, networks, data, users and workloads',
        'Investigate and identify phases of attack and bad actors within the environment',
        'Ensure immutability of containers at runtime',
        'Use Kubernetes audit logs to monitor access',
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/certification/cks/',
    github: [
      'https://github.com/walidshaari/Certified-Kubernetes-Security-Specialist',
      'https://github.com/kodekloudhub/certified-kubernetes-security-specialist-cks-course',
      'https://github.com/moabukar/CKS-Exercises-Certified-Kubernetes-Security-Specialist',
      'https://github.com/bmuschko/cks-crash-course',
      'https://github.com/techiescamp/cks-certification-guide',
      'https://github.com/snigdhasambitak/cks',
    ],
    practice: [
      'https://killer.sh', // Official simulator (included with exam)
      'https://kodekloud.com/courses/certified-kubernetes-security-specialist-cks/',
      'https://killercoda.com/killer-shell-cks',
      'https://skillcertpro.com/product/certified-kubernetes-security-specialist-cks-exam-questions/',
    ],
  },
};
