// Author bios and profile pictures
// Pictures live in public/authors/<slug>.jpg — if missing, initials are shown
// Format: slug is lowercase, spaces → hyphens, special chars removed

interface AuthorInfo {
  bio: string;
}

const authors: Record<string, AuthorInfo> = {
  "escience-editorial-team": {
    bio: "The eScience Center Blog editorial team, bringing you the latest in research software engineering.",
  },
  "pablo-rodriguez-sanchez": {
    bio: "Research Software Engineer at the Netherlands eScience Center. Interested in storytelling, mathematics, and scientific communication.",
  },
  "florian-huber": {
    bio: "Research Software Engineer specializing in machine learning, mass spectrometry, and scientific Python.",
  },
  "peter-kalverla": {
    bio: "Research Software Engineer focused on climate science, weather modeling, and open data.",
  },
  "patrick-bos": {
    bio: "Research Software Engineer working on high-performance computing, C++, and build systems.",
  },
  "sonja-georgievska": {
    bio: "Research Software Engineer exploring explainable AI, machine learning, and data science.",
  },
  "lourens-veen": {
    bio: "Research Software Engineer with interests in programming languages, software sustainability, and design.",
  },
  "johan-hidding": {
    bio: "Research Software Engineer. Enthusiastic about reproducible science, functional programming, and clear communication.",
  },
  "carlos-martinez-ortiz": {
    bio: "Research Software Engineer working on software sustainability, community building, and linked data.",
  },
  "abel-soares-siqueira": {
    bio: "Research Software Engineer specializing in Julia, high-performance computing, and optimization.",
  },
  "netherlands-escience-center": {
    bio: "The Netherlands eScience Center — the Dutch national centre of expertise for research software.",
  },
  "maarten-van-meersbergen": {
    bio: "Research Software Engineer with a passion for visualization, computer graphics, and data storytelling.",
  },
  "flavio-hafner": {
    bio: "Research Software Engineer working on privacy-preserving machine learning and statistical methods.",
  },
  "felipe": {
    bio: "Research Software Engineer focused on C++, web services, and scientific simulation data management.",
  },
  "candace-moore": {
    bio: "Research Software Engineer exploring the intersection of AI, ethics, and healthcare.",
  },
  "ben-van-werkhoven": {
    bio: "Research Software Engineer specializing in GPU computing, auto-tuning, and high-performance code.",
  },
  "aron": {
    bio: "Research Software Engineer working on molecular simulations and machine learning for chemistry.",
  },
  "stef-smeets": {
    bio: "Research Software Engineer. Builds tools, dashboards, and enjoys reducing, reusing, and recycling code.",
  },
  "malte-luken": {
    bio: "Research Software Engineer working on statistics, JASP, and speech processing.",
  },
  "lieke-de-boer": {
    bio: "Research Software Engineer interested in open science, research culture, and software communities.",
  },
  "hanno-spreeuw": {
    bio: "Research Software Engineer tracking eScience trends and building scientific software infrastructure.",
  },
  "faruk-diblen": {
    bio: "Research Software Engineer working on scientific data visualization, software citation, and recognition.",
  },
  "carsten-schnober": {
    bio: "Research Software Engineer exploring natural language processing, FAIR principles, and AI ethics.",
  },
  "bart-schilperoort": {
    bio: "Research Software Engineer. GPU enthusiast, Julia advocate, and builder of scientific tools.",
  },
  "jesse-gonzalez": {
    bio: "Research Software Engineer and product builder. Working on LLMs, storytelling, and developer tools.",
  },
  "victor-azizi": {
    bio: "Research Software Engineer with a passion for Fortran, legacy code, and making old things new again.",
  },
  "robin-richardson": {
    bio: "Research Software Engineer promoting nanopublications, linked data, and semantic web technologies.",
  },
  "gijs-van-den-oord": {
    bio: "Research Software Engineer working on climate modeling, machine learning, and IPCC assessment reports.",
  },
};

// Get author info by display name
export function getAuthorInfo(name: string): AuthorInfo | null {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return authors[slug] || null;
}

// Get author picture path
export function getAuthorPic(name: string): string {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `/authors/${slug}.jpg`;
}

// Get author initials for fallback
export function getAuthorInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}
