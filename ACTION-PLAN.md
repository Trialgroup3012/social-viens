# Social Viens SEO Action Plan

Based on the 2026-10-04 [on-page SEO audit](FULL-AUDIT-REPORT.md). These are recommendations, not changes already deployed.

## Implementation status

Implemented in the local checkout: Article images now use the eight existing blog images; sitewide FAQ markup and unverified rating markup were removed; public routes have canonical and Open Graph image metadata; four main headings are H1s; service descriptions are complete; sitemap dates are omitted when unknown; and long page titles/descriptions were editorially shortened while retaining topic and intent. SEO Manager overrides for its 11 managed pages are now resolved in server metadata; save/reset invalidates the page so its HTML is regenerated. The SEO Manager now limits paths to those server-integrated pages.

Still pending: owner-side Search Console URL Inspection and Core Web Vitals report review, plus post-deployment Rich Results/social-preview validation. Search Console sign-in was not available in the connected browser, and PageSpeed Insights returned no field data for this origin. The sitemap success visible in the previously supplied Search Console screenshot is historical, not a fresh account-side verification.

## Priority 1: Correct invalid structured data

1. Repair the Article `image` URL in `src/lib/schema.ts` for all eight blog posts. Use real article artwork or implement the missing `/og-image` route. Done when all eight image URLs return an image with HTTP 200 and a representative article passes Google's Rich Results Test without an inaccessible-image warning.
2. Move `FAQPage` JSON-LD out of `src/app/layout.tsx`. Add it only on pages whose visible FAQ text matches the schema. Done when `/portfolio` has no unrelated FAQ JSON-LD, and any remaining FAQ markup matches page content.
3. Confirm the 4.9/50 rating has an accurate, current review source. Remove or correct unsupported markup. Do not expect self-serving review stars from Google.

## Priority 2: Improve page-level signals

4. Add self-referencing canonical metadata across all indexable routes, using the preferred `https://www.socialviens.in` host. Done when a spot check of home, service, blog, and location HTML shows exactly one correct canonical each.
5. Add a real default `og:image`, with blog-specific images where available. Done when social preview metadata points to HTTP 200 images and a share-preview debugger displays them.
6. Add one visible H1 to `/portfolio`, `/blog`, `/pricing`, and `/contact`. Done when live server HTML contains a clear H1 on each.
7. Replace the nine service description `.slice(0, 160)` results with complete, concise descriptions. Done when no service meta description ends mid-word.

## Priority 3: Editorial and measurement

8. Review long titles/descriptions for clarity and unique intent. The rendered page inventory was rechecked after edits; page titles are at most 65 characters and descriptions at most 170 characters. These are editorial guardrails, not Google ranking requirements.
9. Use true per-page content modification dates in `src/app/sitemap.ts`, or omit dates where the site has no reliable value.
10. Render Admin SEO Manager overrides through server-side Next.js metadata. Implemented for all 11 managed paths, with route revalidation after save/reset. Build-time database access was unavailable locally, so an override could not be seeded for a live HTML assertion before deploy.
11. In Search Console, inspect representative URLs and compare submitted versus indexed pages. Owner sign-in is required; this connected browser was unauthenticated. PageSpeed Insights reported “No Data” for field experience, and its API quota was unavailable. Recheck Search Console mobile and desktop Core Web Vitals after deployment.

## Release verification

After deploying, request the live sitemap and representative pages, confirm all affected image URLs return 200, inspect HTML metadata/schema and headings, then use Search Console URL Inspection. Resubmitting a valid sitemap is optional; it does not guarantee indexing or rankings.
