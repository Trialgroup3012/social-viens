# Healthcare Location Landing Pages

## Goal

Create useful, search-focused landing pages for healthcare marketing services in four Delhi areas, with separate pages for individual doctors/clinics and hospitals. The pages should explain relevant SOCIAL VIENS services and make it easy to enquire without making unsupported performance, client, or physical-presence claims.

## Audience and success criteria

- Doctors and clinic decision-makers looking for digital visibility and patient enquiry support in their local service area.
- Hospital marketing and administration teams looking for service-line discovery and clear patient enquiry journeys.
- Each page has a distinct title, description, canonical URL, heading, and substantive location- and audience-specific copy.
- Pages render crawlable content on the server, use existing schema conventions appropriately, are internally linked, and appear in the XML sitemap.
- All routes pass production build and SEO-route checks, and production deployment serves the updated pages.

## Scope and routes

Add eight root-level routes consistent with the existing location SEO routes:

| Audience | Dwarka | NSP | Vasant Vihar | Delhi-wide |
| --- | --- | --- | --- | --- |
| Doctors and clinics | `/doctors-marketing-dwarka` | `/doctors-marketing-nsp` | `/doctors-marketing-vasant-vihar` | `/doctors-marketing-delhi` |
| Hospitals | `/hospital-marketing-dwarka` | `/hospital-marketing-nsp` | `/hospital-marketing-vasant-vihar` | `/hospital-marketing-delhi` |

NSP means Netaji Subhash Place. Location copy will present these as service areas, not SOCIAL VIENS offices. The Delhi-wide pages describe coverage across Delhi and link to the three area pages. Each area page links to the Delhi-wide page and its corresponding other healthcare audience page where useful.

## Page architecture

- Add a typed healthcare-location content module with eight explicit entries. Keep page copy and metadata as data, not duplicated route implementations.
- Add a shared server-rendered landing-page component that accepts an entry and renders the common layout with audience-specific sections, CTAs, FAQs, and breadcrumbs.
- Use a small route helper for metadata/schema only if compatible with Next.js static route exports. Each URL remains an explicit static route following current app conventions.
- Reuse the site's visual language and existing button/link patterns. Do not add a new dependency or an unnecessary visual redesign.
- Add audience and geography internal links from the existing `/niches/doctors-clinics`, `/medical-marketing`, and Delhi location hub where natural.
- Add all eight canonical URLs to `src/app/sitemap.ts`.

## Content design

Doctor/clinic pages focus on practitioner profile and specialty discovery, local organic search, Google Business Profile support, educational content, appointment/contact paths, and clinic enquiry workflows.

Hospital pages focus on department and specialty discovery, multi-location/service-area visibility, hospital website content, patient enquiry routing, and institutional content workflows.

Location details should be accurate and useful: Dwarka sector/neighbourhood intent; NSP / Netaji Subhash Place and nearby North Delhi business catchment; Vasant Vihar and relevant South Delhi catchment; and broad Delhi coverage. Avoid lists of facilities or travel-time assertions unless verified and directly relevant.

Do not invent client counts, rankings, conversion percentages, case studies, testimonials, guarantees, regulatory approvals, or a local office. Do not promise medical outcomes. Keep pricing out unless the existing published pricing is confirmed to apply to these services. FAQs should answer practical buyer questions without unsupported legal or medical assertions.

## SEO and structured data

- Provide unique, concise title and description metadata, canonical, Open Graph values, one clear H1, and descriptive internal links for every page.
- Use breadcrumb and service structured data consistent with existing `src/lib/schema.ts` helpers. FAQ schema is emitted only where the visible page includes matching FAQs.
- Ensure structured data accurately identifies the marketing service and service area. Do not use hospital/doctor medical-provider schema for SOCIAL VIENS.
- Avoid generating location doorway pages: each page must contain genuinely distinct audience, geography, buyer questions, and service context.

## Validation

- Test the eight data entries for unique slugs/canonicals, non-empty and distinct metadata, audience/geography consistency, and absence of prohibited fabricated proof-point fields.
- Verify sitemap includes all eight routes exactly once.
- Run lint/type checks and `npm run build:vercel` (or the repository's available production build command).
- Inspect representative rendered HTML for title, description, canonical, H1, internal links, and JSON-LD; request each production URL after deployment.

## Out of scope

- Changes to email/SMTP, database behavior, admin settings, or existing non-healthcare pages.
- Creating Google Search Console properties or requesting indexing. After deploy, the sitemap can be resubmitted and URLs inspected in Search Console; indexing is controlled by Google and is not guaranteed by deployment.
- Claiming a page is indexed or traffic has improved without Search Console evidence.
