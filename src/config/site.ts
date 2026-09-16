export const site = {
  name: "Ishaan Patel",
  headline:
    "Building systems at the intersection of software, engineering, and products.",
  description:
    "A workspace for software, robotics, AI, and technical experiments. Replace this sentence with your own positioning.",
  focus: "Software / Engineering / Products",
  bio: "Student and builder interested in systems that sit between software, engineering, robotics, and AI. Replace this bio with a few sentences about how you work and what you want to build next.",
  about: [
    "This paragraph is a placeholder. Replace it with a concise account of what you are studying, what you like building, and the kind of work you want to do.",
    "Keep the focus on software, engineering, robotics, AI, products, and experimentation — without turning the section into an autobiography.",
  ],
  email: "your.email@example.com",
  location: "City, Country",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  resume: "",
  availability: "Replace with availability — e.g. Open to internships",
  url: "https://your-domain.example",
  locale: "en_US",
} as const;

export type SiteConfig = typeof site;
