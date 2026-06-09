export interface Service {
  id: string;
  title: string;
  tag: string;
  shortDesc: string;
  description: string;
  included: string[];
  stack: string[];
  timeline: string;
  bestFor: string;
}

export const services: Service[] = [
  {
    id: "mobile",
    title: "Mobile App Development",
    tag: "Mobile",
    shortDesc: "Cross-platform iOS and Android apps.",
    description:
      "We build native-quality mobile apps using React Native. One codebase that ships to iOS and Android without sacrificing performance or platform feel.",
    included: [
      "iOS and Android from a single React Native codebase",
      "Offline-first architecture when needed",
      "Push notifications and background sync",
      "App Store and Google Play submission",
      "Performance profiling and QA",
    ],
    stack: ["React Native", "Expo", "Firebase", "Supabase"],
    timeline: "6 – 12 weeks",
    bestFor: "Startups and founders launching their first app",
  },
  {
    id: "web",
    title: "Web Platforms",
    tag: "Web",
    shortDesc: "Full-stack web applications built to last.",
    description:
      "Production-ready web platforms built for real load. We work in Next.js for frontend-heavy applications and Spring Boot for robust backend services — or both.",
    included: [
      "Server-side rendering and static generation",
      "REST and GraphQL APIs",
      "Authentication and role-based access control",
      "Database design and query optimization",
      "Deployment and infrastructure setup",
    ],
    stack: ["Next.js", "Spring Boot", "PostgreSQL", "Supabase", "Vercel"],
    timeline: "4 – 10 weeks",
    bestFor: "Businesses needing a robust web presence or internal tool",
  },
  {
    id: "saas",
    title: "SaaS Products",
    tag: "SaaS",
    shortDesc: "Multi-tenant software built to scale.",
    description:
      "From concept to launched product. We design and build SaaS applications end-to-end — covering architecture, billing, user management, and the core product experience.",
    included: [
      "Multi-tenant architecture",
      "Subscription billing with Stripe",
      "User authentication and team management",
      "Admin dashboard and usage analytics",
      "Onboarding flow and activation tracking",
    ],
    stack: ["Next.js", "Supabase", "Stripe", "PostgreSQL"],
    timeline: "8 – 16 weeks",
    bestFor: "Founders building a subscription-based software product",
  },
  {
    id: "design",
    title: "UI/UX Design",
    tag: "Design",
    shortDesc: "Interfaces that are clear and intentional.",
    description:
      "Design that serves the product, not the portfolio. We work in Figma to produce clean, functional interfaces — and because we build what we design, what ships matches what was designed.",
    included: [
      "User flows and wireframes",
      "High-fidelity UI design in Figma",
      "Component system and design tokens",
      "Interactive prototype for stakeholder review",
      "Handoff-ready specs or direct implementation",
    ],
    stack: ["Figma", "Framer"],
    timeline: "2 – 4 weeks",
    bestFor: "Teams with engineers who need clear design direction",
  },
  {
    id: "api",
    title: "APIs & Integrations",
    tag: "API",
    shortDesc: "APIs that connect systems and power products.",
    description:
      "Clean API design and reliable third-party integrations. We build REST and webhook-based APIs and connect your product to the external services it depends on.",
    included: [
      "REST API design and implementation",
      "Webhook systems and event-driven architecture",
      "Third-party service integrations",
      "API documentation",
      "Rate limiting, authentication, and security hardening",
    ],
    stack: ["Spring Boot", "Next.js API Routes", "PostgreSQL", "Redis"],
    timeline: "2 – 6 weeks",
    bestFor: "Products that need to connect to external services or expose data",
  },
  {
    id: "mvp",
    title: "MVP & Rapid Build",
    tag: "MVP",
    shortDesc: "From concept to working product, fast.",
    description:
      "If you need to validate an idea quickly, we scope to the essential and ship. No unnecessary features — a solid, working product you can put in front of real users.",
    included: [
      "Problem definition and scope alignment",
      "Technology selection",
      "Core feature build",
      "Basic analytics and error tracking",
      "Production deployment and launch",
    ],
    stack: ["React Native", "Next.js", "Supabase", "Vercel"],
    timeline: "4 – 6 weeks",
    bestFor: "Founders validating an idea before committing to a full build",
  },
  {
    id: "support",
    title: "Ongoing Support",
    tag: "Support",
    shortDesc: "Continued development after launch.",
    description:
      "We stay involved after launch. Whether you need regular feature development, performance monitoring, security updates, or technical guidance — we offer ongoing engagement for products we've built.",
    included: [
      "Regular feature development sprints",
      "Bug fixing and performance monitoring",
      "Dependency and security updates",
      "Code reviews and technical guidance",
      "Monthly progress reporting",
    ],
    stack: ["Varies by project"],
    timeline: "Ongoing",
    bestFor: "Teams who've built with us and want continued development",
  },
];
