import { useEffect } from 'react';

export const useThemeSync = () => {
  useEffect(() => {
    // Sync theme across localStorage and DOM
    const syncTheme = () => {
      const savedTheme = localStorage.getItem('theme') || '';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      // Apply theme immediately
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(shouldBeDark ? 'dark' : 'light');
      
      // Set CSS properties
      const root = document.documentElement;
      root.style.setProperty('--bg-primary', shouldBeDark ? '#0a0b1e' : '#fff');
      root.style.setProperty('--text-primary', shouldBeDark ? '#f8fafc' : '#111827');
      root.style.setProperty('--bg-secondary', shouldBeDark ? '#141328' : '#f8fafc');
      root.style.setProperty('--bg-tertiary', shouldBeDark ? '#1e1b3a' : '#f1f5f9');
      root.style.setProperty('--border', shouldBeDark ? '#334155' : '#e5e7eb');
      
      // Ensure visibility
      if (!document.documentElement.classList.contains('visible')) {
        document.documentElement.classList.add('visible');
      }
    };

    // Sync immediately
    syncTheme();
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', syncTheme);
    
    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', syncTheme);
    
    return () => {
      mediaQuery.removeEventListener('change', syncTheme);
      window.removeEventListener('storage', syncTheme);
    };
  }, []);
};

export default useThemeSync;