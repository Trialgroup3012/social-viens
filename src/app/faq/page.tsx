import type { Metadata } from "next";
import FAQClient from "./FAQClient";
import { allFAQs } from "@/lib/faq-data";
import { generateFAQSchema } from "@/lib/schema";
import { withSeoOverride } from "@/lib/server-seo";

const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "Digital Marketing FAQs | SOCIAL VIENS",
  description:
    "Find answers about SOCIAL VIENS services, pricing, project process and support for digital marketing clients.",
  keywords: [
    "digital marketing FAQ",
    "agency pricing India",
    "SEO services cost",
    "how long to see results",
    "marketing agency help center",
  ],
  openGraph: {
    images: ["/social-viens-logo.png"],
    title: "Frequently Asked Questions | SOCIAL VIENS",
    description:
      "Answers about our services, pricing, process, and support — all in one place.",
    type: "website",
    locale: "en_IN",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withSeoOverride("/faq", metadata);
}

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
