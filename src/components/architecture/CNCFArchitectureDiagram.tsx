import React, { useState } from 'react';
import type { Language } from '../../types';
import { getTechIcon } from '../icons/TechIcons';

interface CNCFArchitectureDiagramProps {
  lang: Language;
}

interface TechComponent {
  id: string;
  name: string;
  description: string;
  certifications: string[];
  color: string;
  icon: string;
  url?: string;
}

interface Layer {
  id: string;
  name: string;
  description: string;
  color: string;
  components: TechComponent[];
}

export default function CNCFArchitectureDiagram({ lang }: CNCFArchitectureDiagramProps) {
  const [selectedComponent, setSelectedComponent] = useState<TechComponent | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);


  const architectureLayers: Layer[] = [
    {
      id: 'external',
      name: '🌍 External Systems',
      description: 'Developer tools and visualization platforms',
      color: 'from-slate-500/30 to-slate-600/30',
      components: [
        { id: 'git', name: 'Git Repository', description: 'Source of truth for GitOps workflows', certifications: ['CGOA', 'CAPA'], color: 'from-gray-600 to-gray-700', icon: 'git', url: 'https://git-scm.com' },
        { id: 'backstage', name: 'Backstage', description: 'Developer portals and service catalogs', certifications: ['CBA'], color: 'from-teal-600 to-teal-700', icon: 'portal', url: 'https://backstage.io' },
        { id: 'grafana', name: 'Grafana', description: 'Data visualization and dashboards', certifications: ['PCA'], color: 'from-orange-600 to-orange-700', icon: 'chart', url: 'https://grafana.com' },
      ]
    },
    {
      id: 'observability',
      name: '👀 Observability',
      description: 'Monitoring, metrics, and distributed tracing',
      color: 'from-orange-500/30 to-amber-500/30',
      components: [
        { id: 'opentelemetry', name: 'OpenTelemetry', description: 'Unified observability data collection', certifications: ['OTCA'], color: 'from-amber-600 to-orange-600', icon: 'telemetry', url: 'https://opentelemetry.io' },
        { id: 'prometheus', name: 'Prometheus', description: 'Metrics collection and alerting', certifications: ['PCA'], color: 'from-red-600 to-red-700', icon: 'metrics', url: 'https://prometheus.io' },
        { id: 'jaeger', name: 'Jaeger', description: 'Distributed tracing system', certifications: ['OTCA'], color: 'from-sky-600 to-blue-600', icon: 'tracing', url: 'https://jaegertracing.io' },
      ]
    },
    {
      id: 'security',
      name: '🔒 Security & Policy',
      description: 'Runtime protection and compliance enforcement',
      color: 'from-red-500/30 to-rose-500/30',
      components: [
        { id: 'falco', name: 'Falco', description: 'Runtime threat detection and alerting', certifications: ['CKS'], color: 'from-red-600 to-red-700', icon: 'shield', url: 'https://falco.org' },
        { id: 'kyverno', name: 'Kyverno', description: 'Kubernetes policy engine', certifications: ['KCA'], color: 'from-violet-600 to-purple-600', icon: 'policy', url: 'https://kyverno.io' },
        { id: 'opa', name: 'Open Policy Agent', description: 'Policy-based control and compliance', certifications: ['CKS'], color: 'from-indigo-600 to-indigo-700', icon: 'gavel', url: 'https://openpolicyagent.org' },
      ]
    },
    {
      id: 'platform',
      name: '⚙️ Control Plane',
      description: 'Core Kubernetes management components',
      color: 'from-blue-500/30 to-cyan-500/30',
      components: [
        { id: 'apiserver', name: 'API Server', description: 'Kubernetes API gateway and frontend', certifications: ['CKA', 'CKS'], color: 'from-blue-600 to-blue-700', icon: 'api' },
        { id: 'etcd', name: 'etcd', description: 'Distributed key-value store for cluster state', certifications: ['CKA', 'CKS'], color: 'from-cyan-600 to-cyan-700', icon: 'database', url: 'https://etcd.io' },
        { id: 'scheduler', name: 'Scheduler', description: 'Pod scheduling and resource allocation', certifications: ['CKA'], color: 'from-indigo-600 to-indigo-700', icon: 'calendar' },
      ]
    },
    {
      id: 'workloads',
      name: '📱 Applications',
      description: 'Application workloads and service abstractions',
      color: 'from-emerald-500/30 to-green-500/30',
      components: [
        { id: 'pods', name: 'Pods', description: 'Smallest deployable units containing containers', certifications: ['KCNA', 'CKAD', 'CKA'], color: 'from-emerald-600 to-emerald-700', icon: 'container' },
        { id: 'services', name: 'Services', description: 'Service discovery and load balancing', certifications: ['KCNA', 'CKAD'], color: 'from-teal-600 to-teal-700', icon: 'network' },
        { id: 'deployments', name: 'Deployments', description: 'Declarative application updates', certifications: ['CKAD', 'CKA'], color: 'from-green-600 to-green-700', icon: 'deploy' },
      ]
    },
    {
      id: 'networking',
      name: '🌐 Networking',
      description: 'Cluster networking and inter-service communication',
      color: 'from-yellow-500/30 to-amber-500/30',
      components: [
        { id: 'cilium', name: 'Cilium', description: 'eBPF-based networking and security', certifications: ['CCA'], color: 'from-yellow-600 to-amber-600', icon: 'mesh', url: 'https://cilium.io' },
        { id: 'istio', name: 'Istio', description: 'Service mesh for microservices', certifications: ['ICA'], color: 'from-blue-600 to-indigo-600', icon: 'service-mesh', url: 'https://istio.io' },
        { id: 'envoy', name: 'Envoy Proxy', description: 'High-performance service proxy', certifications: ['ICA'], color: 'from-purple-600 to-violet-600', icon: 'proxy', url: 'https://envoyproxy.io' },
        { id: 'coredns', name: 'CoreDNS', description: 'DNS server for service discovery', certifications: ['CKA'], color: 'from-orange-600 to-red-600', icon: 'dns', url: 'https://coredns.io' },
      ]
    },
    {
      id: 'gitops',
      name: '🔄 GitOps & CI/CD',
      description: 'Continuous delivery and deployment automation',
      color: 'from-violet-500/30 to-purple-500/30',
      components: [
        { id: 'argocd', name: 'Argo CD', description: 'Declarative GitOps continuous delivery', certifications: ['CAPA', 'CGOA'], color: 'from-orange-600 to-red-600', icon: 'gitops', url: 'https://argoproj.github.io/cd/' },
        { id: 'flux', name: 'Flux', description: 'GitOps toolkit for Kubernetes', certifications: ['CGOA'], color: 'from-blue-600 to-indigo-600', icon: 'flow', url: 'https://fluxcd.io' },
        { id: 'tekton', name: 'Tekton', description: 'Kubernetes-native CI/CD pipelines', certifications: ['CGOA'], color: 'from-red-600 to-pink-600', icon: 'pipeline', url: 'https://tekton.dev' },
      ]
    }
  ];

  return (
    <div className="bg-blue-50 dark:bg-[#130F25] min-h-screen rounded-2xl overflow-hidden shadow-lg">
      <div className="flex">
        {/* Left Sidebar - Cursalab Style */}
        <div className="w-64 bg-[#1E50D9] dark:bg-[#242145] p-6">
          <div className="mb-8">
            <h2 className="text-white font-bold text-2xl mb-2">Technology Stack</h2>
            <p className="text-blue-200 text-sm">Explore CNCF technologies by layer</p>
          </div>
          
          {/* Layer Navigation */}
          <div className="space-y-2">
            <button
              onClick={() => setSelectedLayer(null)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                selectedLayer === null 
                  ? 'bg-white/20 text-white font-semibold' 
                  : 'text-blue-100 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">🎯</span>
              <span>All Technologies</span>
            </button>
            
            {architectureLayers.map(layer => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  selectedLayer === layer.id
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{layer.name.split(' ')[0]}</span>
                <span>{layer.name.replace(/^[^\s]+ /, '')}</span>
                <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                  {layer.components.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area - Cursalab Style */}
        <div className="flex-1 bg-blue-50 dark:bg-[#130F25]">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {selectedLayer 
                  ? architectureLayers.find(l => l.id === selectedLayer)?.name 
                  : 'CNCF Technology Ecosystem'
                }
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedLayer 
                  ? architectureLayers.find(l => l.id === selectedLayer)?.description
                  : 'Interactive overview of all Cloud Native technologies'
                }
              </p>
            </div>

            {/* Technology Grid - Cursalab Card Style */}
            <div className="space-y-3">
              {architectureLayers
                .filter(layer => !selectedLayer || layer.id === selectedLayer)
                .flatMap(layer => layer.components)
                .map(component => (
                <div 
                  key={component.id}
                  className="bg-blue-100 dark:bg-gray-700 rounded-xl border border-blue-200 dark:border-gray-600 p-6 hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedComponent(component)}
                >
                  <div className="flex items-start gap-4">
                    {/* Technology Icon */}
                    <div className={`w-14 h-14 bg-gradient-to-br ${component.color} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}>
                      {getTechIcon(component.icon, "w-8 h-8 text-white")}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                          {component.name}
                        </h3>
                        {component.url && (
                          <div className="w-8 h-8 bg-blue-200 dark:bg-gray-600 rounded-lg flex items-center justify-center group-hover:bg-blue-300 dark:group-hover:bg-blue-800 transition-colors">
                            <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-blue-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                        {component.description}
                      </p>
                      
                      {/* Certification Pills */}
                      <div className="flex flex-wrap gap-2">
                        {component.certifications.map(cert => (
                          <span
                            key={cert}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal mantiene funcionalidad original */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-blue-50 dark:bg-gray-800 rounded-2xl p-6 border border-blue-200 dark:border-gray-600 max-w-lg w-full shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedComponent.color} rounded-xl flex items-center justify-center shadow-md`}>
                  {getTechIcon(selectedComponent.icon, "w-8 h-8 text-white")}
                </div>
                <div>
                  <h3 className="text-blue-900 dark:text-gray-100 font-bold text-xl">{selectedComponent.name}</h3>
                  <p className="text-blue-700 dark:text-gray-300 text-sm">{selectedComponent.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedComponent(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <h4 className="text-blue-800 dark:text-gray-300 font-medium mb-2">Certifications:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedComponent.certifications.map(cert => (
                  <span key={cert} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700 font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {selectedComponent.url && (
              <a
                href={selectedComponent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Visit Official Site
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}