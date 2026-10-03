/**
 * Everything on the home page that is proof: clients, results, quotes, the founder, articles.
 *
 * Anything marked `todo: true` is a slot still waiting for real content. It shows on the page
 * as a dashed "To add" box so it can never be mistaken for a real claim. To fill a slot, put in
 * the real value and delete the `todo` line.
 */

export const hero = {
  headline: ["Your idea,", "built right."],
  lead: "SKTR designs and engineers mobile apps, web platforms, SaaS products and APIs for businesses that need them to work.",
};

/** Names or logos shown under the hero. Add `logo: "/clients/name.svg"` to show a logo instead of the name. */
export const clients: { name: string; logo?: string; todo?: boolean }[] = [
  { name: "Abi's Kitchen" },
  { name: "Client logo", todo: true },
  { name: "Client logo", todo: true },
  { name: "Client logo", todo: true },
  { name: "Client logo", todo: true },
];

/** The case study that leads the page */
export const featured = {
  slug: "abis-kitchen",
  client: "Abi's Kitchen",
  kind: "Website and booking system",
  summary: "A catering website that prices an event in minutes, takes popup kitchen orders, and sends branded invoices from one admin.",
  did: ["Product design", "Web development", "Admin and invoicing", "Search and analytics"],
  quote: {
    todo: true,
    text: "Client quote to add: one or two sentences from the owner on what changed for the business.",
    name: "Name to add",
    role: "Owner, Abi's Kitchen",
  },
  results: [
    { todo: true, value: "00", label: "Result to add, for example quotes received online" },
    { todo: true, value: "00", label: "Result to add, for example time to send a quote" },
    { todo: true, value: "00", label: "Result to add, for example weeks from start to launch" },
  ],
};

/** The headline numbers across all work */
export const results = [
  { todo: true, value: "00", label: "Projects shipped" },
  { todo: true, value: "00", label: "Years building software" },
  { todo: true, value: "00", label: "Result to add" },
  { todo: true, value: "00", label: "Result to add" },
];

export const testimonials = [
  { todo: true, text: "Client quote to add.", name: "Name to add", role: "Role, company" },
  { todo: true, text: "Client quote to add.", name: "Name to add", role: "Role, company" },
  { todo: true, text: "Client quote to add.", name: "Name to add", role: "Role, company" },
];

/** Services grouped by what the client needs. The ids match lib/services-data.ts. */
export const serviceGroups = [
  {
    title: "Start something new",
    text: "Test an idea quickly and get something real in front of users.",
    ids: ["mvp", "design"],
  },
  {
    title: "Build the full product",
    text: "Design and engineering for apps and platforms that have to last.",
    ids: ["mobile", "web", "saas"],
  },
  {
    title: "Connect it and keep it running",
    text: "Integrations, and a team that stays on after launch.",
    ids: ["api", "support"],
  },
];

export const founder = {
  name: "Kashif Ford",
  role: "Founder",
  photo: undefined as string | undefined, // e.g. "/people/kashif.jpg"
  bio: { todo: true, text: "Short bio to add: background, what you've built, and why clients trust you with their product." },
};

export const articles = [
  { todo: true, title: "Article to add", text: "A short piece that shows how you think about building software." },
  { todo: true, title: "Article to add", text: "A lesson from a real project." },
  { todo: true, title: "Article to add", text: "A guide for founders, for example what an MVP should cost." },
];
