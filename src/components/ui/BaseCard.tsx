/**
 * Base Card Component
 * Provides consistent card styling across the application
 */

import React from 'react';
import { SHADOWS } from '../../config/app.config';

type CardVariant = 'certification' | 'achievement' | 'info' | 'feature';
type CardSize = 'compact' | 'normal' | 'large';

interface BaseCardProps {
  variant?: CardVariant;
  size?: CardSize;
  hover?: boolean;
  gradient?: string;
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  onClick?: () => void;
}

const BaseCard: React.FC<BaseCardProps> = ({
  variant = 'certification',
  size = 'normal',
  hover = true,
  gradient,
  className = '',
  children,
  as: Component = 'div',
  onClick,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'certification':
        return {
          background: gradient || 'from-blue-900/40 to-blue-950/50',
          border: 'border-blue-700/50',
          hoverBorder: hover ? 'hover:border-blue-500/60' : '',
          hoverBackground: hover ? 'hover:from-blue-900/50 hover:to-blue-950/60' : '',
          shadow: hover ? 'hover:shadow-lg hover:shadow-blue-500/30' : '',
        };
      
      case 'achievement':
        return {
          background: gradient || 'from-blue-900/90 to-blue-950/95',
          border: 'border-blue-700/70',
          hoverBorder: hover ? 'hover:border-blue-500' : '',
          hoverBackground: hover ? 'hover:from-blue-850/95 hover:to-blue-900/100' : '',
          shadow: hover ? 'hover:shadow-lg hover:shadow-blue-500/50' : '',
        };
      
      case 'info':
        return {
          background: gradient || 'from-slate-800/40 to-slate-900/60',
          border: 'border-slate-700/50',
          hoverBorder: hover ? 'hover:border-slate-600/60' : '',
          hoverBackground: hover ? 'hover:bg-slate-700/30' : '',
          shadow: hover ? 'hover:shadow-lg hover:shadow-slate-500/20' : '',
        };
      
      case 'feature':
        return {
          background: gradient || 'from-blue-800/30 to-indigo-900/40',
          border: 'border-blue-700/40',
          hoverBorder: hover ? 'hover:border-blue-500' : '',
          hoverBackground: hover ? 'hover:from-blue-700/40 hover:to-indigo-800/50' : '',
          shadow: hover ? 'hover:shadow-lg hover:shadow-blue-500/20' : '',
        };
      
      default:
        return {
          background: 'from-gray-800/40 to-gray-900/60',
          border: 'border-gray-700/50',
          hoverBorder: '',
          hoverBackground: '',
          shadow: '',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'compact':
        return {
          padding: 'p-3 sm:p-4',
          rounded: 'rounded-lg',
          minHeight: 'min-h-[120px]',
        };
      
      case 'large':
        return {
          padding: 'p-6 sm:p-8',
          rounded: 'rounded-2xl',
          minHeight: 'min-h-[300px]',
        };
      
      default: // normal
        return {
          padding: 'p-4 sm:p-5 md:p-6',
          rounded: 'rounded-xl',
          minHeight: 'min-h-[200px]',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const cardClasses = [
    'relative',
    'bg-gradient-to-br',
    variantStyles.background,
    'border-2',
    variantStyles.border,
    variantStyles.hoverBorder,
    'transition-all',
    'duration-300',
    'overflow-hidden',
    sizeStyles.padding,
    sizeStyles.rounded,
    sizeStyles.minHeight,
    variantStyles.hoverBackground,
    variantStyles.shadow,
    hover ? 'group' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component 
      className={cardClasses}
      onClick={onClick}
      style={{
        transform: 'translateZ(0)', // Forces GPU acceleration
        backfaceVisibility: 'hidden', // Prevents rendering issues
      }}
    >
      {children}
    </Component>
  );
};

export default BaseCard;