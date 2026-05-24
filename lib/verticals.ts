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
      "An athlete development company. We build the systems, coaching infrastructure, and performance technology behind elite athletes.",
    foot: ["Performance", "Systems"],
    kicker: "01 - SKTR Athletics",
    story: "Where human performance meets operating infrastructure.",
    storyCopy:
      "We build the systems behind athletes — connecting coaching, analytics, and development into one operating model.",
    axisLabel: "Athletics",
    waveSettings: { intensity: 18, speed: 8.6 },
    heroImage:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=80",
    heroImageAlt: "Runner competing on a track",
    pillars: [
      {
        heading: "Coaching infrastructure",
        body: "Coach-athlete relationships built on defined protocols, shared data, and consistent methodology — not informal arrangements that can't scale or transfer.",
      },
      {
        heading: "Performance analytics",
        body: "Every session, movement pattern, and metric captured and interpreted. Data that informs coaching decisions — not just decorates a dashboard.",
      },
      {
        heading: "Long-arc development",
        body: "Development measured in careers, not seasons. The operating model compounds — the longer an athlete is in the system, the stronger the foundation under their performance.",
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
      "A software and technology company. We build the digital tools, platforms, and infrastructure that power the SKTR group.",
    foot: ["Experiments", "Infrastructure"],
    kicker: "02 - SKTR Labs",
    story: "The engine that makes everything else possible.",
    storyCopy:
      "Every tool, platform, and system built across SKTR starts here. Labs turns research into infrastructure that scales.",
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
      "A media company. We produce editorial content, film, and video.",
    foot: ["Editorial", "Distribution"],
    kicker: "03 - SKTR Media",
    story: "A media company that makes things worth keeping.",
    storyCopy:
      "Editorial, film, and video — produced with intention, not on a content calendar.",
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
      "The investment arm of the SKTR group. We back operators, products, and companies built for the long term.",
    foot: ["Capital", "Scale"],
    kicker: "04 - SKTR Ventures",
    story: "Patient capital. Long-term conviction. No artificial timelines.",
    storyCopy:
      "We back operators and companies that fit the SKTR horizon — structured to hold conviction through the cycles that shake out shorter-horizon investors.",
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
