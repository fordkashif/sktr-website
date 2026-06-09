export interface Project {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  overview: string;
  problem: string;
  solution: string;
  outcome: string;
  featured: boolean;
  year: string;
  status: "live" | "in-progress" | "client";
}

export const projects: Project[] = [
  {
    slug: "abc-fast-or-slow",
    name: "ABC Fast or Slow",
    category: "Mobile Game",
    tagline: "An alphabet speed game for iOS and Android.",
    description:
      "A fast-paced mobile game that challenges players to sort letters as quickly as possible. Built in React Native with real-time leaderboards.",
    tech: ["React Native", "Expo", "Firebase"],
    overview:
      "ABC Fast or Slow is a mobile game built around a single, deceptively simple mechanic: given a letter, decide quickly whether it falls in the first or second half of the alphabet. Simple rules, increasingly fast gameplay, and a competitive leaderboard that keeps players coming back.",
    problem:
      "Casual word games tend to be either too complex to learn in under 30 seconds, or too shallow to hold interest past day one. There was room for something immediately intuitive with genuine replay value — driven by speed and personal improvement rather than content unlocks.",
    solution:
      "We built a clean, native-quality mobile experience using React Native and Expo. Firebase handles real-time leaderboards and user score persistence across devices. The design strips away everything except the core gameplay loop — each round stays under 60 seconds and the interface is distraction-free.",
    outcome:
      "Published on the App Store and Google Play. Consistent Day-7 retention driven by leaderboard competition. Organic installs with no paid acquisition.",
    featured: true,
    year: "2024",
    status: "live",
  },
  {
    slug: "bhbooking",
    name: "bhbooking",
    category: "SaaS Platform",
    tagline: "Service booking software for independent providers.",
    description:
      "A SaaS booking platform for small service businesses — scheduling, client management, and payments in one place.",
    tech: ["Next.js", "Supabase", "Stripe", "Tailwind CSS"],
    overview:
      "bhbooking is a SaaS product for independent service providers — hair stylists, personal trainers, consultants, and anyone who books time for a living. It brings appointment scheduling, client management, and Stripe-powered payments into a single, clean interface. No spreadsheets, no WhatsApp threads.",
    problem:
      "Small service businesses were managing bookings across WhatsApp, paper diaries, and disconnected free tools that didn't talk to each other. Most booking software was designed and priced for enterprise — too complex, too expensive, and wrong for a one-person operation.",
    solution:
      "We designed and built a focused SaaS platform on Next.js with Supabase as the backend. Clients book online through a provider's link, the provider gets notified instantly, payment is collected or deferred via Stripe, and everything is tracked in a clean dashboard.",
    outcome:
      "Launched with an initial cohort of independent providers. No-show rates dropped through automated appointment reminders. Early users reported saving several hours per week previously spent on manual scheduling and follow-up.",
    featured: true,
    year: "2025",
    status: "live",
  },
  {
    slug: "client-work",
    name: "Client Projects",
    category: "Various",
    tagline: "Custom software built for external clients.",
    description:
      "We partner with businesses to build mobile apps, web platforms, internal tools, and APIs. Selected work available to discuss on request.",
    tech: ["React Native", "Next.js", "Spring Boot", "Supabase", "PostgreSQL"],
    overview:
      "Beyond our own products, we partner with external clients to design and build custom software. Projects range from mobile apps and customer-facing platforms to internal tools and API integrations across different industries.",
    problem:
      "Every engagement starts with the same question: what problem actually needs to be solved? We don't open with a technology choice — we start by understanding the business and working backwards from the outcome the client needs.",
    solution:
      "Our process is consistent regardless of project size: define the problem, design the right solution, build it to a standard, and ship it. We bring the same technical approach to client work that we apply to our own products.",
    outcome:
      "Client work is confidential by default. Case details, references, and project specifics are available in a direct conversation. Reach out to start one.",
    featured: true,
    year: "2025",
    status: "client",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
