import React, { forwardRef } from 'react';

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300',
      'focus-ring outline-none transform-gpu',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    ];

    const variantClasses = {
      primary: [
        'bg-gradient-to-r from-blue-600 to-blue-500 text-white',
        'hover:from-blue-500 hover:to-blue-400 hover:shadow-lg hover:shadow-blue-500/30',
        'active:scale-95 pulse-on-hover'
      ],
      secondary: [
        'bg-gradient-to-r from-purple-600 to-purple-500 text-white',
        'hover:from-purple-500 hover:to-purple-400 hover:shadow-lg hover:shadow-purple-500/30',
        'active:scale-95 pulse-on-hover'
      ],
      ghost: [
        'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'active:scale-95'
      ],
      outline: [
        'border-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-transparent',
        'hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/30',
        'active:scale-95'
      ]
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    const classes = [
      ...baseClasses,
      ...variantClasses[variant],
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

InteractiveButton.displayName = 'InteractiveButton';

export default InteractiveButton;