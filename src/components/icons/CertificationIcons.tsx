interface IconProps {
  className?: string;
}

// Kubernetes certifications
export const KubernetesIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.1L3.1 6.9v10.2L12 21.9l8.9-4.8V6.9L12 2.1zM12 4.2l6.9 3.7v8.2L12 19.8l-6.9-3.7V7.9L12 4.2z"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M10.5 7.5l3 1.5v3l-3 1.5-3-1.5v-3z"/>
  </svg>
);

// Prometheus/Observability
export const PrometheusIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
    <circle cx="12" cy="8" r="1.5"/>
    <rect x="11" y="10" width="2" height="6" rx="1"/>
    <circle cx="8" cy="16" r="1"/>
    <circle cx="16" cy="16" r="1"/>
  </svg>
);

// Istio/Service Mesh
export const ServiceMeshIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3l7 4v10l-7 4-7-4V7l7-4zm0 2.2L7.5 8v8L12 18.8 16.5 16V8L12 5.2z"/>
    <circle cx="12" cy="12" r="1.5"/>
    <circle cx="8" cy="8" r="1"/>
    <circle cx="16" cy="8" r="1"/>
    <circle cx="8" cy="16" r="1"/>
    <circle cx="16" cy="16" r="1"/>
    <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="0.5" fill="none"/>
  </svg>
);

// Argo/GitOps
export const GitOpsIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.5 3.8v7L12 19.8 4.5 15v-7L12 4.2z"/>
    <path d="M8 10v4l4-2 4 2v-4l-4-2-4 2z"/>
    <circle cx="8" cy="12" r="1"/>
    <circle cx="16" cy="12" r="1"/>
    <circle cx="12" cy="8" r="1"/>
    <circle cx="12" cy="16" r="1"/>
  </svg>
);

// Cilium/Networking
export const NetworkingIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="6" cy="6" r="2"/>
    <circle cx="18" cy="6" r="2"/>
    <circle cx="6" cy="18" r="2"/>
    <circle cx="18" cy="18" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M8 6h8M6 8v8M16 8v8M8 18h8"/>
    <path d="M8 8l6 6M16 8l-6 6"/>
  </svg>
);

// Backstage/Platform
export const PlatformIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="6" y="6" width="4" height="3" rx="1"/>
    <rect x="14" y="6" width="4" height="3" rx="1"/>
    <rect x="6" y="12" width="12" height="3" rx="1"/>
    <rect x="6" y="17" width="6" height="2" rx="1"/>
    <rect x="14" y="17" width="4" height="2" rx="1"/>
  </svg>
);

// Kyverno/Security
export const SecurityIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-8-4z"/>
    <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
);

// OpenTelemetry/Observability
export const ObservabilityIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
    <path d="M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>
  </svg>
);

// Linux Foundation
export const LinuxIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="2" y="4" width="20" height="4" rx="2"/>
    <circle cx="6" cy="10" r="1"/>
    <circle cx="10" cy="10" r="1"/>
    <circle cx="14" cy="10" r="1"/>
    <rect x="4" y="13" width="16" height="1" rx="0.5"/>
    <rect x="4" y="15" width="12" height="1" rx="0.5"/>
    <rect x="4" y="17" width="8" height="1" rx="0.5"/>
  </svg>
);

// Get icon by certification ID
export const getCertificationIcon = (certId: string, className?: string) => {
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    // Kubernetes
    'cka': KubernetesIcon,
    'ckad': KubernetesIcon,
    'cks': SecurityIcon, // Security-focused
    'kcna': KubernetesIcon,
    'kcsa': SecurityIcon, // Security-focused
    
    // Observability
    'pca': PrometheusIcon,
    'otca': ObservabilityIcon,
    
    // Service Mesh
    'ica': ServiceMeshIcon,
    
    // GitOps
    'capa': GitOpsIcon,
    'cgoa': GitOpsIcon,
    
    // Networking
    'cca': NetworkingIcon,
    
    // Platform
    'cba': PlatformIcon,
    'cnpa': PlatformIcon,
    
    // Security
    'kca': SecurityIcon,
    
    // Linux
    'lfcs': LinuxIcon,
  };

  const IconComponent = iconMap[certId] || KubernetesIcon; // Default to Kubernetes
  return <IconComponent className={className} />;
};

// Progress indicator component
export const ProgressIndicator = ({ 
  progress, 
  className = "w-full h-2", 
  showPercentage = false 
}: { 
  progress: number; 
  className?: string; 
  showPercentage?: boolean;
}) => (
  <div className="space-y-1">
    <div className={`bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
    {showPercentage && (
      <div className="text-xs text-gray-400 text-center">
        {Math.round(progress)}% Complete
      </div>
    )}
  </div>
);