/**
 * Sidebar Context to eliminate prop drilling
 * Centralizes sidebar state and navigation logic
 */

import React, { createContext, useContext, ReactNode } from 'react';
import type { Language } from '../types';

interface SidebarContextType {
  lang: Language;
  currentPath: string;
  isHomePage: boolean;
  basePath: string;
  onLinkClick: (url: string) => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

interface SidebarProviderProps {
  children: ReactNode;
  value: SidebarContextType;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  value,
}) => {
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

// Convenience hook for navigation
export const useSidebarNavigation = () => {
  const { currentPath, onLinkClick, closeMobile } = useSidebarContext();
  
  const isActiveLink = (linkPath: string): boolean => {
    const normalizedCurrent = currentPath.replace(/^\/+|\/+$/g, '');
    const normalizedLink = linkPath.replace(/^\/+|\/+$/g, '');
    
    return normalizedCurrent === normalizedLink || 
           normalizedCurrent.startsWith(normalizedLink + '/');
  };

  const handleLinkClick = (url: string, shouldCloseMobile: boolean = true) => {
    onLinkClick(url);
    if (shouldCloseMobile) {
      closeMobile();
    }
  };

  return {
    isActiveLink,
    handleLinkClick,
    currentPath,
  };
};

// Hook for sidebar state (to be used by main Sidebar component)
export const useSidebarState = () => {
  // This would contain the state logic that's currently in Sidebar.tsx
  // For now, returning empty object to maintain compatibility
  return {};
};