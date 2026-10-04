# Healthcare Location Landing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish eight distinct doctor/clinic and hospital marketing landing pages for Dwarka, NSP, Vasant Vihar, and Delhi-wide.

**Architecture:** Keep content in a typed data module, render it through a shared server component, and expose eight explicit static Next.js route files with route-specific metadata and JSON-LD. Extend sitemap and existing healthcare/location hubs with contextual links; validate the content module and sitemap with the repository's Bun test runner.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Bun test, existing schema helpers.

**Spec:** `docs/superpowers/specs/2026-10-04-healthcare-location-pages-design.md`

## Global Constraints

- Create eight root-level URLs exactly as listed in the spec.
- Each page must have distinct audience- and location-specific content, metadata, canonical URL, and one clear H1.
- Describe requested geographies as service areas, not SOCIAL VIENS offices.
- Do not invent client counts, rankings, conversion percentages, case studies, testimonials, guarantees, regulatory approvals, or a local office.
- Do not promise medical outcomes.
- Do not add a dependency or use doctor/hospital medical-provider schema for SOCIAL VIENS.
- FAQ schema is emitted only when the same FAQs are visible on the page.

## Review Focus

- Duplicate or mismatched slugs, audience and geography: assert all eight exact combinations and uniqueness in the data test.
- Thin or templated location copy: assert distinct title, description, hero, overview, and FAQs across the eight entries; manually review substance before build.
- Canonical or JSON-LD URL/service-area mismatch: test metadata and Service helper, then inspect rendered output for representative doctor and hospital routes.
- Missing/duplicate sitemap URLs: invoke sitemap and assert every expected path occurs exactly once.
- Internal links imply offices or nonexistent routes: assert new href targets correspond to data slugs and manually inspect updated hubs.

---

### Task 1: Define and test healthcare-location content

**Files:**
- Create: `src/lib/healthcare-location-data.ts`
- Test: `tests/healthcare-location-pages.test.ts`

**Interfaces:**
- Produces: `HealthcareAudience`, `HealthcareLocation`, `HealthcareLocationPage`, `healthcareLocationPages`, `getHealthcareLocationBySlug(slug: string): HealthcareLocationPage | undefined`.
- `HealthcareLocationPage` includes `slug`, `audience`, `location`, `locationLabel`, `title`, `h1`, `targetKeyword`, `metaTitle`, `metaDescription`, `heroSubtitle`, `overviewTitle`, `overviewText`, `services`, `processSteps`, `faqs`, and `relatedSlugs`.

- [ ] **Step 1: Write the failing data tests**

Add Bun tests asserting eight exact route slugs, unique slugs and canonicals, four doctor/clinic plus four hospital records, one entry for each audience/location pair, nonempty distinct metadata and copy fields, and valid `relatedSlugs`.

- [ ] **Step 2: Run tests and confirm failure**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: FAIL because the module and entries do not exist.

- [ ] **Step 3: Implement typed data and eight entries**

Write distinct buyer-focused copy for the four geographies and two audiences. Treat NSP as Netaji Subhash Place. Include no invented performance proof points, fake testimonials, local-office claims, or outcome promises. Keep related slugs within the eight-page set.

- [ ] **Step 4: Run tests and confirm pass**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: PASS for every slug, pair, field, uniqueness, and relation assertion.

### Task 2: Add shared server-rendered page and SEO helpers

**Files:**
- Create: `src/components/HealthcareLocationPage.tsx`
- Create: `src/lib/healthcare-location-seo.ts`
- Modify: `tests/healthcare-location-pages.test.ts`

**Interfaces:**
- Consumes: `HealthcareLocationPage` and `SITE_URL`, `generateFAQSchema`, `generateBreadcrumbSchema`.
- Produces: `generateHealthcareLocationMetadata(page: HealthcareLocationPage): Metadata`; `generateHealthcareServiceSchema(page: HealthcareLocationPage)` with canonical URL and exact service area but no Offer; a shared `HealthcareLocationPageView({ page }: { page: HealthcareLocationPage })` server component.

- [ ] **Step 1: Add failing SEO-helper tests**

Assert canonical path, page-specific title/description, Open Graph title/description, Service URL and area served, and breadcrumb path for a doctor route and hospital route. Assert the Service schema has no Offer and no medical-provider schema type is used.

- [ ] **Step 2: Run tests and confirm failure**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: FAIL because the SEO helper does not exist.

- [ ] **Step 3: Implement helper and server component**

Build semantic, crawlable HTML with one H1, audience-specific service sections, process, visible FAQs, contextual related links, and contact/WhatsApp CTAs using established site patterns. Render JSON-LD only for visible content. Build accurate Service JSON-LD directly rather than using the existing generator that imposes an unrelated `/services/` URL and a required starting price.

- [ ] **Step 4: Run tests and confirm pass**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: PASS for metadata and schema assertions.

### Task 3: Wire explicit static routes and sitemap

**Files:**
- Create: eight `src/app/{slug}/page.tsx` files for the exact slugs in the spec
- Modify: `src/app/sitemap.ts`
- Modify: `tests/healthcare-location-pages.test.ts`

**Interfaces:**
- Consumes: `getHealthcareLocationBySlug`, `generateHealthcareLocationMetadata`, `HealthcareLocationPageView`, and `healthcareLocationPages`.

- [ ] **Step 1: Add failing sitemap test**

Invoke `sitemap()` and assert all eight canonical paths are included exactly once.

- [ ] **Step 2: Run tests and confirm failure**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: FAIL because no new sitemap entries are present.

- [ ] **Step 3: Add the eight static routes and sitemap entries**

Each route exports `generateMetadata()` using its fixed slug and renders the shared server component. Append the data-driven URLs to `src/app/sitemap.ts`; update its URL-count comment without changing unrelated entries.

- [ ] **Step 4: Run tests and confirm pass**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: PASS; every expected URL appears once.

### Task 4: Add useful contextual navigation

**Files:**
- Create: `src/components/HealthcareLocationLinks.tsx`
- Modify: `src/components/IndustryLandingPage.tsx`
- Modify: `src/app/niches/doctors-clinics/DoctorsClinicsClient.tsx`
- Modify: `src/app/locations/delhi-ncr/DelhiNcrClient.tsx`
- Modify: `tests/healthcare-location-pages.test.ts`

**Interfaces:**
- Consumes: `healthcareLocationPages` grouped by audience and location.
- Produces: a compact accessible links component that links existing general healthcare pages to all relevant new pages, using existing visual conventions.

- [ ] **Step 1: Add failing link-data assertions**

Assert each page's related and hub links resolve to one of the eight new slugs and that all eight are reachable from an existing healthcare/location hub.

- [ ] **Step 2: Run tests and confirm failure**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: FAIL because the shared links component is not present.

- [ ] **Step 3: Add contextual links to existing hubs**

Place links where relevant within medical marketing, doctors/clinics, and Delhi-NCR pages; avoid repeating a large keyword list or disrupting current page layout.

- [ ] **Step 4: Run tests and confirm pass**

Run: `bun test tests/healthcare-location-pages.test.ts`
Expected: PASS for valid link targets and complete hub coverage.

### Task 5: Verify production output and deploy

**Files:**
- Verify: all eight new routes and modified SEO hubs
- Modify only if necessary: source files from Tasks 1-4

- [ ] **Step 1: Run existing and new tests**

Run: `bun test`
Expected: all existing redirect tests and healthcare page tests pass.

- [ ] **Step 2: Run lint and production build**

Run: `npm run lint` and `npm run build:vercel`
Expected: both exit successfully; Next.js lists all eight routes as generated.

- [ ] **Step 3: Inspect production-rendered page output**

Run the production server and request one doctor page and one hospital page; verify status 200, unique title/description/canonical, one H1, working internal links, and valid JSON-LD. Confirm no credential or secret material appears in the rendered HTML.

- [ ] **Step 4: Commit implementation and push**

Commit the verified changes on the existing `main` branch, preserving any unrelated user changes. Push to the configured GitHub remote to trigger the existing Vercel integration.

- [ ] **Step 5: Verify deployment and all routes live**

Wait for the Vercel deployment triggered by the push to finish successfully. Request all eight production URLs and confirm HTTP 200 and route-specific metadata. Report the sitemap URL for Search Console submission; do not claim Google has indexed the pages without Search Console evidence.
