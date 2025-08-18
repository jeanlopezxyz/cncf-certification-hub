import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AchievementPrograms from '../src/components/achievements/AchievementPrograms';

describe('AchievementPrograms', () => {
  it('renders program links with correct hrefs (en)', () => {
    render(<AchievementPrograms lang="en" />);
    const kubestronaut = screen.getByRole('link', { name: /kubestronaut/i });
    const golden = screen.getByRole('link', { name: /golden/i });

    expect(kubestronaut).toHaveAttribute(
      'href',
      '/cncf-certification-hub/achievements/kubestronaut'
    );
    expect(golden).toHaveAttribute(
      'href',
      '/cncf-certification-hub/achievements/golden-kubestronaut'
    );
  });
});

