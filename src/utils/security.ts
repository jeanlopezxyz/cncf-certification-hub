/**
 * Security utilities for input validation and sanitization
 */

// Maximum lengths for different input types
const INPUT_LIMITS = {
  SEARCH_QUERY: 100,
  URL_PATH: 200,
  USER_INPUT: 500,
} as const;

// Dangerous patterns to detect and sanitize
const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  /<embed\b[^<]*>/gi,
  /<link\b[^>]*>/gi,
  /<meta\b[^>]*>/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /data:text\/html/gi,
  /on\w+\s*=/gi, // Event handlers like onclick, onload, etc.
] as const;

/**
 * Sanitizes user input by removing potentially dangerous content
 */
export function sanitizeInput(input: string, maxLength = INPUT_LIMITS.USER_INPUT): string {
  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Remove dangerous patterns
  DANGEROUS_PATTERNS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  // Remove HTML tags but keep content
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Remove special characters that could be used for XSS
  sanitized = sanitized.replace(/[<>"'&]/g, '');

  // Trim whitespace and limit length
  sanitized = sanitized.trim().slice(0, maxLength);

  return sanitized;
}

/**
 * Validates and sanitizes search queries specifically
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query || typeof query !== 'string') {
    return '';
  }

  // Allow only alphanumeric, spaces, hyphens, and dots for search
  const cleaned = query
    .replace(/[^a-zA-Z0-9\s\-\.]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, INPUT_LIMITS.SEARCH_QUERY);

  return cleaned;
}

/**
 * Validates URL paths to prevent path traversal attacks
 */
export function validateUrlPath(path: string): boolean {
  if (!path || typeof path !== 'string') {
    return false;
  }

  // Prevent path traversal
  if (path.includes('..') || path.includes('//')) {
    return false;
  }

  // Ensure path starts with expected pattern
  const validPathPattern = /^\/[a-zA-Z0-9\-\/]*$/;
  return validPathPattern.test(path) && path.length <= INPUT_LIMITS.URL_PATH;
}

/**
 * Rate limiting for search operations
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 50, windowMs = 60000) { // 50 requests per minute
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Add current attempt
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const searchRateLimiter = new RateLimiter();

/**
 * Secure localStorage wrapper with error handling
 */
export const secureStorage = {
  getItem(key: string): string | null {
    try {
      const item = localStorage.getItem(key);
      // Validate that stored data is safe
      if (item && typeof item === 'string') {
        return sanitizeInput(item);
      }
      return item;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  },

  setItem(key: string, value: string): boolean {
    try {
      const sanitizedValue = sanitizeInput(value);
      localStorage.setItem(key, sanitizedValue);
      return true;
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
      return false;
    }
  },

  removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
      return false;
    }
  }
};

/**
 * Validates certification data integrity
 */
export function validateCertificationData(cert: any): boolean {
  if (!cert || typeof cert !== 'object') {
    return false;
  }

  // Check required fields
  const requiredFields = ['id', 'name', 'acronym', 'level'];
  for (const field of requiredFields) {
    if (!cert[field] || typeof cert[field] !== 'string') {
      return false;
    }
  }

  // Validate enum values
  const validLevels = ['entry', 'intermediate', 'advanced'];
  if (!validLevels.includes(cert.level)) {
    return false;
  }

  return true;
}