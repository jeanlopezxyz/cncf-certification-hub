// Theme initialization script for maximum performance
(function() {
  'use strict';
  
  // Immediately apply theme to prevent flash
  function applyTheme() {
    try {
      const savedTheme = localStorage.getItem('theme') || '';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      // Apply theme class
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(shouldBeDark ? 'dark' : 'light');
      
      // Set CSS custom properties
      const root = document.documentElement;
      const themeVars = {
        '--bg-primary': shouldBeDark ? '#0a0b1e' : '#fff',
        '--text-primary': shouldBeDark ? '#f8fafc' : '#111827',
        '--bg-secondary': shouldBeDark ? '#141328' : '#f8fafc',
        '--bg-tertiary': shouldBeDark ? '#1e1b3a' : '#f1f5f9',
        '--border': shouldBeDark ? '#334155' : '#e5e7eb'
      };
      
      // Apply all theme variables at once
      Object.entries(themeVars).forEach(([prop, value]) => {
        root.style.setProperty(prop, value);
      });
      
      // Show content after theme is applied
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.classList.add('visible');
        });
      });
      
    } catch (error) {
      console.error('Theme initialization failed:', error);
      // Fallback: show content immediately
      document.documentElement.classList.add('visible');
    }
  }
  
  // Apply theme immediately
  applyTheme();
  
  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', applyTheme);
  } else {
    // Fallback for older browsers
    mediaQuery.addListener(applyTheme);
  }
  
  // Listen for storage changes (sync across tabs)
  window.addEventListener('storage', applyTheme);
})();