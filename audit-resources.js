#!/usr/bin/env node

/**
 * CNCF Certification Hub - Resource Audit Tool
 * Validates URLs and analyzes resource completeness across all certifications
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import certification data
const certsPath = path.join(__dirname, 'src/data/certifications');
const certificationFiles = [
  'cka', 'ckad', 'cks', 'kcna', 'kcsa', 'pca', 'ica', 'cca', 
  'capa', 'cgoa', 'lfcs', 'kca', 'otca', 'cba', 'cnpa'
];

// Standard resource categories expected for each certification type
const EXPECTED_RESOURCE_CATEGORIES = {
  'performance': ['official', 'github', 'practice', 'books', 'courses', 'videos', 'documentation', 'communities'],
  'multiple-choice': ['official', 'github', 'practice', 'books', 'courses', 'videos', 'documentation', 'communities', 'tools']
};

// Critical resources that should be present for all certifications
const CRITICAL_RESOURCES = ['official', 'github', 'practice'];

class ResourceAuditor {
  constructor() {
    this.results = {
      certifications: {},
      urlValidation: {},
      summary: {
        totalCertifications: 0,
        totalUrls: 0,
        validUrls: 0,
        invalidUrls: 0,
        timeoutUrls: 0,
        missingCategories: {},
        standardizationIssues: []
      }
    };
  }

  async loadCertification(certId) {
    try {
      const certModule = await import(`./src/data/certifications/${certId}.js`);
      return certModule[certId];
    } catch (error) {
      console.error(`Error loading ${certId}:`, error.message);
      return null;
    }
  }

  async validateUrl(url, timeout = 10000) {
    return new Promise((resolve) => {
      try {
        const parsedUrl = new URL(url);
        const client = parsedUrl.protocol === 'https:' ? https : http;
        
        const req = client.request(parsedUrl, {
          method: 'HEAD',
          timeout: timeout,
          headers: {
            'User-Agent': 'CNCF-Certification-Hub-Audit/1.0'
          }
        }, (res) => {
          const status = res.statusCode;
          resolve({
            url,
            status,
            valid: status >= 200 && status < 400,
            redirected: status >= 300 && status < 400,
            finalUrl: res.headers.location || url
          });
        });

        req.on('error', (error) => {
          resolve({
            url,
            status: 0,
            valid: false,
            error: error.message
          });
        });

        req.on('timeout', () => {
          req.destroy();
          resolve({
            url,
            status: 0,
            valid: false,
            error: 'Request timeout'
          });
        });

        req.end();
      } catch (error) {
        resolve({
          url,
          status: 0,
          valid: false,
          error: error.message
        });
      }
    });
  }

  extractUrlsFromResources(resources) {
    const urls = [];
    
    // Official URL
    if (resources.official) {
      urls.push(resources.official);
    }
    
    // GitHub URLs
    if (resources.github && Array.isArray(resources.github)) {
      urls.push(...resources.github);
    }
    
    // Practice URLs
    if (resources.practice && Array.isArray(resources.practice)) {
      urls.push(...resources.practice);
    }
    
    // Extract URLs from structured resources
    const structuredCategories = ['books', 'courses', 'videos', 'documentation', 'communities', 'tools', 'blogs'];
    
    structuredCategories.forEach(category => {
      if (resources[category] && Array.isArray(resources[category])) {
        resources[category].forEach(resource => {
          if (resource.url) {
            urls.push(resource.url);
          }
        });
      }
    });
    
    return urls;
  }

  analyzeResourceCompleteness(cert) {
    const analysis = {
      id: cert.id,
      name: cert.name,
      type: cert.type,
      level: cert.level,
      resources: cert.resources,
      completeness: {},
      issues: [],
      recommendations: []
    };

    const expectedCategories = EXPECTED_RESOURCE_CATEGORIES[cert.type] || EXPECTED_RESOURCE_CATEGORIES['multiple-choice'];
    
    // Check for missing critical resources
    CRITICAL_RESOURCES.forEach(category => {
      if (!cert.resources[category] || 
          (Array.isArray(cert.resources[category]) && cert.resources[category].length === 0)) {
        analysis.issues.push(`Missing critical resource category: ${category}`);
        analysis.recommendations.push(`Add ${category} resources`);
      }
    });

    // Check completeness of each expected category
    expectedCategories.forEach(category => {
      const hasCategory = cert.resources.hasOwnProperty(category);
      const isEmpty = !cert.resources[category] || 
                     (Array.isArray(cert.resources[category]) && cert.resources[category].length === 0);
      
      analysis.completeness[category] = {
        present: hasCategory,
        populated: hasCategory && !isEmpty,
        count: Array.isArray(cert.resources[category]) ? cert.resources[category].length : (cert.resources[category] ? 1 : 0)
      };
      
      if (!hasCategory || isEmpty) {
        analysis.issues.push(`${hasCategory ? 'Empty' : 'Missing'} resource category: ${category}`);
        analysis.recommendations.push(`Add ${category} resources for ${cert.name}`);
      }
    });

    // Analyze resource quality and diversity
    const totalUrls = this.extractUrlsFromResources(cert.resources).length;
    analysis.totalResources = totalUrls;
    
    if (totalUrls < 10) {
      analysis.issues.push('Insufficient resource diversity - fewer than 10 total resources');
      analysis.recommendations.push('Add more diverse study resources');
    }

    return analysis;
  }

  async auditCertification(certId) {
    console.log(`Auditing ${certId.toUpperCase()}...`);
    
    const cert = await this.loadCertification(certId);
    if (!cert) {
      return null;
    }

    const analysis = this.analyzeResourceCompleteness(cert);
    const urls = this.extractUrlsFromResources(cert.resources);
    
    // Validate URLs
    console.log(`  Validating ${urls.length} URLs...`);
    const urlValidations = await Promise.all(
      urls.map(url => this.validateUrl(url))
    );

    analysis.urlValidation = urlValidations;
    analysis.validUrls = urlValidations.filter(v => v.valid).length;
    analysis.invalidUrls = urlValidations.filter(v => !v.valid).length;

    // Track invalid URLs
    urlValidations.filter(v => !v.valid).forEach(validation => {
      this.results.urlValidation[validation.url] = validation;
    });

    return analysis;
  }

  async runCompleteAudit() {
    console.log('Starting comprehensive CNCF Certification Hub resource audit...\n');
    
    for (const certId of certificationFiles) {
      const analysis = await this.auditCertification(certId);
      if (analysis) {
        this.results.certifications[certId] = analysis;
        this.results.summary.totalCertifications++;
        this.results.summary.totalUrls += analysis.totalResources;
        this.results.summary.validUrls += analysis.validUrls;
        this.results.summary.invalidUrls += analysis.invalidUrls;
      }
      
      // Add delay to be respectful to servers
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.generateSummaryReport();
    this.generateDetailedReport();
    
    return this.results;
  }

  generateSummaryReport() {
    const { summary } = this.results;
    
    console.log('\n=== AUDIT SUMMARY ===');
    console.log(`Total Certifications: ${summary.totalCertifications}`);
    console.log(`Total URLs Checked: ${summary.totalUrls}`);
    console.log(`Valid URLs: ${summary.validUrls} (${((summary.validUrls / summary.totalUrls) * 100).toFixed(1)}%)`);
    console.log(`Invalid URLs: ${summary.invalidUrls} (${((summary.invalidUrls / summary.totalUrls) * 100).toFixed(1)}%)`);
    
    // Most problematic certifications
    const problematicCerts = Object.entries(this.results.certifications)
      .filter(([id, cert]) => cert.issues.length > 3)
      .sort(([,a], [,b]) => b.issues.length - a.issues.length);
    
    if (problematicCerts.length > 0) {
      console.log('\n=== CERTIFICATIONS NEEDING ATTENTION ===');
      problematicCerts.slice(0, 5).forEach(([id, cert]) => {
        console.log(`${id.toUpperCase()}: ${cert.issues.length} issues, ${cert.invalidUrls} broken URLs`);
      });
    }
  }

  generateDetailedReport() {
    const reportPath = path.join(__dirname, 'resource-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\nDetailed report saved to: ${reportPath}`);
  }
}

// Run the audit
if (import.meta.url === `file://${process.argv[1]}`) {
  const auditor = new ResourceAuditor();
  auditor.runCompleteAudit().catch(console.error);
}

export default ResourceAuditor;