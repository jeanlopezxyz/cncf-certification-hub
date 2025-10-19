import React, { useState } from 'react';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient';
}

const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className = '',
  hover = true,
  clickable = false,
  onClick,
  variant = 'default'
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'glass border-white/20 dark:border-white/10';
      case 'gradient':
        return 'bg-gradient-to-br from-blue-900/40 to-purple-900/60 border-blue-700/50';
      default:
        return 'bg-surface border-neutral-200 dark:border-neutral-700';
    }
  };

  const baseClasses = [
    'rounded-xl border p-6 transition-all duration-300 transform-gpu',
    getVariantClasses(),
    hover ? 'hover-lift hover:shadow-xl' : '',
    clickable ? 'cursor-pointer' : '',
    isPressed ? 'scale-95' : '',
    className
  ].filter(Boolean).join(' ');

  const handleMouseDown = () => clickable && setIsPressed(true);
  const handleMouseUp = () => clickable && setIsPressed(false);
  const handleMouseLeave = () => clickable && setIsPressed(false);

  return (
    <div
      className={baseClasses}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, box-shadow'
      }}
    >
      {children}
    </div>
  );
};

export default EnhancedCard;