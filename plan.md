# React App Improvement Plan

## 1. Code Quality & Structure

- [ ] Replace all `any` types with explicit types in helper functions (e.g., `getIngredientCount`)
- [ ] Enable stricter TypeScript settings (`noImplicitAny`, `strictNullChecks`)
- [ ] Add unit/component tests (suggest: React Testing Library + Vitest)
- [ ] Ensure all components are functionally pure and stateless where possible

## 2. UI/UX

- [ ] Audit all interactive elements for keyboard accessibility
- [ ] Add visible focus indicators for all focusable elements
- [ ] Consider adding a dark mode toggle
- [ ] Review mobile responsiveness on multiple devices

## 3. Accessibility (a11y)

- [ ] Integrate automated accessibility checks (axe-core, Lighthouse CI)
- [ ] Ensure color contrast meets WCAG AA/AAA standards
- [ ] Use semantic HTML elements for structure (e.g., <nav>, <main>, <section>)
- [ ] Add ARIA roles/labels where appropriate

## 4. Performance

- [ ] Implement code splitting/lazy loading for recipe detail pages
- [ ] Optimize images (responsive sizes, lazy loading)
- [ ] Audit bundle size and dependencies (remove unused packages)
- [ ] Add performance budgets to Vite config

## 5. Documentation

- [ ] Add English summary to `react-app/README.md`
- [ ] Document accessibility and performance practices
- [ ] Add instructions for running lint, format, and test scripts

## 6. Testing & CI

- [ ] Add test scripts to `package.json`
- [ ] Set up CI for linting, testing, and accessibility checks

---

**Prioritization:**

1. Code quality & accessibility (critical for public users)
2. Performance optimizations
3. Documentation & testing

**Next Steps:**

- Review and approve this plan
- Implement improvements in prioritized order
- Validate each change with lint, test, and a11y tools
