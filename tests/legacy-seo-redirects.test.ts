/// <reference types="bun-types" />

import { expect, test } from "bun:test";
import nextConfig from "../next.config";

test("redirects legacy nested SEO URLs to their current landing pages", async () => {
  const redirects = await nextConfig.redirects?.();

  expect(redirects).toEqual(
    expect.arrayContaining([
      {
        source: "/services/seo-services-delhi",
        destination: "/seo-services-delhi",
        permanent: true,
      },
      {
        source: "/services/startup-it-support",
        destination: "/startup-it-support",
        permanent: true,
      },
    ]),
  );
});
