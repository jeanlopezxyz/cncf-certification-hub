import React from 'react';

interface SecureContentProps {
  content: string;
  allowedTags?: string[];
  className?: string;
}

/**
 * SecureContent Component
 *
 * Provides additional security layer for dynamic content rendering.
 * While React already sanitizes content, this component provides
 * explicit security controls and validation.
 */
export default function SecureContent({
  content,
  allowedTags = [],
  className = '',
}: SecureContentProps) {
  // Basic content sanitization (React already handles most XSS protection)
  const sanitizeContent = (text: string): string => {
    if (!text || typeof text !== 'string') {
      return '';
    }

    // Remove potential script tags and event handlers
    const sanitized = text
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '');

    return sanitized;
  };

  // Validate content doesn't contain suspicious patterns
  const validateContent = (text: string): boolean => {
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:(?!image\/)/i,
      /vbscript:/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
    ];

    return !suspiciousPatterns.some(pattern => pattern.test(text));
  };

  const sanitizedContent = sanitizeContent(content);
  const isValid = validateContent(sanitizedContent);

  if (!isValid) {
    // Log security event to monitoring
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag?.('event', 'security_block', {
        event_category: 'Security',
        event_label: 'content_blocked',
      });
    }
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-700">
        ⚠️ Content blocked for security reasons
      </div>
    );
  }

  // For plain text content (most secure)
  if (allowedTags.length === 0) {
    return <div className={className}>{sanitizedContent}</div>;
  }

  // For HTML content with allowed tags
  // Note: React's dangerouslySetInnerHTML should be used sparingly
  // and only with trusted, sanitized content
  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}

/**
 * Hook for secure content handling
 */
export function useSecureContent(content: string) {
  const sanitize = (text: string): string => {
    if (!text || typeof text !== 'string') {
      return '';
    }

    return text
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '');
  };

  const validate = (text: string): boolean => {
    const suspiciousPatterns = [/<script/i, /javascript:/i, /on\w+\s*=/i, /vbscript:/i];

    return !suspiciousPatterns.some(pattern => pattern.test(text));
  };

  const sanitizedContent = sanitize(content);
  const isValid = validate(sanitizedContent);

  return {
    content: isValid ? sanitizedContent : '',
    isValid,
    sanitize,
    validate,
  };
}
