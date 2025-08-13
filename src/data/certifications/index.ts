// Individual certification imports
import { cka } from './cka';
import { ckad } from './ckad';
import { cks } from './cks';
import { kcna } from './kcna';
import { kcsa } from './kcsa';
import { pca } from './pca';
import { ica } from './ica';
import { cca } from './cca';
import { capa } from './capa';
import { cgoa } from './cgoa';
import { lfcs } from './lfcs';
import { kca } from './kca';
import { otca } from './otca';
import { cba } from './cba';
import { cnpa } from './cnpa';

// Re-export types
export type { Certification, StudyResource } from '../../types';

// Export all certifications as an array
export const certifications = [
  cka,
  ckad,
  cks,
  kcna,
  kcsa,
  pca,
  ica,
  cca,
  capa,
  cgoa,
  lfcs,
  kca,
  otca,
  cba,
  cnpa,
];

// Export special certification groups
export const kubestronautCerts = ['cka', 'ckad', 'cks', 'kcna', 'kcsa'];
export const goldenKubestronautCerts = certifications.map(c => c.id);

// Export individual certifications for direct access
export { cka, ckad, cks, kcna, kcsa, pca, ica, cca, capa, cgoa, lfcs, kca, otca, cba, cnpa };
