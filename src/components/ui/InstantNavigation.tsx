import { useEffect } from 'react';

export const InstantNavigation: React.FC = () => {
  useEffect(() => {
    // Preload all navigation links on hover
    const handleLinkHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.hostname === window.location.hostname) {
        // Preload the page
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.href = link.href;
        document.head.appendChild(linkElement);
        
        // Remove after 5 seconds to avoid clutter
        setTimeout(() => {
          if (document.head.contains(linkElement)) {
            document.head.removeChild(linkElement);
          }
        }, 5000);
      }
    };

    // Add hover listeners to all links
    document.addEventListener('mouseover', handleLinkHover, { passive: true });
    
    // Also preload critical pages
    const criticalPages = ['/es/', '/es/achievements/kubestronaut', '/es/achievements/golden-kubestronaut'];
    criticalPages.forEach(page => {
      const linkElement = document.createElement('link');
      linkElement.rel = 'prefetch';
      linkElement.href = page;
      document.head.appendChild(linkElement);
    });

    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, []);

  return null;
};

export default InstantNavigation;