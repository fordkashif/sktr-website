export interface Vertical {
  id: string;
  slug: string;
  num: string;
  tag: string;
  title: string;
  description: string;
  foot: [string, string];
  kicker: string;
  story: string;
  storyCopy: string;
  axisLabel: string;
  waveSettings: { intensity: number; speed: number };
  // Subpage-specific
  heroImage: string;
  heroImageAlt: string;
  pillars: { heading: string; body: string }[];
  cta: { label: string; href: string };
}

export const verticals: Vertical[] = [
  {
    id: "athletics",
    slug: "athletics",
    num: "01",
    tag: "Performance",
    title: "SKTR Athletics",
    description:
      "A performance ecosystem built around athletes — connecting development, coaching, analytics, and media into a single operating model.",
    foot: ["Performance", "Systems"],
    kicker: "01 / Performance",
    story: "Where human performance meets operating infrastructure.",
    storyCopy:
      "What begins on the track expands into products, systems, and platforms. Athletics is where the SKTR model proves itself.",
    axisLabel: "Athletics",
    waveSettings: { intensity: 18, speed: 8.6 },
    heroImage:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Athlete training on a track",
    pillars: [
      {
        heading: "Performance systems",
        body: "Training, analytics, and coaching connected into a single operating model — not fragmented across separate tools and teams.",
      },
      {
        heading: "Athlete development",
        body: "From early-stage development through elite performance, SKTR Athletics builds the infrastructure that compounds over a career.",
      },
      {
        heading: "Media and narrative",
        body: "The stories around athletes matter as much as the results. Editorial and distribution are built into the ecosystem from day one.",
      },
    ],
    cta: { label: "Partner with Athletics", href: "/#contact" },
  },
  {
    id: "labs",
    slug: "labs",
    num: "02",
    tag: "Research",
    title: "SKTR Labs",
    description:
      "Research, prototyping, and applied invention — the engine that builds shared tools and infrastructure for the entire group.",
    foot: ["Experiments", "Infrastructure"],
    kicker: "02 / Research",
    story: "The engine that makes everything else possible.",
    storyCopy:
      "Every tool, system, and platform built across SKTR starts here. Labs turns research into infrastructure that scales.",
    axisLabel: "Labs",
    waveSettings: { intensity: 10, speed: 6.4 },
    heroImage:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Team reviewing future-focused product work",
    pillars: [
      {
        heading: "Applied research",
        body: "Labs sits at the intersection of insight and execution. Every experiment is aimed at something that can scale — not research for its own sake.",
      },
      {
        heading: "Shared infrastructure",
        body: "The tools built in Labs become the foundation for every other vertical. Infrastructure created once, used everywhere.",
      },
      {
        heading: "Disciplined invention",
        body: "Prototyping with long-term intent means tolerating iteration and resisting the pull toward premature productisation.",
      },
    ],
    cta: { label: "Collaborate with Labs", href: "/#contact" },
  },
  {
    id: "media",
    slug: "media",
    num: "03",
    tag: "Editorial",
    title: "SKTR Media",
    description:
      "Editorial, film, and distribution — how the SKTR ecosystem earns an audience and shapes the culture around it.",
    foot: ["Editorial", "Distribution"],
    kicker: "03 / Editorial",
    story: "How the ecosystem earns an audience and shapes culture.",
    storyCopy:
      "Editorial, production, and distribution built around the platform — not around chasing reach.",
    axisLabel: "Media",
    waveSettings: { intensity: 13, speed: 7.2 },
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Creative team working across media and strategy",
    pillars: [
      {
        heading: "Editorial",
        body: "Thinking, perspective, and narrative built around the SKTR ecosystem — published selectively, when there's something worth saying.",
      },
      {
        heading: "Film and production",
        body: "Visual storytelling around athletes, operators, and ideas. Production that serves the platform rather than chasing views.",
      },
      {
        heading: "Distribution",
        body: "Getting ideas in front of the right audiences — not the largest ones. Reach that compounds over time through relevance.",
      },
    ],
    cta: { label: "Work with Media", href: "/#contact" },
  },
  {
    id: "ventures",
    slug: "ventures",
    num: "04",
    tag: "Capital",
    title: "SKTR Ventures",
    description:
      "Patient, selective capital — deployed behind operators, products, and platforms that strengthen the wider SKTR ecosystem.",
    foot: ["Capital", "Scale"],
    kicker: "04 / Capital",
    story: "Patient capital. Ecosystem alignment. Long-term structure.",
    storyCopy:
      "Capital supports the operators, products, and platforms that fit the wider SKTR horizon — structured to hold conviction through the cycles that shake out shorter-horizon investors.",
    axisLabel: "Ventures",
    waveSettings: { intensity: 16, speed: 7.6 },
    heroImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Leadership discussion in a modern workspace",
    pillars: [
      {
        heading: "Selective by design",
        body: "SKTR Ventures doesn't optimise for volume. Every investment is evaluated against long-term fit with the wider ecosystem — not short-cycle return.",
      },
      {
        heading: "Operator-led",
        body: "Capital alone isn't the advantage. The operators, networks, and infrastructure that surround an investment are what create durable value.",
      },
      {
        heading: "Horizon thinking",
        body: "The best companies take time. We're structured to hold conviction through the cycles that shake out shorter-horizon investors.",
      },
    ],
    cta: { label: "Explore partnership", href: "/#contact" },
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}
