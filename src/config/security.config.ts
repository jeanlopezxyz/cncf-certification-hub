/**
 * Security Configuration
 *
 * Centralized security settings and utilities for the application
 */

// Trusted domains for external links and resources
export const TRUSTED_DOMAINS = [
  'www.cncf.io',
  'cncf.io',
  'github.com',
  'training.linuxfoundation.org',
  'linuxfoundation.org',
  'www.armosec.io',
  'armosec.io',
  'opentelemetry.io',
  'backstage.io',
  'killer.sh',
  'kodekloud.com',
  'killercoda.com',
  'isovalent.com',
  'kubernetes.io',
  'prometheus.io',
  'istio.io',
  'cilium.io',
] as const;

// Content Security Policy configuration
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", ...TRUSTED_DOMAINS.map(domain => `https://${domain}`)],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': [],
} as const;

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy':
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), bluetooth=()',
} as const;

// Validation patterns for security
export const SECURITY_PATTERNS = {
  // Patterns that should be blocked in user input
  SUSPICIOUS: [
    /<script[\s\S]*?<\/script>/gi,
    /on\w+\s*=\s*["'][^"']*["']/gi,
    /javascript:/gi,
    /data:(?!image\/)/gi,
    /vbscript:/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ],

  // Safe URL patterns
  SAFE_URL: /^(https?:\/\/|\/|#)/,

  // Email pattern for contact validation
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
} as const;

/**
 * Validates if a URL is from a trusted domain
 */
export function isTrustedDomain(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return TRUSTED_DOMAINS.some(
      domain => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

/**
 * Sanitizes a URL for safe use
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '#';
  }

  // Remove dangerous protocols
  const dangerousProtocols = ['javascript:', 'vbscript:', 'data:', 'file:'];
  const lowerUrl = url.toLowerCase();

  if (dangerousProtocols.some(protocol => lowerUrl.startsWith(protocol))) {
    return '#';
  }

  // Ensure URL starts with safe protocol or is relative
  if (!SECURITY_PATTERNS.SAFE_URL.test(url)) {
    return '#';
  }

  return url;
}

/**
 * Validates content for security issues
 */
export function validateContent(content: string): boolean {
  if (!content || typeof content !== 'string') {
    return true;
  }

  return !SECURITY_PATTERNS.SUSPICIOUS.some(pattern => pattern.test(content));
}

/**
 * Sanitizes text content by removing dangerous elements
 */
export function sanitizeContent(content: string): string {
  if (!content || typeof content !== 'string') {
    return '';
  }

  let sanitized = content;

  // Remove dangerous patterns
  SECURITY_PATTERNS.SUSPICIOUS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  return sanitized.trim();
}

/**
 * Security utility functions
 */
export const SecurityUtils = {
  isTrustedDomain,
  sanitizeUrl,
  validateContent,
  sanitizeContent,

  /**
   * Generates a Content Security Policy string
   */
  generateCSP(): string {
    return Object.entries(CSP_CONFIG)
      .map(([directive, sources]) => {
        if (sources.length === 0) {
          return directive.replace('-', ' ');
        }
        return `${directive.replace('-', ' ')} ${sources.join(' ')}`;
      })
      .join('; ');
  },

  /**
   * Validates an email address
   */
  isValidEmail(email: string): boolean {
    return SECURITY_PATTERNS.EMAIL.test(email);
  },

  /**
   * Rate limiting for client-side actions (simple implementation)
   */
  createRateLimiter(maxAttempts: number, windowMs: number) {
    const attempts = new Map<string, number[]>();

    return function isRateLimited(identifier: string): boolean {
      const now = Date.now();
      const windowStart = now - windowMs;

      if (!attempts.has(identifier)) {
        attempts.set(identifier, []);
      }

      const userAttempts = attempts.get(identifier)!;

      // Remove old attempts outside the window
      const recentAttempts = userAttempts.filter(time => time > windowStart);
      attempts.set(identifier, recentAttempts);

      // Check if rate limit exceeded
      if (recentAttempts.length >= maxAttempts) {
        return true;
      }

      // Record this attempt
      recentAttempts.push(now);
      return false;
    };
  },
} as const;

export default SecurityUtils;
