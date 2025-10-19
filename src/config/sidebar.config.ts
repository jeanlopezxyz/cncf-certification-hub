/**
 * Sidebar configuration
 * Defines the structure and content of the sidebar navigation
 */

import type { Certification } from '../types';
import { EXTERNAL_URLS } from './app.config';

export interface SidebarCategory {
  key: string;
  name: string;
  certificationIds: string[];
}

export const CERTIFICATION_CATEGORIES: SidebarCategory[] = [
  {
    key: 'kubernetes',
    name: 'categories.kubernetes',
    certificationIds: ['kcna', 'kcsa', 'cka', 'ckad', 'cks'], // Kubestronaut path order
  },
  {
    key: 'gitops',
    name: 'categories.gitops',
    certificationIds: ['capa', 'cgoa'], // CAPA (Argo) and CGOA (GitOps general)
  },
  {
    key: 'networking',
    name: 'categories.networking',
    certificationIds: ['cca'], // Cilium (CNI/eBPF networking)
  },
  {
    key: 'observability',
    name: 'categories.observability',
    certificationIds: ['otca', 'pca'], // OpenTelemetry and Prometheus
  },
  {
    key: 'platform',
    name: 'categories.platform',
    certificationIds: ['cba', 'cnpa'], // Backstage (dev portal) and Cloud Native Platform
  },
  {
    key: 'security',
    name: 'categories.security',
    certificationIds: ['kca'], // Kyverno (security posture management)
  },
  {
    key: 'serviceMesh',
    name: 'categories.serviceMesh',
    certificationIds: ['ica'], // Only Istio (true service mesh)
  },
  {
    key: 'linux',
    name: 'categories.linux',
    certificationIds: ['lfcs'], // Linux Foundation certification
  },
];

export const STUDY_TIPS_ITEMS = [
  {
    id: 'exam-preparation',
    translationKey: 'sidebar.tips.exam',
    descriptionKey: 'sidebar.tips.examDesc',
    icon: '📝',
    color: 'blue',
  },
  {
    id: 'study-path',
    translationKey: 'sidebar.tips.path',
    descriptionKey: 'sidebar.tips.pathDesc',
    icon: '🗺️',
    color: 'sky',
  },
  {
    id: 'practice-labs',
    translationKey: 'sidebar.tips.practiceLabs',
    descriptionKey: 'sidebar.tips.practiceLabsDesc',
    icon: '🧪',
    color: 'purple',
  },
  {
    id: 'time-management',
    translationKey: 'sidebar.tips.timeManagement',
    descriptionKey: 'sidebar.tips.timeManagementDesc',
    icon: '⏰',
    color: 'emerald',
  },
];

export const ACHIEVEMENTS_ITEMS = [
  {
    id: 'kubestronaut',
    translationKey: 'achievements.kubestronaut.title',
    descriptionKey: 'achievements.kubestronaut.shortDesc',
    href: 'achievements/kubestronaut', // Sin slash inicial para rutas relativas al base path
    icon: '🚀',
    color: 'blue',
    requiredCerts: 5,
  },
  {
    id: 'golden-kubestronaut',
    translationKey: 'achievements.golden.title',
    descriptionKey: 'achievements.golden.shortDesc',
    href: 'achievements/golden-kubestronaut', // Sin slash inicial para rutas relativas al base path
    icon: '🏆',
    color: 'amber',
    requiredCerts: 16,
  },
];

export const INTERNAL_PAGES_ITEMS = [
  {
    id: 'architecture',
    translationKey: 'sidebar.architecture',
    descriptionKey: 'sidebar.architectureDesc',
    href: 'cncf-architecture',
    icon: '🏗️',
    color: 'blue',
  },
];

export const QUICK_LINKS_ITEMS = [
  {
    id: 'curriculum',
    translationKey: 'sidebar.curriculum',
    href: EXTERNAL_URLS.githubCNCF,
  },
  {
    id: 'practice',
    translationKey: 'sidebar.practice',
    href: EXTERNAL_URLS.learning.killerSh,
  },
  {
    id: 'docs',
    translationKey: 'sidebar.docs',
    href: EXTERNAL_URLS.kubernetes.docs,
  },
];

/**
 * Helper function to group certifications by category
 * Maintains the order specified in certificationIds
 */
export function groupCertificationsByCategory(certifications: Certification[]) {
  const grouped: Record<string, Certification[]> = {};

  CERTIFICATION_CATEGORIES.forEach(category => {
    grouped[category.key] = category.certificationIds
      .map(id => certifications.find(cert => cert.id === id))
      .filter((cert): cert is Certification => cert !== undefined);
  });

  return grouped;
}
