import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchBar from '../src/components/search/SearchBar';

describe('SearchBar', () => {
  it('renders input with placeholder', () => {
    render(<SearchBar lang="en" />);
    const input = screen.getAllByPlaceholderText(/search certifications/i)[0];
    expect(input).toBeInTheDocument();
  });
});

