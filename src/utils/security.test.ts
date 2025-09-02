import { describe, it, expect } from 'vitest';
import { sanitizeInput, sanitizeSearchQuery, validateUrlPath } from './security';

describe('Security Utils', () => {
  describe('sanitizeInput', () => {
    it('should remove script tags', () => {
      const result = sanitizeInput('<script>alert("xss")</script>Hello');
      expect(result).toBe('Hello');
    });

    it('should remove HTML tags', () => {
      const result = sanitizeInput('<div>Hello World</div>');
      expect(result).toBe('Hello World');
    });

    it('should handle safe input', () => {
      const result = sanitizeInput('kubernetes cka test');
      expect(result).toBe('kubernetes cka test');
    });
  });

  describe('sanitizeSearchQuery', () => {
    it('should allow alphanumeric and basic chars', () => {
      const result = sanitizeSearchQuery('kubernetes cka-test 123');
      expect(result).toBe('kubernetes cka-test 123');
    });

    it('should remove dangerous chars', () => {
      const result = sanitizeSearchQuery('test<>');
      expect(result).toBe('test');
    });
  });

  describe('validateUrlPath', () => {
    it('should validate correct paths', () => {
      expect(validateUrlPath('/certifications/cka')).toBe(true);
    });

    it('should reject path traversal', () => {
      expect(validateUrlPath('../../../etc')).toBe(false);
    });
  });
});