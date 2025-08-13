interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
}

/**
 * Reusable sidebar link component
 */
export default function SidebarLink({
  href,
  children,
  className = '',
  external = false,
  onClick,
}: SidebarLinkProps) {
  const baseClasses =
    'block text-sm text-gray-400 hover:text-blue-400 hover:bg-slate-800/20 transition-all duration-200 py-1.5 px-2 rounded-lg';
  const combinedClasses = `${baseClasses} ${className}`;

  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        'data-astro-reload': true,
      }
    : {};

  const handleClick = (_e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <a href={href} className={combinedClasses} onClick={handleClick} {...externalProps}>
      {children}
    </a>
  );
}
