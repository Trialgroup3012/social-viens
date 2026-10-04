import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, MapPin, MessageCircle, Stethoscope } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import {
  getHealthcareLocationBySlug,
  type HealthcareLocationPage as HealthcareLocationPageData,
} from "@/lib/healthcare-location-data";
import { generateHealthcareServiceSchema } from "@/lib/healthcare-location-seo";
import { generateFAQSchema } from "@/lib/schema";
import { generateHealthcareBreadcrumbSchema } from "@/lib/healthcare-location-seo";

const whatsappNumber = "918178004800";

function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function audienceLabel(page: HealthcareLocationPageData): string {
  return page.audience === "doctors" ? "Doctors & Clinics" : "Hospitals";
}

function buildWhatsappUrl(page: HealthcareLocationPageData): string {
  const audience = page.audience === "doctors" ? "doctor or clinic" : "hospital";
  const message = `Hi SOCIAL VIENS, I would like to discuss ${audience} marketing for ${page.locationLabel}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function HealthcareLocationPageView({
  page,
}: {
  page: HealthcareLocationPageData;
}) {
  const serviceSchema = generateHealthcareServiceSchema(page);
  const faqSchema = generateFAQSchema(page.faqs);
  const breadcrumbSchema = generateHealthcareBreadcrumbSchema(page);
  const relatedPages = page.relatedSlugs
    .map((slug) => getHealthcareLocationBySlug(slug))
    .filter((related): related is HealthcareLocationPageData => Boolean(related));
  const AudienceIcon = page.audience === "doctors" ? Stethoscope : Building2;

  return (
    <PageShell
      breadcrumbs={[
        {
          label: "Healthcare Marketing",
          href: page.audience === "doctors" ? "/niches/doctors-clinics" : "/medical-marketing",
        },
        { label: page.title },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />

      <section className="relative overflow-hidden bg-[#171313] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
              <AudienceIcon aria-hidden="true" className="h-4 w-4" />
              {audienceLabel(page)} <span className="text-white/50">/</span> {page.locationLabel}
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {page.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={buildWhatsappUrl(page)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-amber-300 px-5 py-3 font-semibold text-[#211a12] transition-colors hover:bg-amber-200"
              >
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
                Discuss your requirements
              </a>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 px-5 py-3 font-semibold text-white transition-colors hover:border-white/60"
              >
                Contact SOCIAL VIENS <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10">
              <Image
                src={page.heroImage}
                alt="Illustrative doctor-patient conversation for a healthcare practice"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
            <div className="border-l border-amber-300/50 py-2 pl-6 md:pl-8">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase text-amber-300">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Service area
              </p>
              <p className="mt-3 text-2xl font-semibold">
                {page.location === "delhi" ? "Across Delhi" : `${page.locationLabel}, Delhi`}
              </p>
              <p className="mt-3 max-w-md leading-7 text-white/70">
                Planning and content are scoped to the locations your practice or hospital actually serves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase text-amber-700">Local approach</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">{page.overviewTitle}</h2>
        </div>
        <p className="text-lg leading-8 text-slate-700">{page.overviewText}</p>
      </section>

      <section id="services" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-amber-700">How we can help</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Digital marketing support for {audienceLabel(page).toLowerCase()}
            </h2>
          </div>
          <div className="mt-10 grid gap-x-12 md:grid-cols-2">
            {page.services.map((service, index) => (
              <article key={service.title} className="border-t border-slate-300 py-6">
                <p className="text-sm font-semibold text-amber-700">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-amber-700">Working together</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">A practical, reviewable process</h2>
        </div>
        <ol className="mt-9 grid gap-8 md:grid-cols-3">
          {page.processSteps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-amber-500 pt-5">
              <span className="text-sm font-bold text-amber-700">STEP 0{index + 1}</span>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-2 leading-7 text-slate-700">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-slate-200 bg-[#f6f4f1]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase text-amber-700">Questions</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">{audienceLabel(page)} marketing in {page.locationLabel}</h2>
          <div className="mt-8 divide-y divide-slate-300 border-y border-slate-300">
            {page.faqs.map((faq) => (
              <details key={faq.q} className="group py-5">
                <summary className="cursor-pointer list-none pr-6 text-lg font-semibold text-slate-950 marker:hidden">
                  {faq.q}
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-amber-700">Explore healthcare pages</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Related service areas and teams</h2>
          </div>
          <nav aria-label="Related healthcare marketing pages" className="flex flex-wrap gap-x-6 gap-y-3">
            {relatedPages.map((related) => (
              <Link
                key={related.slug}
                href={`/${related.slug}`}
                className="inline-flex items-center gap-2 font-medium text-slate-800 underline decoration-amber-500 underline-offset-4 hover:text-amber-800"
              >
                {related.title} <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
