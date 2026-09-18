export const site = {
  name: "Ishaan Patel",
  firstName: "Ishaan",
  lastName: "Patel",
  initials: "IP",
  role: "Software / Engineering",
  greeting: "Hey —",
  statement: ["I build software and", "engineered systems."],
  highlight: "engineered systems",
  headline:
    "Building systems at the intersection of software, engineering, and products.",
  description:
    "Building systems at the intersection of software, engineering, and products.",
  focus: "Software / Engineering / Products",
  disciplines: ["Engineering", "Software", "Systems"],
  focusAreas: ["Software", "Robotics", "AI", "Engineering", "Products"],
  bio: "Student and builder interested in systems that sit between software, engineering, robotics, and AI. I build software and engineered systems at the intersection of software, engineering, and products.",
  about: [
    "Student and builder interested in systems that sit between software, engineering, robotics, and AI. I build software and engineered systems — work that lives at the intersection of software, engineering, and products.",
    "I keep returning to software, robotics, AI, engineering, and products: the fields where something has to work as both software and an engineered system. That thread — software and engineered systems — is what I want the work to keep circling.",
  ],
  personalNote: "Software and engineered systems.",
  currentlyBuilding: "",
  contactHeading: ["Have something", "worth building?"],
  contactCta: "Let’s talk",
  email: "your.email@example.com",
  location: "City, Country",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  resume: "",
  availability: "Replace with availability — e.g. Open to internships",
  avatar: "",
  heroImage: "",
  heroImageAlt: "",
  url: "https://your-domain.example",
  locale: "en_US",
} as const;

export type SiteConfig = typeof site;
