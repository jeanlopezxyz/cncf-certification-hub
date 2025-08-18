import { describe, it, expect } from 'vitest';
import { buildCertificationUrl } from '../src/utils/index';

describe('buildCertificationUrl', () => {
  it('builds english URL without lang prefix', () => {
    // basePath configured in APP_CONFIG is /cncf-certification-hub
    expect(buildCertificationUrl('kcna', 'en')).toBe(
      '/cncf-certification-hub/certifications/kcna'
    );
  });

  it('builds localized URL for es', () => {
    expect(buildCertificationUrl('kcna', 'es')).toBe(
      '/cncf-certification-hub/es/certifications/kcna'
    );
  });
});

