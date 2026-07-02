import type { Metadata } from "next";
import FAQClient from "./FAQClient";
import { allFAQs } from "@/lib/faq-data";
import { generateFAQSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "FAQ — Help Center | SOCIAL VIENS",
  description:
    "Answers to the most common questions about working with Social Viens — services, pricing, process, and support. Can't find your answer? Chat with our team.",
  keywords: [
    "digital marketing FAQ",
    "agency pricing India",
    "SEO services cost",
    "how long to see results",
    "marketing agency help center",
  ],
  openGraph: {
    title: "Frequently Asked Questions | SOCIAL VIENS",
    description:
      "Answers about our services, pricing, process, and support — all in one place.",
    type: "website",
    locale: "en_IN",
  },
};

export default function FAQPage() {
  const faqSchema = generateFAQSchema(
    allFAQs.flatMap((group) =>
      group.items.map((item) => ({ q: item.question, a: item.answer })),
    ),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClient />
    </>
  );
}
