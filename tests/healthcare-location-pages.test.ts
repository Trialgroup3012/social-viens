/// <reference types="bun-types" />

import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  getHealthcareLocationBySlug,
  healthcareLocationPages,
} from "../src/lib/healthcare-location-data";
import {
  generateHealthcareBreadcrumbSchema,
  generateHealthcareLocationMetadata,
  generateHealthcareServiceSchema,
} from "../src/lib/healthcare-location-seo";
import { SITE_URL } from "../src/lib/schema";
import sitemap from "../src/app/sitemap";
import HealthcareLocationLinks from "../src/components/HealthcareLocationLinks";

const expectedSlugs = [
  "doctors-marketing-dwarka",
  "doctors-marketing-nsp",
  "doctors-marketing-vasant-vihar",
  "doctors-marketing-delhi",
  "hospital-marketing-dwarka",
  "hospital-marketing-nsp",
  "hospital-marketing-vasant-vihar",
  "hospital-marketing-delhi",
];

test("defines the eight requested audience and location routes exactly once", () => {
  expect(healthcareLocationPages.map((page) => page.slug).sort()).toEqual(
    [...expectedSlugs].sort(),
  );
  expect(new Set(healthcareLocationPages.map((page) => page.slug)).size).toBe(8);
  expect(healthcareLocationPages.filter((page) => page.audience === "doctors")).toHaveLength(4);
  expect(healthcareLocationPages.filter((page) => page.audience === "hospitals")).toHaveLength(4);

  const combinations = healthcareLocationPages.map(
    (page) => `${page.audience}:${page.location}`,
  );
  expect(new Set(combinations).size).toBe(8);
});

test("provides unique canonical-ready metadata and distinct copy for every page", () => {
  for (const field of ["metaTitle", "metaDescription", "heroSubtitle", "overviewText"] as const) {
    const values = healthcareLocationPages.map((page) => page[field].trim());
    expect(values.every(Boolean)).toBe(true);
    expect(new Set(values).size).toBe(8);
  }

  expect(healthcareLocationPages.every((page) => page.title.trim().length > 0)).toBe(true);
  expect(healthcareLocationPages.every((page) => page.h1.trim().length > 0)).toBe(true);
  expect(healthcareLocationPages.every((page) => page.targetKeyword.trim().length > 0)).toBe(true);
  expect(healthcareLocationPages.every((page) => page.metaTitle.length <= 65)).toBe(true);
  expect(healthcareLocationPages.every((page) => page.metaDescription.length >= 100 && page.metaDescription.length <= 160)).toBe(true);

  const questions = healthcareLocationPages.flatMap((page) =>
    page.faqs.map((faq) => faq.q),
  );
  expect(questions).toHaveLength(24);
  expect(new Set(questions).size).toBe(24);
});

test("uses only valid related page slugs and supports direct slug lookup", () => {
  const knownSlugs = new Set(expectedSlugs);

  for (const page of healthcareLocationPages) {
    expect(page.relatedSlugs.length).toBeGreaterThan(0);
    expect(page.relatedSlugs).not.toContain(page.slug);
    expect(page.relatedSlugs.every((slug) => knownSlugs.has(slug))).toBe(true);
    expect(getHealthcareLocationBySlug(page.slug)).toBe(page);
  }

  expect(getHealthcareLocationBySlug("not-a-healthcare-page")).toBeUndefined();
});

test("generates route-specific metadata and accurate service schema", () => {
  const doctor = getHealthcareLocationBySlug("doctors-marketing-nsp");
  const hospital = getHealthcareLocationBySlug("hospital-marketing-vasant-vihar");
  expect(doctor).toBeDefined();
  expect(hospital).toBeDefined();
  if (!doctor || !hospital) throw new Error("Expected healthcare location pages");

  for (const page of [doctor, hospital]) {
    const metadata = generateHealthcareLocationMetadata(page);
    const service = generateHealthcareServiceSchema(page);

    expect(metadata.alternates?.canonical).toBe(`/${page.slug}`);
    expect(metadata.title).toBe(page.metaTitle);
    expect(metadata.description).toBe(page.metaDescription);
    expect(metadata.openGraph).toMatchObject({
      title: page.metaTitle,
      description: page.metaDescription,
    });
    expect(service).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      url: `${SITE_URL}/${page.slug}`,
    });
    expect(service.areaServed).toBeTruthy();
    expect(service).not.toHaveProperty("offers");
    expect(service.provider).toMatchObject({ "@type": "Organization" });
    expect(service["@type"]).not.toBe("Hospital");
    expect(service["@type"]).not.toBe("Physician");
  }
});

test("builds breadcrumbs from the correct healthcare hub to the canonical page", () => {
  const page = getHealthcareLocationBySlug("doctors-marketing-nsp");
  expect(page).toBeDefined();
  if (!page) throw new Error("Expected the NSP doctor page");

  const breadcrumbs = generateHealthcareBreadcrumbSchema(page);
  expect(breadcrumbs.itemListElement).toHaveLength(3);
  expect(breadcrumbs.itemListElement).toMatchObject([
    { position: 1, name: "Home", item: SITE_URL },
    { position: 2, name: "Healthcare Marketing", item: `${SITE_URL}/niches/doctors-clinics` },
    { position: 3, name: page.title, item: `${SITE_URL}/doctors-marketing-nsp` },
  ]);
  expect(new Set(breadcrumbs.itemListElement.map((item) => item.item)).size).toBe(3);
});

test("includes every healthcare location route exactly once in the sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  for (const slug of expectedSlugs) {
    expect(urls.filter((url) => url === `${SITE_URL}/${slug}`)).toHaveLength(1);
  }
});

test("renders crawlable links to all eight healthcare pages", () => {
  const html = renderToStaticMarkup(createElement(HealthcareLocationLinks));

  for (const slug of expectedSlugs) {
    expect(html).toContain(`href="/${slug}"`);
  }
  expect(html).toContain("Doctors &amp; clinics");
  expect(html).toContain("Hospitals");
});
