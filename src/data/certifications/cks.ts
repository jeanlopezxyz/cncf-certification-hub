import type { Certification } from '../../types';

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
  // kubernetesVersionPolicy: 'Exam environment aligns with most recent K8s minor version within 4-8 weeks of release',
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
        { name: 'Use Network security policies to restrict cluster level access', url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/' },
        { name: 'Use CIS benchmark to review the security configuration of Kubernetes components (etcd, kubelet, kubedns, kubeapi)', url: 'https://www.cisecurity.org/benchmark/kubernetes' },
        { name: 'Properly set up Ingress with TLS', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/#tls' },
        { name: 'Protect node metadata and endpoints', url: 'https://cloud.google.com/kubernetes-engine/docs/how-to/protecting-node-metadata' },
        { name: 'Verify platform binaries before deploying', url: 'https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/#verify-kubectl-binary-using-checksum' },
      ],
    },
    {
      name: 'Cluster Hardening',
      weight: 15,
      topics: [
        { name: 'Use Role Based Access Controls to minimize exposure', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/' },
        { name: 'Exercise caution in using service accounts e.g. disable defaults, minimize permissions on newly created ones', url: 'https://kubernetes.io/docs/concepts/security/service-accounts/' },
        { name: 'Restrict access to Kubernetes API', url: 'https://kubernetes.io/docs/reference/access-authn-authz/authorization/' },
        { name: 'Upgrade Kubernetes to avoid vulnerabilities', url: 'https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/' },
      ],
    },
    {
      name: 'System Hardening',
      weight: 10,
      topics: [
        { name: 'Minimize host OS footprint (reduce attack surface)', url: 'https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/' },
        { name: 'Using least-privilege identity and access management', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/' },
        { name: 'Minimize external access to the network', url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/#egress' },
        { name: 'Appropriately use kernel hardening tools such as AppArmor, seccomp', url: 'https://kubernetes.io/docs/tutorials/security/apparmor/' },
      ],
    },
    {
      name: 'Minimize Microservice Vulnerabilities',
      weight: 20,
      topics: [
        { name: 'Use appropriate pod security standards', url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/' },
        { name: 'Manage Kubernetes secrets', url: 'https://kubernetes.io/docs/concepts/configuration/secret/' },
        { name: 'Understand and implement isolation techniques (multi-tenancy, sandboxed containers, etc.)', url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/' },
        { name: 'Implement Pod-to-Pod encryption (Cilium)', url: 'https://docs.cilium.io/en/stable/security/transparent-encryption/' },
      ],
    },
    {
      name: 'Supply Chain Security',
      weight: 20,
      topics: [
        { name: 'Minimize base image footprint', url: 'https://kubernetes.io/docs/concepts/containers/images/' },
        { name: 'Understand your supply chain (e.g. SBOM, CI/CD, artifact repositories)', url: 'https://slsa.dev' },
        { name: 'Secure your supply chain (permitted registries, sign and validate artifacts, etc.)', url: 'https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#imagepolicywebhook' },
        { name: 'Perform static analysis of user workloads and container images (e.g. Kubesec, KubeLinter)', url: 'https://docs.kubelinter.io/' },
      ],
    },
    {
      name: 'Monitoring, Logging and Runtime Security',
      weight: 20,
      topics: [
        { name: 'Perform behavioral analytics to detect malicious activities', url: 'https://falco.org/docs/' },
        { name: 'Detect threats within physical infrastructure, apps, networks, data, users and workloads', url: 'https://falco.org/docs/rules/' },
        { name: 'Investigate and identify phases of attack and bad actors within the environment', url: 'https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/' },
        { name: 'Ensure immutability of containers at runtime', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/security-context/' },
        { name: 'Use Kubernetes audit logs to monitor access', url: 'https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/' },
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/training/certification/cks/',
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
    courses: [
      {
        title: 'Introduction to Kubernetes (LFS158)',
        url: 'https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes',
        author: 'The Linux Foundation',
        description: 'Foundational course covering Kubernetes basics and architecture',
        isPaid: false,
        duration: '16 hours',
        difficulty: 'beginner',
        rating: 4.8,
      },
      {
        title: 'Kubernetes Security Essentials (LFS260)',
        url: 'https://training.linuxfoundation.org/training/kubernetes-security-essentials-lfs260/',
        author: 'The Linux Foundation',
        description: 'Comprehensive paid course specifically designed for CKS preparation',
        isPaid: true,
        duration: '40 hours',
        difficulty: 'advanced',
        rating: 4.8,
      },
    ],
  },
};
