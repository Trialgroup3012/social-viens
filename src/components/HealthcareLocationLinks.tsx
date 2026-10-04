"use client";

import Link from "next/link";

export const healthcareLocationLinks = [
  { slug: "doctors-marketing-dwarka", audience: "Doctors & clinics", area: "Dwarka" },
  { slug: "doctors-marketing-nsp", audience: "Doctors & clinics", area: "NSP" },
  { slug: "doctors-marketing-vasant-vihar", audience: "Doctors & clinics", area: "Vasant Vihar" },
  { slug: "doctors-marketing-delhi", audience: "Doctors & clinics", area: "Delhi" },
  { slug: "hospital-marketing-dwarka", audience: "Hospitals", area: "Dwarka" },
  { slug: "hospital-marketing-nsp", audience: "Hospitals", area: "NSP" },
  { slug: "hospital-marketing-vasant-vihar", audience: "Hospitals", area: "Vasant Vihar" },
  { slug: "hospital-marketing-delhi", audience: "Hospitals", area: "Delhi" },
] as const;

export default function HealthcareLocationLinks() {
  return (
    <section className="border-y border-gold/15 bg-sv-surface/35 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Healthcare marketing by location
        </p>
        <h2 className="mt-3 text-2xl font-bold text-cream md:text-3xl">
          Choose your team and service area
        </h2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {(["Doctors & clinics", "Hospitals"] as const).map((audience) => (
            <div key={audience}>
              <h3 className="border-b border-gold/20 pb-3 text-lg font-semibold text-cream">
                {audience}
              </h3>
              <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
                {healthcareLocationLinks
                  .filter((item) => item.audience === audience)
                  .map((item) => (
                    <li key={item.slug} className="border-b border-white/10 py-3">
                      <Link
                        href={`/${item.slug}`}
                        className="text-sm font-medium text-sv-muted transition-colors hover:text-gold"
                      >
                        {audience} in {item.area}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
