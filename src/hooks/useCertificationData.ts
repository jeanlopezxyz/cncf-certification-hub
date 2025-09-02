/**
 * Custom hook for certification data management
 * Centralizes data access and filtering logic
 */

import { useMemo } from 'react';
import { certifications } from '../data/certifications';
import type { Certification, CertificationLevel } from '../types';

export function useCertificationData() {
  const allCertifications = certifications;

  const filterByLevel = useMemo(() => {
    return (level: CertificationLevel | 'all') => {
      if (level === 'all') return allCertifications;
      return allCertifications.filter(cert => cert.level === level);
    };
  }, [allCertifications]);

  const filterByIds = useMemo(() => {
    return (ids: string[]) => {
      return ids
        .map(id => allCertifications.find(cert => cert.id === id))
        .filter((cert): cert is Certification => cert !== undefined);
    };
  }, [allCertifications]);

  const getKubestronautCertifications = useMemo(() => {
    const kubestronautIds = ['kcna', 'kcsa', 'cka', 'ckad', 'cks'];
    return filterByIds(kubestronautIds);
  }, [filterByIds]);

  const getCNCFCertifications = useMemo(() => {
    const cncfIds = ['capa', 'cba', 'cca', 'cgoa', 'cnpa', 'ica', 'kca', 'otca', 'pca'];
    return filterByIds(cncfIds);
  }, [filterByIds]);

  const sortByLevel = useMemo(() => {
    return (certs: Certification[]) => {
      const levelOrder: Record<CertificationLevel, number> = {
        'entry': 1,
        'intermediate': 2,
        'advanced': 3,
      };
      
      return [...certs].sort((a, b) => {
        const levelDiff = levelOrder[a.level] - levelOrder[b.level];
        if (levelDiff !== 0) return levelDiff;
        return a.acronym.localeCompare(b.acronym);
      });
    };
  }, []);

  const sortAlphabetically = useMemo(() => {
    return (certs: Certification[]) => {
      return [...certs].sort((a, b) => a.acronym.localeCompare(b.acronym));
    };
  }, []);

  const getOrderedCertifications = useMemo(() => {
    return (filter: CertificationLevel | 'all' = 'all') => {
      const filtered = filterByLevel(filter);
      const kubestronaut = getKubestronautCertifications.filter(cert => 
        filter === 'all' || cert.level === filter
      );
      const lfcs = filtered.filter(cert => cert.id === 'lfcs');
      const others = filtered.filter(cert => 
        !['kcna', 'kcsa', 'cka', 'ckad', 'cks', 'lfcs'].includes(cert.id)
      );

      return [...kubestronaut, ...sortAlphabetically(others), ...lfcs];
    };
  }, [filterByLevel, getKubestronautCertifications, sortAlphabetically]);

  const searchCertifications = useMemo(() => {
    return (query: string): Certification[] => {
      if (!query.trim()) return [];
      
      const queryLower = query.toLowerCase();
      return allCertifications.filter(cert =>
        cert.acronym.toLowerCase().includes(queryLower) ||
        cert.name.toLowerCase().includes(queryLower) ||
        cert.id.toLowerCase().includes(queryLower)
      );
    };
  }, [allCertifications]);

  return {
    allCertifications,
    filterByLevel,
    filterByIds,
    getKubestronautCertifications,
    getCNCFCertifications,
    sortByLevel,
    sortAlphabetically,
    getOrderedCertifications,
    searchCertifications,
  };
}