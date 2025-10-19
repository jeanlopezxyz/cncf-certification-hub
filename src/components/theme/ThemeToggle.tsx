import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme === 'dark' || (!savedTheme && prefersDark);
    }
    return false;
  });

  // Listen for page navigation to sync state
  useEffect(() => {
    const handlePageLoad = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      setIsDark(shouldBeDark);
    };

    document.addEventListener('astro:page-load', handlePageLoad);
    return () => document.removeEventListener('astro:page-load', handlePageLoad);
  }, []);

  const handleClick = () => {
    console.log('Theme button clicked!');
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply classes
    const html = document.documentElement;
    if (newTheme) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
    
    console.log('Theme changed to:', newTheme ? 'dark' : 'light');
    console.log('HTML classes now:', html.className);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 bg-white/10 dark:bg-gray-700 border border-white/20 dark:border-gray-600 rounded-lg hover:bg-white/20 dark:hover:bg-gray-600 transition-all duration-300 text-blue-100 dark:text-gray-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg className="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isDark ? (
          // Sun icon for light mode
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        ) : (
          // Moon icon for dark mode
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        )}
      </svg>
    </button>
  );
}