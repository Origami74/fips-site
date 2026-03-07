# Contributing to the FIPS Website

## Getting Started

Clone the repo and verify your setup:

```
git clone https://github.com/fips-network/fips-site.git
cd fips-site
npm install
npm run dev
```

Read the [FIPS protocol repo](https://github.com/fips-network/fips) for background on the project.

## Filing Issues

- Search existing issues before opening a new one.
- For bugs: steps to reproduce, browser/OS, expected vs actual behavior.
- For content corrections: quote the incorrect text and provide the fix.

## Pull Requests

- All PRs must pass `npm run build` and `npm run type-check` with no errors.
- Keep commits focused — one logical change per commit.
- Do not introduce tracking, analytics, or external dependencies without discussion.
- Content changes should follow the site's tone: technical, factual, no marketing language.

## Questions

Open a GitHub issue for design or content questions.

## License

MIT — see [LICENSE](LICENSE).
