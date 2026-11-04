# Contributing to Knowledge Hub

Thank you for contributing to Knowledge Hub! We welcome PRs for new topics, fact updates, typo fixes, and roadmap enhancements.

---

## Quickstart

1. Fork this repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/knowledge-hub.git
   cd knowledge-hub
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start local development server:
   ```bash
   npm run dev
   ```
5. Test static build before opening a PR:
   ```bash
   npm run build
   ```

---

## Pull Request Checklist

- [ ] Topic added to `src/data/topics.ts` following `CONTENT_GUIDE.md`
- [ ] At least one primary source provided in `sources` array
- [ ] Exactly 3 to 5 bullet points in `tldr`
- [ ] Code examples tested and syntax-highlighted
- [ ] Zero broken links in resources
- [ ] `npm run build` exits with code 0
