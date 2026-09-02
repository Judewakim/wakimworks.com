# WakimWorks LLC

Cloud security and software development for the insurance industry.

**[wakimworks.com](https://wakimworks.com)**

---

## What we do

WakimWorks builds software for independent insurance agents, and secures the
cloud infrastructure it runs on.

The work sits in one industry on purpose. Insurance runs on other people's
health records, financial details and personal data, under real regulatory
obligation — so security isn't a separate product line here, it's a condition
of building anything at all.

## Products

### The Arsenal

The whole life insurance job on one screen. A single workspace for independent
agents rather than six tabs and a spreadsheet: CRM, KPIs, calendar, scripts,
medical research, carrier reference, an underwriting advisory engine, agency
management and call workflow.

→ [The Arsenal](https://main.dgalf4vmbgbwk.amplifyapp.com/landing/)

### VerifyAnAgent

A professional, verified web presence for insurance agents and brokers, live
before the first call. Direct links to government records, attached state
licenses, visual customization, public SEO visibility, contact methods and a
shareable link — built in minutes.

→ [verifyanagent.com](https://verifyanagent.com)

## Services

- **Cloud security engineering** — AWS architecture and review, S3 posture
  management, HIPAA-oriented compliance work
- **Software development** — product design and build, primarily for insurance

## Contact

**Jude Wakim** — cloud security engineer and 2-15 licensed insurance broker

- Email — [judewakim@wakimworks.com](mailto:judewakim@wakimworks.com)
- LinkedIn — [jude-wakim](https://linkedin.com/in/jude-wakim)
- GitHub — [@judewakim](https://github.com/judewakim)

---

## About this repository

Source for [wakimworks.com](https://wakimworks.com) — a static single-page site
with no build step. Hand-authored HTML and CSS; whatever is committed is
byte-for-byte what gets served.

Pushes to `main` deploy to S3 through GitHub Actions
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). `README.md`,
`docs/` and `unused/` are excluded from the sync.

Stylesheets and scripts carry a version in the filename (`styles.v5.css`,
`main.v3.js`) so a changed file always gets a fresh URL — **bump the version
when you change one.** Favicons are the deliberate exception: those filenames
must stay stable so Google can keep resolving the icon between crawls.
