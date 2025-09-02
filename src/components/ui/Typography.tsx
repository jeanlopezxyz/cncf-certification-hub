import React from 'react';
import { TYPOGRAPHY } from '../../config/app.config';

// Base typography component interface
interface BaseTypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

// Typography variant types
type TypographySize = keyof typeof TYPOGRAPHY.sizes;
type TypographyWeight = keyof typeof TYPOGRAPHY.weights;
type TypographyLineHeight = keyof typeof TYPOGRAPHY.lineHeights;
type TypographyTracking = keyof typeof TYPOGRAPHY.tracking;

interface TypographyProps extends BaseTypographyProps {
  size?: TypographySize;
  weight?: TypographyWeight;
  lineHeight?: TypographyLineHeight;
  tracking?: TypographyTracking;
  gradient?: boolean;
  center?: boolean;
}

// Base Typography component
export const Typography: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'div',
  size = 'body',
  weight = 'normal',
  lineHeight = 'normal',
  tracking = 'normal',
  gradient = false,
  center = false,
}) => {
  const classes = [
    TYPOGRAPHY.sizes[size],
    TYPOGRAPHY.weights[weight],
    TYPOGRAPHY.lineHeights[lineHeight],
    TYPOGRAPHY.tracking[tracking],
    gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600' : '',
    center ? 'text-center' : '',
    className,
  ].filter(Boolean).join(' ');

  return <Component className={classes}>{children}</Component>;
};

// Semantic Typography Components

// Hero Text
export const HeroText: React.FC<BaseTypographyProps & { gradient?: boolean }> = ({
  children,
  className = '',
  as = 'h1',
  gradient = true,
}) => (
  <Typography
    as={as}
    size="hero"
    weight="black"
    lineHeight="tight"
    tracking="tight"
    gradient={gradient}
    className={className}
  >
    {children}
  </Typography>
);

// Page Title
export const PageTitle: React.FC<BaseTypographyProps & { gradient?: boolean }> = ({
  children,
  className = '',
  as = 'h1',
  gradient = true,
}) => (
  <Typography
    as={as}
    size="title"
    weight="black"
    lineHeight="tight"
    tracking="tight"
    gradient={gradient}
    className={className}
  >
    {children}
  </Typography>
);

// Section Heading
export const SectionHeading: React.FC<BaseTypographyProps & { gradient?: boolean }> = ({
  children,
  className = '',
  as = 'h2',
  gradient = true,
}) => (
  <Typography
    as={as}
    size="heading"
    weight="bold"
    lineHeight="tight"
    tracking="tight"
    gradient={gradient}
    className={className}
  >
    {children}
  </Typography>
);

// Subsection Heading
export const SubsectionHeading: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  as = 'h3',
}) => (
  <Typography
    as={as}
    size="subheading"
    weight="semibold"
    lineHeight="tight"
    className={`text-white ${className}`}
  >
    {children}
  </Typography>
);

// Card Title
export const CardTitle: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  as = 'h3',
}) => (
  <Typography
    as={as}
    size="cardTitle"
    weight="black"
    lineHeight="tight"
    tracking="tight"
    className={`text-white ${className}`}
  >
    {children}
  </Typography>
);

// Card Subtitle
export const CardSubtitle: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  as = 'p',
}) => (
  <Typography
    as={as}
    size="cardSubtitle"
    weight="normal"
    lineHeight="tight"
    className={`text-gray-300 ${className}`}
  >
    {children}
  </Typography>
);

// Body Text
export const BodyText: React.FC<BaseTypographyProps & { muted?: boolean }> = ({
  children,
  className = '',
  as = 'p',
  muted = false,
}) => (
  <Typography
    as={as}
    size="body"
    weight="normal"
    lineHeight="relaxed"
    className={`${muted ? 'text-gray-400' : 'text-gray-100'} ${className}`}
  >
    {children}
  </Typography>
);

// Small Body Text
export const SmallText: React.FC<BaseTypographyProps & { muted?: boolean }> = ({
  children,
  className = '',
  as = 'p',
  muted = false,
}) => (
  <Typography
    as={as}
    size="bodySmall"
    weight="normal"
    lineHeight="relaxed"
    className={`${muted ? 'text-gray-400' : 'text-gray-300'} ${className}`}
  >
    {children}
  </Typography>
);

// Caption Text
export const CaptionText: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  as = 'span',
}) => (
  <Typography
    as={as}
    size="caption"
    weight="normal"
    lineHeight="normal"
    className={`text-gray-400 ${className}`}
  >
    {children}
  </Typography>
);

// Badge Text
export const BadgeText: React.FC<BaseTypographyProps & { 
  tone?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'amber';
  small?: boolean;
}> = ({
  children,
  className = '',
  as = 'span',
  tone = 'blue',
  small = false,
}) => {
  const toneClasses = {
    blue: 'bg-blue-600/30 text-blue-100 border-blue-500/40',
    green: 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40',
    orange: 'bg-orange-600/30 text-orange-100 border-orange-500/40',
    red: 'bg-red-600/30 text-red-300 border-red-500/40',
    purple: 'bg-purple-600/30 text-purple-300 border-purple-500/40',
    amber: 'bg-amber-600/30 text-amber-300 border-amber-500/40',
  };

  return (
    <Typography
      as={as}
      size={small ? 'badgeSmall' : 'badge'}
      weight="semibold"
      className={`inline-block px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm md:rounded-md border transition-all duration-200 ${toneClasses[tone]} ${className}`}
    >
      {children}
    </Typography>
  );
};

// Button Text
export const ButtonText: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  as = 'span',
}) => (
  <Typography
    as={as}
    size="button"
    weight="semibold"
    className={`text-white ${className}`}
  >
    {children}
  </Typography>
);

// Navigation Text
export const NavText: React.FC<BaseTypographyProps & { active?: boolean }> = ({
  children,
  className = '',
  as = 'span',
  active = false,
}) => (
  <Typography
    as={as}
    size="nav"
    weight="medium"
    className={`${active ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors ${className}`}
  >
    {children}
  </Typography>
);

// Footer Title
export const FooterTitle: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  as = 'h4',
}) => (
  <Typography
    as={as}
    size="footerTitle"
    weight="bold"
    className={`text-white mb-4 ${className}`}
  >
    {children}
  </Typography>
);

// Footer Text
export const FooterText: React.FC<BaseTypographyProps> = ({
  children,
  className = '',
  as = 'p',
}) => (
  <Typography
    as={as}
    size="footerText"
    weight="normal"
    lineHeight="relaxed"
    className={`text-gray-400 ${className}`}
  >
    {children}
  </Typography>
);