import type { Certification } from '../types';

export const lfcs: Certification = {
  id: 'lfcs',
  acronym: 'LFCS',
  name: 'Linux Foundation Certified System Administrator',
  description: 'Essential Linux system administration skills',
  level: 'intermediate',
  type: 'performance',
  duration: 120,
  price: 395,
  requiredFor: ['Golden Kubestronaut'],
  color: 'from-indigo-600 to-sky-700',
  kubernetesVersion: 'Not applicable',
  examAttempts: 2,
  simulatorProvider: 'Killer.sh',
  simulatorAccess: '2 attempts (36 hours each)',
  examFormat:
    'Online proctored, performance-based test requiring solving multiple command-line tasks',
  retakePolicy:
    'LFCS exam fees cover two attempts. If additional attempts are needed, candidates must repurchase the exam.',
  prerequisites: 'No prerequisites',
  domains: [
    {
      name: 'Essential Commands',
      weight: 25,
      topics: [
        'Log into local & remote graphical and text mode consoles',
        'Search for files',
        'Evaluate and compare the basic file system features and options',
        'Compare and manipulate file content',
        'Use input-output redirection',
      ],
    },
    {
      name: 'Operation of Running Systems',
      weight: 20,
      topics: [
        'Boot, reboot, and shut down a system safely',
        'Boot or change system into different operating modes',
        'Install, configure and troubleshoot bootloaders',
        'Diagnose and manage processes',
        'Locate and analyze system log files',
      ],
    },
    {
      name: 'User and Group Management',
      weight: 10,
      topics: [
        'Create, delete, and modify local user accounts',
        'Create, delete, and modify local groups and group memberships',
        'Manage system-wide environment profiles',
        'Manage template user environment',
        'Configure user resource limits',
      ],
    },
    {
      name: 'Networking',
      weight: 12,
      topics: [
        'Configure networking and hostname resolution statically or dynamically',
        'Configure network services to start automatically at boot',
        'Implement packet filtering',
        'Start, stop, and check the status of network services',
        'Statically route IP traffic',
      ],
    },
    {
      name: 'Service Configuration',
      weight: 20,
      topics: [
        'Configure a caching DNS server',
        'Maintain a DNS zone',
        'Configure email aliases',
        'Configure SSH servers and clients',
        'Restrict access to the HTTP proxy server',
      ],
    },
    {
      name: 'Storage Management',
      weight: 13,
      topics: [
        'List, create, delete, and modify physical storage partitions',
        'Manage and configure LVM storage',
        'Create and configure encrypted storage',
        'Configure systems to mount file systems at or during boot',
        'Configure and manage swap space',
      ],
    },
  ],
  resources: {
    official:
      'https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/',
    github: ['https://github.com/Bes0n/LFCS', 'https://github.com/walidshaari/LFCS'],
    practice: [
      'https://killer.sh',
      'https://kodekloud.com/courses/linux-foundation-certified-system-administrator-lfcs/',
    ],
  },
  studyTimeWeeks: 8,
  passingScore: 66,
  validity: 3,
};
