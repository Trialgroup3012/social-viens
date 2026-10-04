import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HealthcareLocationPageView } from "@/components/HealthcareLocationPage";
import { getHealthcareLocationBySlug } from "@/lib/healthcare-location-data";
import { generateHealthcareLocationMetadata } from "@/lib/healthcare-location-seo";

const SLUG = "doctors-marketing-delhi";

export function generateMetadata(): Metadata {
  const page = getHealthcareLocationBySlug(SLUG);
  return page ? generateHealthcareLocationMetadata(page) : {};
}

export default function Page() {
  const page = getHealthcareLocationBySlug(SLUG);
  if (!page) notFound();
  return <HealthcareLocationPageView page={page} />;
}
