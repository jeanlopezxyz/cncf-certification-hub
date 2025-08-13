/**
 * Central type definitions for the CNCF Certification Resources Hub
 */

import type React from 'react';

// ============================================================================
// Core Types
// ============================================================================

export type Language = 'en' | 'es' | 'pt';

export type CertificationLevel = 'entry' | 'intermediate' | 'advanced';

export type ExamType = 'performance' | 'multiple-choice';

export type CertificationCategory =
  | 'kubernetes'
  | 'observability'
  | 'serviceMesh'
  | 'gitops'
  | 'platform'
  | 'security'
  | 'linux';

// ============================================================================
// Domain Models
// ============================================================================

/**
 * Represents an exam domain with topics and weight
 */
export interface ExamDomain {
  name: string;
  weight: number;
  topics: string[];
}

/**
 * Study resources for a certification
 */
export interface CertificationResources {
  official: string;
  github: string[];
  practice: string[];
}

/**
 * Complete certification model
 */
export interface Certification {
  id: string;
  acronym: string;
  name: string;
  description: string;
  level: CertificationLevel;
  type: ExamType;
  duration: number; // in minutes
  price: number; // in USD
  requiredFor?: string[];
  prerequisite?: string;
  domains: ExamDomain[];
  resources: CertificationResources;
  icon?: string;
  color: string;
}

/**
 * Achievement types in the certification journey
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  icon?: string;
  level: 'bronze' | 'silver' | 'gold';
}

// ============================================================================
// UI Component Props
// ============================================================================

/**
 * Common props for all components
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Props for components that support internationalization
 */
export interface I18nComponentProps {
  lang: Language;
}

/**
 * Props for interactive components
 */
export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

/**
 * Props for components with loading states
 */
export interface LoadableComponentProps {
  loading?: boolean;
  error?: string | null;
}

// ============================================================================
// Configuration Types
// ============================================================================

/**
 * Application configuration
 */
export interface AppConfig {
  name: string;
  shortName: string;
  description: string;
  basePath: string;
  defaultLanguage: Language;
}

/**
 * Color configuration
 */
export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * Dimension configuration
 */
export interface DimensionConfig {
  sidebar: {
    width: string;
    height: string;
    mobileTop: string;
    desktopTop: string;
  };
  header: {
    height: string;
  };
  card: {
    height: string;
  };
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  fast: number;
  normal: number;
  slow: number;
  verySlow: number;
}

// ============================================================================
// State Management Types
// ============================================================================

/**
 * User progress state
 */
export interface UserProgress {
  completedCertifications: string[];
  currentCertification: string | null;
  studyHours: number;
  lastActivity: Date;
}

/**
 * Sidebar state
 */
export interface SidebarState {
  isOpen: boolean;
  openSections: string[];
  openCategories: string[];
  isCollapsed: boolean;
}

/**
 * Filter state for certifications
 */
export interface FilterState {
  level: CertificationLevel | 'all';
  category: CertificationCategory | 'all';
  searchQuery: string;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Makes all properties of T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extracts the type of array elements
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * Makes specific properties required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Omits properties from T and adds properties from U
 */
export type Modify<T, U> = Omit<T, keyof U> & U;

// ============================================================================
// Translation Types
// ============================================================================

/**
 * Translation key structure
 */
export interface TranslationKeys {
  [key: string]: string | TranslationKeys;
}

/**
 * Complete translation object for a language
 */
export interface TranslationObject {
  [key: string]: string;
}

// ============================================================================
// Event Types
// ============================================================================

/**
 * Custom event for certification selection
 */
export interface CertificationSelectEvent {
  certificationId: string;
  action: 'view' | 'flip' | 'navigate';
}

/**
 * Custom event for progress updates
 */
export interface ProgressUpdateEvent {
  certificationId: string;
  completed: boolean;
  timestamp: Date;
}

// ============================================================================
// Form Types
// ============================================================================

/**
 * Contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Feedback form data
 */
export interface FeedbackFormData {
  rating: 1 | 2 | 3 | 4 | 5;
  category: 'bug' | 'feature' | 'content' | 'other';
  description: string;
  email?: string;
}

// ============================================================================
// Study Resources Types
// ============================================================================

/**
 * Study resource for certifications
 */
export interface StudyResource {
  title: string;
  url: string;
  description?: string;
  type?: 'official' | 'community' | 'practice' | 'documentation';
  isPaid?: boolean;
  author?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  [key: string]: unknown;
}

/**
 * Study section with resources
 */
export interface StudySection {
  id: string;
  title: string;
  type:
    | 'github'
    | 'official'
    | 'books'
    | 'courses'
    | 'videos'
    | 'practice'
    | 'blogs'
    | 'documentation'
    | 'tools'
    | 'communities';
  resources: StudyResource[];
}

/**
 * Study tip for better learning
 */
export interface StudyTip {
  id: string;
  title: string;
  description: string;
  category?: 'preparation' | 'practice' | 'exam' | 'general';
  icon?: React.ReactNode;
  color?: string;
  points?: string[];
}

// ============================================================================
// Export type guards
// ============================================================================

/**
 * Type guard to check if a value is a valid Language
 */
export const isLanguage = (value: unknown): value is Language => {
  return typeof value === 'string' && ['en', 'es', 'pt'].includes(value);
};

/**
 * Type guard to check if a value is a valid CertificationLevel
 */
export const isCertificationLevel = (value: unknown): value is CertificationLevel => {
  return typeof value === 'string' && ['entry', 'intermediate', 'advanced'].includes(value);
};

/**
 * Type guard to check if a value is a valid ExamType
 */
export const isExamType = (value: unknown): value is ExamType => {
  return typeof value === 'string' && ['performance', 'multiple-choice'].includes(value);
};
