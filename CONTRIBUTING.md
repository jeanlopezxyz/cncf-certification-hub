# Contributing to CNCF Certification Resources Hub

We welcome contributions from the community! This project aims to help CNCF certification seekers with study resources and progress tracking.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 8+
- Git

### Setup
```bash
git clone https://github.com/jeanlopezxyz/cncf-certification-hub.git
cd cncf-certification-hub
npm install --legacy-peer-deps
npm run dev
```

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality (run before submitting PR)
npm run validate         # Run all checks (TypeScript + ESLint + Prettier)
npm run prepare-pr       # Full validation + build test
npm run lint             # Check code with ESLint  
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted
npm run typecheck        # TypeScript type checking
```

## 📋 How to Contribute

### Adding Study Resources

Want to add tutorials, documentation, or study materials for any certification? Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b add-resources-kcna`
3. **Edit the certification file** in `src/data/certifications/[cert-name].ts`
4. **Run validation**: `npm run prepare-pr`
5. **Submit a Pull Request**

### Code Contribution Workflow

1. **Fork & Clone**
2. **Create branch**: `git checkout -b feature/your-feature-name`
3. **Make changes**
4. **Run validation**: `npm run validate`
5. **Test build**: `npm run build`
6. **Commit**: Follow [conventional commits](https://conventionalcommits.org/)
7. **Push & create PR**

## 🔍 Pull Request Process

1. **All PRs are automatically tested** by our CI pipeline:
   - ✅ Code quality (ESLint + Prettier)
   - ✅ TypeScript compilation  
   - ✅ Build success
   - ✅ Security scanning
   - ✅ Link validation
   - ✅ Performance testing

2. **PR Requirements:**
   - All CI checks must pass ✅
   - Code must be formatted with Prettier
   - No ESLint errors or warnings
   - TypeScript must compile without errors
   - Include description of changes

3. **Review Process:**
   - Maintainers will review within 48 hours
   - Address feedback promptly
   - PRs auto-deploy to preview environment

## ✅ Contribution Guidelines

### Code Style
- **TypeScript**: Use strict typing, avoid `any`
- **React**: Functional components with hooks
- **Formatting**: Prettier handles formatting automatically
- **Naming**: Use camelCase for variables, PascalCase for components
- **Imports**: Absolute imports from `src/` root

### Content Guidelines  
- Ensure resources are **free** or clearly marked if paid
- Verify links are **working and relevant**  
- Add resources in the **appropriate category**
- Use clear, concise descriptions
- Check for duplicates before adding

### Commit Messages
Follow [Conventional Commits](https://conventionalcommits.org/):
```
feat: add CKAD study resources
fix: correct broken link in CKA resources  
docs: update contributing guide
style: format certification data files
```

## 🚨 Getting Help

### Common Issues
- **Dependency conflicts**: Use `npm install --legacy-peer-deps`
- **Build fails**: Run `npm run clean` then `npm run build`
- **Linting errors**: Run `npm run lint:fix`
- **Format issues**: Run `npm run format`

### Support Channels
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/jeanlopezxyz/cncf-certification-hub/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/jeanlopezxyz/cncf-certification-hub/discussions)
- 📧 **Direct Contact**: jeanlopez@linux.com

## 🎯 Project Roadmap

### Current Focus
- [ ] Add more certification resources
- [ ] Improve accessibility (WCAG 2.1)
- [ ] Performance optimizations
- [ ] Mobile experience enhancements

### Future Goals
- [ ] Interactive study paths
- [ ] Progress tracking across devices
- [ ] Community-contributed practice exams
- [ ] Integration with certification providers

## 🏆 Recognition

Contributors are recognized in:
- GitHub contributors list
- Project README
- Release notes for significant contributions

## 📜 Code of Conduct

Be respectful, inclusive, and constructive. We follow the [CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).

---

Thank you for contributing to the CNCF community! 🚀

**Made with ❤️ for the Cloud Native Community**