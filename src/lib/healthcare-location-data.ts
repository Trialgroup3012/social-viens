export type HealthcareAudience = "doctors" | "hospitals";

export type HealthcareLocation =
  | "dwarka"
  | "nsp"
  | "vasant-vihar"
  | "delhi";

export interface HealthcareServiceItem {
  title: string;
  description: string;
}

export interface HealthcareProcessStep {
  title: string;
  description: string;
}

export interface HealthcareFAQ {
  q: string;
  a: string;
}

export interface HealthcareLocationPage {
  slug: string;
  audience: HealthcareAudience;
  location: HealthcareLocation;
  locationLabel: string;
  title: string;
  h1: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  overviewTitle: string;
  overviewText: string;
  services: HealthcareServiceItem[];
  processSteps: HealthcareProcessStep[];
  faqs: HealthcareFAQ[];
  relatedSlugs: string[];
}

const doctorServiceItems: HealthcareServiceItem[] = [
  {
    title: "Doctor and specialty pages",
    description:
      "Present qualifications, areas of practice, consultation information, and contact options in a clear, easy-to-navigate profile.",
  },
  {
    title: "Local search foundations",
    description:
      "Review the website structure, location details, and Google Business Profile information patients use when evaluating nearby care.",
  },
  {
    title: "Patient education content",
    description:
      "Plan useful educational content around common questions, with specialty details reviewed by your practice before publication.",
  },
  {
    title: "Appointment enquiry paths",
    description:
      "Make the next step clear with practical contact, call, and appointment enquiry options across mobile and desktop.",
  },
];

const hospitalServiceItems: HealthcareServiceItem[] = [
  {
    title: "Department and specialty discovery",
    description:
      "Organise department, specialty, doctor, and facility information so visitors can find the right hospital information efficiently.",
  },
  {
    title: "Hospital website content",
    description:
      "Structure service-line pages, visiting information, and patient resources around the questions people bring to a hospital website.",
  },
  {
    title: "Local and multi-location search",
    description:
      "Keep location and service-area information clear for hospitals with multiple departments, facilities, or catchment areas.",
  },
  {
    title: "Patient enquiry journeys",
    description:
      "Map clear routes to department contacts, appointment enquiries, and relevant hospital information without adding confusing steps.",
  },
];

const locations: Record<HealthcareLocation, { label: string; context: string }> = {
  dwarka: {
    label: "Dwarka",
    context:
      "For a practice serving Dwarka, patients may search by specialty, nearby sector, or the service they need. We shape page structure around the actual clinic catchment and the information your team can keep current.",
  },
  nsp: {
    label: "NSP (Netaji Subhash Place)",
    context:
      "Netaji Subhash Place is a distinct North Delhi destination. A useful local healthcare page should make the facility, specialty, appointment route, and nearby service area clear instead of relying on a generic Delhi-wide message.",
  },
  "vasant-vihar": {
    label: "Vasant Vihar",
    context:
      "Healthcare searches around Vasant Vihar can include patients comparing nearby South Delhi options. We focus the page on your genuine service area, practice information, and a straightforward route to contact the right team.",
  },
  delhi: {
    label: "Delhi",
    context:
      "Delhi-wide healthcare marketing needs a clear view of the locations and specialties you actually serve. We organise content around those service areas, then connect it to the most relevant facility or practitioner information.",
  },
};

const doctorFaqQuestions: Record<HealthcareLocation, [string, string, string]> = {
  dwarka: [
    "Can a doctor page explain which Dwarka sectors the practice serves?",
    "How can patients searching in Dwarka find my specialty and clinic details?",
    "Can the Dwarka page make my existing appointment options easier to reach?",
  ],
  nsp: [
    "Can my doctor profile target patients looking near Netaji Subhash Place?",
    "What practice details should an NSP-area specialty page include?",
    "Can the page direct Netaji Subhash Place enquiries to my clinic contact?",
  ],
  "vasant-vihar": [
    "How should a doctor page describe a Vasant Vihar service area accurately?",
    "Can a Vasant Vihar profile explain consultation details and specialties?",
    "How can patients around Vasant Vihar reach the practice from the page?",
  ],
  delhi: [
    "Can doctor marketing cover more than one Delhi neighbourhood?",
    "How do we organise specialty pages for a Delhi-wide practice?",
    "Can appointment enquiries be labelled by the Delhi clinic location?",
  ],
};

const hospitalFaqQuestions: Record<HealthcareLocation, [string, string, string]> = {
  dwarka: [
    "Can a Dwarka hospital page help visitors navigate departments?",
    "How can hospital information distinguish Dwarka facilities and contacts?",
    "Can patient enquiries from the Dwarka page reach the right department?",
  ],
  nsp: [
    "Can hospital marketing explain services around Netaji Subhash Place?",
    "How should an NSP hospital page present departments and facility details?",
    "Can enquiries near Netaji Subhash Place be routed by service line?",
  ],
  "vasant-vihar": [
    "What should a hospital page say about the Vasant Vihar service area?",
    "Can visitors compare Vasant Vihar hospital departments on the website?",
    "How can a Vasant Vihar page connect visitors with hospital teams?",
  ],
  delhi: [
    "How can a hospital organise service pages across Delhi?",
    "Can Delhi hospital pages distinguish facilities and their contact details?",
    "How can Delhi-wide hospital enquiries be routed to departments?",
  ],
};

function pageFaqs(
  audience: HealthcareAudience,
  location: HealthcareLocation,
): HealthcareFAQ[] {
  const questions =
    audience === "doctors" ? doctorFaqQuestions[location] : hospitalFaqQuestions[location];
  const answers =
    audience === "doctors"
      ? [
          "Yes. The page can describe the specialty, consultation information, and locations the practice actually serves.",
          "We can organise approved profile and practice details so patients can understand the offering without implying a particular care outcome.",
          "We can make the contact options clear and mobile-friendly, using the phone, appointment, or enquiry routes your practice already supports.",
        ]
      : [
          "Yes. Department content can be organised around accurate service information and a useful next step for visitors.",
          "The content plan can distinguish facilities and service areas using visiting and contact information supplied by your team.",
          "We can map the website journey to department contacts or enquiry routes that your hospital already operates and approves.",
        ];

  return questions.map((q, index) => ({ q, a: `${answers[index]} The page can be scoped for ${locations[location].label} and the locations your organisation actually serves.` }));
}

function makePage(input: {
  audience: HealthcareAudience;
  location: HealthcareLocation;
  slug: string;
  keyword: string;
  hero: string;
  opening: string;
  metaDescription?: string;
}): HealthcareLocationPage {
  const area = locations[input.location];
  const isDoctor = input.audience === "doctors";
  const audienceLabel = isDoctor ? "Doctors and clinics" : "Hospitals";
  const shortAudience = isDoctor ? "Doctor" : "Hospital";
  const services = isDoctor ? doctorServiceItems : hospitalServiceItems;
  const locationSuffix = input.location === "delhi" ? "in Delhi" : `in ${area.label}`;
  const title = `${shortAudience} Marketing ${locationSuffix}`;

  return {
    slug: input.slug,
    audience: input.audience,
    location: input.location,
    locationLabel: area.label,
    title,
    h1: `${isDoctor ? "Digital Marketing for Doctors" : "Hospital Digital Marketing"} ${locationSuffix}`,
    targetKeyword: input.keyword,
    metaTitle: `${shortAudience} Marketing ${locationSuffix} | SOCIAL VIENS`,
    metaDescription: input.metaDescription ?? input.hero,
    heroSubtitle: input.hero,
    overviewTitle: `${audienceLabel} marketing for ${area.label}`,
    overviewText: `${input.opening} ${area.context} Our work can include search-ready website content, local profile improvements, educational content planning, and clearer enquiry journeys. The right scope depends on your team, existing website, approved information, and the locations you genuinely serve. We begin by understanding those details, then recommend a practical set of improvements rather than assuming every channel is right for every healthcare organisation.`,
    services,
    processSteps: [
      {
        title: "Understand the practice or hospital",
        description: `Review your audience, ${isDoctor ? "specialty and consultation flow" : "departments, facilities and enquiry ownership"}, existing public information, and the ${area.label} service area you want to address.`,
      },
      {
        title: "Agree the page and channel scope",
        description:
          "Prioritise the website, local search, content, and enquiry improvements that match your goals and the information your team can maintain.",
      },
      {
        title: "Create, review, and refine",
        description:
          "Prepare the agreed content and page updates for your review, then refine the contact paths and measurement around approved enquiries.",
      },
    ],
    faqs: pageFaqs(input.audience, input.location),
    relatedSlugs: relatedSlugs(input.audience, input.location),
  };
}

function relatedSlugs(
  audience: HealthcareAudience,
  location: HealthcareLocation,
): string[] {
  const otherAudience = audience === "doctors" ? "hospital" : "doctors";
  const locationPart = location;
  const otherAudienceSlug = `${otherAudience}-marketing-${locationPart}`;
  const delhiSlug = `${audience === "doctors" ? "doctors" : "hospital"}-marketing-delhi`;

  if (location === "delhi") {
    return [
      ...(["dwarka", "nsp", "vasant-vihar"] as const).map(
        (area) => `${audience === "doctors" ? "doctors" : "hospital"}-marketing-${area}`,
      ),
      otherAudienceSlug,
    ];
  }

  return [otherAudienceSlug, delhiSlug];
}

export const healthcareLocationPages: HealthcareLocationPage[] = [
  makePage({
    audience: "doctors",
    location: "dwarka",
    slug: "doctors-marketing-dwarka",
    keyword: "digital marketing for doctors in Dwarka",
    hero: "Build a clearer online presence for your Dwarka practice with specialty-led website content, local search support, patient education, and straightforward appointment enquiries.",
    opening:
      "A doctor or clinic in Dwarka needs public information that helps local patients understand the specialty, consultation process, and how to get in touch.",
    metaDescription:
      "Market your Dwarka medical practice with specialty-led pages, local search support, patient education, and clear appointment contact options.",
  }),
  makePage({
    audience: "doctors",
    location: "nsp",
    slug: "doctors-marketing-nsp",
    keyword: "doctor marketing in Netaji Subhash Place",
    hero: "Support your Netaji Subhash Place practice with a useful specialty profile, local search foundations, patient education content, and a clear route to enquire.",
    opening:
      "For a doctor near Netaji Subhash Place, a focused digital presence can make specialty and consultation information easier for nearby patients to find and understand.",
  }),
  makePage({
    audience: "doctors",
    location: "vasant-vihar",
    slug: "doctors-marketing-vasant-vihar",
    keyword: "digital marketing for doctors in Vasant Vihar",
    hero: "Present your Vasant Vihar practice with clear doctor profiles, locally relevant website content, patient education, and convenient appointment contact options.",
    opening:
      "Patients comparing doctors in Vasant Vihar need more than a list of services: they need a clear profile, relevant practice details, and a practical way to contact the clinic.",
  }),
  makePage({
    audience: "doctors",
    location: "delhi",
    slug: "doctors-marketing-delhi",
    keyword: "digital marketing for doctors in Delhi",
    hero: "Plan doctor and clinic marketing across Delhi with specialty-led pages, local search foundations, patient education, and clear appointment enquiry paths.",
    opening:
      "Delhi practices often serve distinct neighbourhoods and patient groups. A useful marketing plan starts with the locations and specialties your clinic can genuinely support.",
  }),
  makePage({
    audience: "hospitals",
    location: "dwarka",
    slug: "hospital-marketing-dwarka",
    keyword: "hospital marketing in Dwarka",
    hero: "Make hospital departments, facility information, and patient enquiry routes easier to navigate for people looking for care in Dwarka.",
    opening:
      "Hospitals serving Dwarka need public pages that help visitors move from a broad care need to the right department, facility information, or enquiry contact.",
  }),
  makePage({
    audience: "hospitals",
    location: "nsp",
    slug: "hospital-marketing-nsp",
    keyword: "hospital marketing in Netaji Subhash Place",
    hero: "Organise hospital and specialty information for the Netaji Subhash Place service area with clear department pages and patient enquiry pathways.",
    opening:
      "For hospitals serving Netaji Subhash Place, clear information architecture can help visitors understand available departments and reach the appropriate contact point.",
  }),
  makePage({
    audience: "hospitals",
    location: "vasant-vihar",
    slug: "hospital-marketing-vasant-vihar",
    keyword: "hospital marketing in Vasant Vihar",
    hero: "Help people exploring hospital services around Vasant Vihar find relevant specialties, location information, and the right team to contact.",
    opening:
      "Hospitals serving Vasant Vihar can use clear service-line content to explain departments, facilities, and practical next steps to visitors researching care options.",
  }),
  makePage({
    audience: "hospitals",
    location: "delhi",
    slug: "hospital-marketing-delhi",
    keyword: "hospital marketing in Delhi",
    hero: "Coordinate hospital marketing across Delhi with organised department content, accurate location information, and clear patient enquiry journeys.",
    opening:
      "Hospital marketing across Delhi can involve multiple departments, facilities, and patient enquiry owners. The website should make those routes easy to understand and maintain.",
  }),
];

export function getHealthcareLocationBySlug(
  slug: string,
): HealthcareLocationPage | undefined {
  return healthcareLocationPages.find((page) => page.slug === slug);
}
