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
  },
  {
    id: 'study-path',
    translationKey: 'sidebar.tips.path',
  },
  {
    id: 'practice-labs',
    translationKey: 'sidebar.tips.practiceLabs',
  },
  {
    id: 'time-management',
    translationKey: 'sidebar.tips.timeManagement',
  },
];

export const ACHIEVEMENTS_ITEMS = [
  {
    id: 'kubestronaut',
    translationKey: 'achievements.kubestronaut.title',
    href: './achievements/kubestronaut',
  },
  {
    id: 'golden-kubestronaut',
    translationKey: 'achievements.golden.title',
    href: './achievements/golden-kubestronaut',
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
