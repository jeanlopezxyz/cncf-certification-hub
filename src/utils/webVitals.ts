/**
 * Web Vitals monitoring utility
 * Tracks Core Web Vitals without affecting UI/functionality
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB, type Metric } from 'web-vitals';

interface VitalsData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  timestamp: number;
  url: string;
  userAgent: string;
}

class WebVitalsMonitor {
  private isEnabled: boolean;
  private data: VitalsData[] = [];
  private readonly maxEntries = 100;

  constructor() {
    // Only enable in production or when explicitly enabled
    this.isEnabled = import.meta.env.PROD || import.meta.env.VITE_ENABLE_VITALS === 'true';
  }

  private sendToAnalytics(metric: VitalsData) {
    // In a real app, you would send to your analytics service
    // Examples: Google Analytics, DataDog, New Relic, etc.
    
    if (import.meta.env.DEV) {
      console.log('📊 Web Vital:', metric);
    }

    // Store locally for debugging
    this.data.push(metric);
    
    // Keep only recent entries
    if (this.data.length > this.maxEntries) {
      this.data = this.data.slice(-this.maxEntries);
    }

    // Example: Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_rating: metric.rating,
        custom_parameter_1: metric.delta,
      });
    }

    // Example: Send to custom analytics endpoint
    if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
      fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      }).catch(err => console.warn('Failed to send vitals:', err));
    }
  }

  private handleMetric = (metric: Metric) => {
    if (!this.isEnabled) return;

    const vitalsData: VitalsData = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.sendToAnalytics(vitalsData);
  };

  public init() {
    if (!this.isEnabled || typeof window === 'undefined') return;

    try {
      // Core Web Vitals
      getCLS(this.handleMetric);
      getFID(this.handleMetric);
      getFCP(this.handleMetric);
      getLCP(this.handleMetric);
      getTTFB(this.handleMetric);

      console.log('🚀 Web Vitals monitoring initialized');
    } catch (error) {
      console.warn('Failed to initialize Web Vitals:', error);
    }
  }

  public getMetrics(): VitalsData[] {
    return [...this.data];
  }

  public getAverages() {
    if (this.data.length === 0) return null;

    const grouped = this.data.reduce((acc, metric) => {
      if (!acc[metric.name]) acc[metric.name] = [];
      acc[metric.name].push(metric.value);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(grouped).map(([name, values]) => ({
      name,
      average: values.reduce((sum, val) => sum + val, 0) / values.length,
      count: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
    }));
  }

  public reset() {
    this.data = [];
  }
}

// Singleton instance
export const webVitalsMonitor = new WebVitalsMonitor();

// Auto-initialize when module is loaded
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      webVitalsMonitor.init();
    });
  } else {
    webVitalsMonitor.init();
  }
}