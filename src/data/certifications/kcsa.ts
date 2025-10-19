import type { Certification } from '../../types';

export const kcsa: Certification = {
  id: 'kcsa',
  acronym: 'KCSA',
  name: 'Kubernetes and Cloud Security Associate',
  description: 'cert.kcsa.description',
  level: 'entry',
  type: 'multiple-choice',
  duration: 90,
  price: 250,
  requiredFor: ['Kubestronaut', 'Golden Kubestronaut'],
  color: 'from-blue-600 to-blue-800',
  kubernetesVersion: 'Not applicable',
  examAttempts: 2,
  simulatorProvider: 'No simulator - Multiple choice exam',
  simulatorAccess: 'Not applicable - No hands-on simulator provided',
  examFormat: 'Online proctored, multiple-choice test with 60 questions',
  retakePolicy: 'One free retake included with registration cost',
  prerequisites: 'No prerequisites',
  domains: [
    {
      name: 'Overview of Cloud Native Security',
      weight: 14,
      topics: [
        {
          name: 'The 4Cs of Cloud Native Security',
          url: 'https://kubernetes.io/es/docs/concepts/security/overview/#las-4c-de-seguridad-en-cloud-native',
        },
        {
          name: 'Cloud Provider and Infrastructure Security',
          url: 'https://kubernetes.io/docs/concepts/security/overview/#cloud',
        },
        {
          name: 'Controls and Frameworks',
          url: 'https://kubernetes.io/docs/concepts/security/security-checklist/',
        },
        {
          name: 'Isolation Techniques',
          url: 'https://kubernetes.io/docs/concepts/security/multi-tenancy/',
        },
        {
          name: 'Artifact Repository and Image Security',
          url: 'https://kubernetes.io/docs/concepts/security/supply-chain-security/',
        },
        {
          name: 'Workload and Application Code Security',
          url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/',
        },
      ],
    },
    {
      name: 'Kubernetes Cluster Component Security',
      weight: 22,
      topics: [
        {
          name: 'API Server',
          url: 'https://kubernetes.io/docs/concepts/overview/components/#kube-apiserver',
        },
        {
          name: 'Controller Manager',
          url: 'https://kubernetes.io/docs/concepts/overview/components/#kube-controller-manager',
        },
        {
          name: 'Scheduler',
          url: 'https://kubernetes.io/docs/concepts/overview/components/#kube-scheduler',
        },
        {
          name: 'Kubelet',
          url: 'https://kubernetes.io/docs/concepts/overview/components/#kubelet',
        },
        {
          name: 'Container Runtime',
          url: 'https://kubernetes.io/docs/setup/production-environment/container-runtimes/',
        },
        {
          name: 'KubeProxy',
          url: 'https://kubernetes.io/docs/concepts/overview/components/#kube-proxy',
        },
        {
          name: 'Pod',
          url: 'https://kubernetes.io/docs/concepts/workloads/pods/',
        },
        {
          name: 'Etcd',
          url: 'https://kubernetes.io/docs/concepts/overview/components/#etcd',
        },
        {
          name: 'Container Networking',
          url: 'https://kubernetes.io/docs/concepts/services-networking/',
        },
        {
          name: 'Client Security',
          url: 'https://kubernetes.io/docs/reference/access-authn-authz/authentication/',
        },
        {
          name: 'Storage',
          url: 'https://kubernetes.io/docs/concepts/storage/',
        },
      ],
    },
    {
      name: 'Kubernetes Security Fundamentals',
      weight: 22,
      topics: [
        {
          name: 'Pod Security Standards',
          url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/',
        },
        {
          name: 'Pod Security Admission',
          url: 'https://kubernetes.io/docs/concepts/security/pod-security-admission/',
        },
        {
          name: 'Authentication',
          url: 'https://kubernetes.io/docs/reference/access-authn-authz/authentication/',
        },
        {
          name: 'Authorization',
          url: 'https://kubernetes.io/docs/reference/access-authn-authz/authorization/',
        },
        {
          name: 'Secrets',
          url: 'https://kubernetes.io/docs/concepts/configuration/secret/',
        },
        {
          name: 'Isolation and Segmentation',
          url: 'https://kubernetes.io/docs/concepts/security/multi-tenancy/',
        },
        {
          name: 'Audit Logging',
          url: 'https://kubernetes.io/docs/tasks/debug-application-cluster/audit/',
        },
        {
          name: 'Network Policy',
          url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/',
        },
      ],
    },
    {
      name: 'Kubernetes Threat Model',
      weight: 16,
      topics: [
        {
          name: 'Kubernetes Trust Boundaries and Data Flow',
          url: 'https://kubernetes.io/docs/concepts/security/',
        },
        {
          name: 'Persistence',
          url: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/',
        },
        {
          name: 'Denial of Service',
          url: 'https://kubernetes.io/docs/concepts/policy/resource-quotas/',
        },
        {
          name: 'Malicious Code Execution and Compromised Applications in Containers',
          url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/',
        },
        {
          name: 'Attacker on the Network',
          url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/',
        },
        {
          name: 'Access to Sensitive Data',
          url: 'https://kubernetes.io/docs/concepts/configuration/secret/',
        },
        {
          name: 'Privilege Escalation',
          url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/',
        },
      ],
    },
    {
      name: 'Platform Security',
      weight: 16,
      topics: [
        {
          name: 'Supply Chain Security',
          url: 'https://kubernetes.io/docs/concepts/security/supply-chain-security/',
        },
        {
          name: 'Image Repository',
          url: 'https://kubernetes.io/docs/concepts/containers/images/',
        },
        {
          name: 'Observability',
          url: 'https://kubernetes.io/docs/tasks/debug-application-cluster/resource-usage-monitoring/',
        },
        {
          name: 'Service Mesh',
          url: 'https://kubernetes.io/docs/concepts/services-networking/service/',
        },
        {
          name: 'PKI',
          url: 'https://kubernetes.io/docs/setup/best-practices/certificates/',
        },
        {
          name: 'Connectivity',
          url: 'https://kubernetes.io/docs/concepts/services-networking/',
        },
        {
          name: 'Admission Control',
          url: 'https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/',
        },
      ],
    },
    {
      name: 'Compliance and Security Frameworks',
      weight: 10,
      topics: [
        {
          name: 'Compliance Frameworks',
          url: 'https://kubernetes.io/docs/concepts/security/security-checklist/',
        },
        {
          name: 'Threat Modelling Frameworks',
          url: 'https://kubernetes.io/docs/concepts/security/',
        },
        {
          name: 'Supply Chain Compliance',
          url: 'https://kubernetes.io/docs/concepts/security/supply-chain-security/',
        },
        {
          name: 'Automation and Tooling',
          url: 'https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/',
        },
      ],
    },
  ],
  resources: {
    official: 'https://www.cncf.io/training/certification/kcsa/',
    github: [
      'https://github.com/cncf/curriculum',
      'https://github.com/kubernetes/community/tree/master/sig-security',
    ],
    practice: [
      'https://kodekloud.com/courses/kubernetes-and-cloud-native-security-associate-kcsa/',
      'https://killercoda.com/killer-shell-kcsa',
    ],
    books: [
      {
        title: 'Kubernetes Security and Observability',
        url: 'https://www.oreilly.com/library/view/kubernetes-security-and/9781098107093/',
        author: 'Brendan Creane, Amit Gupta',
        description: 'A holistic approach to securing, monitoring, and troubleshooting',
        isPaid: true,
        format: 'ebook',
        year: 2023,
        difficulty: 'intermediate',
      },
      {
        title: 'Container Security',
        url: 'https://www.oreilly.com/library/view/container-security/9781492056690/',
        author: 'Liz Rice',
        description: 'Fundamental technology concepts that protect containerized applications',
        isPaid: true,
        format: 'ebook',
        year: 2020,
        difficulty: 'intermediate',
      },
    ],
    courses: [
      {
        title: 'Introduction to Kubernetes (LFS158)',
        url: 'https://www.edx.org/learn/kubernetes/the-linux-foundation-introduction-to-kubernetes',
        author: 'The Linux Foundation',
        description: 'Essential Kubernetes foundation before diving into security',
        isPaid: false,
        duration: '16 hours',
        difficulty: 'beginner',
        rating: 4.8,
      },
      {
        title: 'Introduction to DevOps and Site Reliability Engineering (LFS162)',
        url: 'https://www.edx.org/learn/devops/the-linux-foundation-introduction-to-devops-and-site-reliability-engineering',
        author: 'The Linux Foundation',
        description: 'DevOps security practices and operational security',
        isPaid: false,
        duration: '12 hours',
        difficulty: 'beginner',
        rating: 4.7,
      },
    ],
    videos: [
      {
        title: 'Kubernetes Security Best Practices',
        url: 'https://www.youtube.com/watch?v=oBf5lrmquYI',
        author: 'CNCF',
        description: 'Security best practices for Kubernetes deployments',
        isPaid: false,
        duration: '45 minutes',
        difficulty: 'intermediate',
      },
      {
        title: 'Container Security Fundamentals',
        url: 'https://www.youtube.com/watch?v=VjSJqc13PZk',
        author: 'Liz Rice',
        description: 'Fundamental concepts of container and Kubernetes security',
        isPaid: false,
        duration: '1 hour',
        difficulty: 'beginner',
      },
    ],
    documentation: [
      {
        title: 'Kubernetes Security Documentation',
        url: 'https://kubernetes.io/docs/concepts/security/',
        description: 'Official Kubernetes security concepts and best practices',
        isPaid: false,
      },
      {
        title: 'Pod Security Standards',
        url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/',
        description: 'Pod security policy alternatives and security contexts',
        isPaid: false,
      },
      {
        title: 'Network Security',
        url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/',
        description: 'Network policies and micro-segmentation in Kubernetes',
        isPaid: false,
      },
    ],
    communities: [
      {
        title: 'Kubernetes Security SIG',
        url: 'https://github.com/kubernetes/community/tree/master/sig-security',
        description: 'Special Interest Group focused on Kubernetes security',
        isPaid: false,
      },
      {
        title: 'CNCF Slack - #kubernetes-security',
        url: 'https://cloud-native.slack.com/channels/kubernetes-security',
        description: 'Community discussions on Kubernetes security',
        isPaid: false,
      },
    ],
    tools: [
      {
        title: 'Falco',
        url: 'https://falco.org/',
        description: 'Cloud native runtime security tool',
        isPaid: false,
      },
      {
        title: 'OPA Gatekeeper',
        url: 'https://open-policy-agent.github.io/gatekeeper/',
        description: 'Policy controller for Kubernetes using Open Policy Agent',
        isPaid: false,
      },
    ],
  },
};
