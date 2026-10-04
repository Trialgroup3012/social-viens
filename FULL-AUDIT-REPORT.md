# Social Viens On-Page SEO Audit

Audit date: 2026-10-04  
Scope: `https://www.socialviens.in`, its 61 sitemap URLs, and the local source at commit `02546f2`.  
Method: Agentic SEO Skill audit workflow, live HTTP/HTML checks, source review, and Google Search Central policy cross-checks. This is an audit only; no production code or settings were changed.

## Executive summary

The technical baseline is sound: all 61 sitemap URLs returned HTTP 200, the sitemap and robots.txt are accessible, HTTP/apex URLs redirect to the preferred `www` HTTPS host, every sampled title and meta description is present and unique, and no crawled image lacked alt text. The main opportunities are broken blog structured-data image URLs, sitewide FAQ markup unrelated to some pages, absent canonicals and share images, and weak heading/snippet implementation on selected pages.

No numeric SEO score is assigned. PageSpeed Insights was rate-limited, and this audit had no Search Console performance/indexing export or field Core Web Vitals data. Ranking, traffic, and indexation outcomes cannot be inferred from HTML checks alone.

## Verified findings

### 1. Blog Article schema images return 404

- Severity: High. Confidence: High.
- Evidence: `src/lib/schema.ts` builds Article `image` as `${SITE_URL}/blog/${post.slug}/og-image`. The live JSON-LD on [the local SEO article](https://www.socialviens.in/blog/10-local-seo-strategies-delhi-2026) contains that URL. Direct checks of the `/og-image` URL for all eight blog posts returned HTTP 404.
- Impact: Google's Article image property points to an inaccessible image, so the image cannot support eligible article appearances. Google says Article image URLs must be crawlable and indexable: [Article structured-data documentation](https://developers.google.com/search/docs/appearance/structured-data/article).
- Fix: Point each Article `image` to a real, crawlable article image, or implement and test the intended image route. Recheck all eight URLs and validate a representative article in Google's Rich Results Test.

### 2. FAQ markup appears on pages without those FAQs

- Severity: High. Confidence: High.
- Evidence: `src/app/layout.tsx` injects the same `FAQPage` JSON-LD into every route. On [Portfolio](https://www.socialviens.in/portfolio), its first question, "What services does Social Viens offer?", is present in JSON-LD but absent from visible page text.
- Impact: This does not meet Google's rule that marked-up content should be visible and relevant to the page. FAQ rich results are also largely limited to authoritative government/health sites, so broad sitewide FAQ markup offers little expected benefit: [general structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [FAQ eligibility update](https://developers.google.com/search/blog/2023/08/howto-faq-changes).
- Fix: Remove the FAQ JSON-LD from the root layout. Add page-specific FAQ schema only where the matching questions and answers are actually visible. Do not add it solely to chase FAQ rich results.

### 3. No canonical link on any audited sitemap page

- Severity: Medium. Confidence: High.
- Evidence: All 61 live pages had no server-rendered `<link rel="canonical">`. `src/app/layout.tsx` and page metadata lack `alternates.canonical`. The sitemap and redirects already favor the `www` HTTPS host.
- Impact: Google has two existing canonicalization hints here, so this is not proof of duplicate indexing. Explicit self-canonicals would make the preferred URL clearer, especially if URL variants or campaign parameters are encountered: [Google canonicalization guide](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- Fix: Add absolute, self-referencing canonicals to indexable pages using the same preferred `https://www.socialviens.in` base as the sitemap. Verify output HTML for home, service, blog, and location pages. Do not canonicalize distinct pages to home.

### 4. Four important pages have no H1

- Severity: Medium. Confidence: High.
- Evidence: The server-rendered HTML of [Portfolio](https://www.socialviens.in/portfolio), [Blog](https://www.socialviens.in/blog), [Pricing](https://www.socialviens.in/pricing), and [Contact](https://www.socialviens.in/contact) contains no `<h1>`. The homepage and the other 56 audited pages do have an H1.
- Impact: The page's primary topic is less explicit in its semantic heading structure. This is not by itself an indexing blocker.
- Fix: Give each page one accurate, visible primary heading and keep subsection headings at H2/H3.

### 5. Social share image metadata is missing

- Severity: Medium. Confidence: High.
- Evidence: All 61 server-rendered pages lacked `og:image`. The root metadata in `src/app/layout.tsx` sets Open Graph title/description and a large-image Twitter card but no image.
- Impact: Links may display without the intended branded preview image. This is primarily a sharing and click-through presentation issue, not a direct ranking claim.
- Fix: Add a real, publicly accessible default Open Graph image and article-specific images where available. Verify the generated `<meta property="og:image">` and image response.

### 6. Service descriptions are cut at 160 characters, sometimes mid-word

- Severity: Medium. Confidence: High.
- Evidence: All nine `/services/[slug]` descriptions are exactly 160 characters because `src/app/services/[slug]/page.tsx` uses `service.longDescription.slice(0, 160)`. For example, the [Google Business Profile service](https://www.socialviens.in/services/google-business-profile) description ends `maximize impressi`.
- Impact: Search or social snippets may read unfinished. Search engines can rewrite snippets, so exact display is not guaranteed.
- Fix: Write a short, complete description for each service, or truncate at a word boundary and add punctuation. Keep the message useful rather than targeting a rigid character count.

### 7. Rating and SEO overrides need editorial review

- Severity: Medium. Confidence: Medium.
- Evidence: `src/app/layout.tsx` hard-codes `aggregateRating` as 4.9 from 50 reviews for `ProfessionalService`; this audit could not verify the review source. `src/components/layout/SeoOverrides.tsx` applies admin-managed title/description only after client-side hydration and creates `meta[name="og:title"]` rather than the Open Graph `property` form. The checked public SEO override API returned `null` for home, portfolio, and one service, so no active mismatch was established on those pages.
- Impact: Self-serving ratings for a business's own LocalBusiness/Organization pages are not eligible for Google review stars; unsupported review counts would also be misleading. Future admin SEO edits may not appear in initial HTML or standard social preview parsers: [Google's review snippet policy](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful), [structured-data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- Fix: Verify that the displayed review count and rating are factual and current; remove unsupported rating markup. If admin SEO settings are meant to control search previews, load them in Next.js server metadata generation and test initial HTML, not only browser-side DOM changes.

### 8. Snippet length and sitemap modification dates need cleanup

- Severity: Low. Confidence: High for the observed values; Medium for search impact.
- Evidence: 26 of 61 titles exceed 65 characters and 28 descriptions exceed 170; these are editorial review flags, not hard Google limits. `src/app/sitemap.ts` assigns a module-level `new Date()` as `lastModified` for most pages instead of tracking the underlying page's actual content change date.
- Impact: Some snippets may be shortened or rewritten. A `lastmod` value unrelated to a page's last significant update is less trustworthy: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- Fix: Review the longest titles/descriptions for front-loaded meaning; avoid automatic shortening that harms clarity. Use real modification dates where available, or omit `lastModified` when unknown.

## Passing checks and limits

- Live `/sitemap.xml`: HTTP 200 with 61 preferred-host URLs. Search Console screenshot supplied earlier showed this sitemap accepted with 61 discovered pages; current indexation status was not independently checked.
- Live `/robots.txt`: HTTP 200, allows public paths, disallows `/admin/` and `/api/`, and points at the sitemap.
- All 61 sitemap URLs returned HTTP 200. Every audited page has a title and description; no duplicates were found in those fields.
- Across audited pages, image alt attributes were nonempty. Homepage image inventory covered 20 images.
- HTTPS redirects are consistent: HTTP apex to HTTPS apex to HTTPS `www`; HTTPS apex to HTTPS `www`. Two hops from HTTP is a minor efficiency consideration, not a blocker.
- The skill's shallow internal-link crawl and sitemap-index probes generated apparent orphan/sitemap errors. They were excluded because the crawl was depth-limited and no sitemap index is required or referenced.
- No `llms.txt` exists. This is optional and not evidence of poor Google rankings.
- PageSpeed Insights returned rate limiting; Core Web Vitals, mobile rendering, JavaScript-rendered meta behavior, Search Console coverage, and real search performance remain unverified.
