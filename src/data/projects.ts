import type { Project } from "@/types";

/**
 * Add, hide, feature, and reorder projects here.
 * Case study pages render automatically from this list.
 *
 * A project is public only when `published: true` and it is not `hidden`.
 * Sample entries below are unpublished on purpose.
 */
export const projects: Project[] = [
  {
    title: "Example Systems Workspace",
    slug: "example-systems-workspace",
    code: "EX-01",
    description:
      "Replace this with a concise description of a systems-level project — what it is, who it is for, and what is technically interesting.",
    longDescription:
      "Use this longer description on the case study page. Explain the project as a system: inputs, constraints, and what you actually built. This text is placeholder content and should be replaced.",
    category: "Systems",
    year: "2026",
    featured: true,
    sample: true,
    status: "active",
    order: 1,
    priority: 1,
    role: "Replace with your role — e.g. Sole builder, firmware + interface.",
    technologies: ["TypeScript", "Python", "Next.js", "Replace with a real library"],
    github: "https://github.com/your-username/example-systems-workspace",
    demo: "",
    problem:
      "State the problem in plain language. What was broken, missing, or too slow? This is placeholder copy.",
    solution:
      "Describe the system you built and why this approach was the right one. Replace this paragraph.",
    architecture:
      "Sketch the architecture in words: major modules, data flow, and the boundary between software and hardware if relevant. Replace this paragraph.",
    technicalDecisions: [
      "Replace with a real technical decision and the tradeoff you accepted.",
      "Replace with another decision — storage, language, protocol, or control approach.",
    ],
    challenges: [
      "Replace with something that was actually difficult: timing, perception, state, reliability, or interface constraints.",
    ],
    learnings: [
      "Replace with a specific lesson. Avoid generic statements such as 'I learned a lot'.",
    ],
    images: [
      {
        src: "/projects/example-systems-workspace/desktop-01.svg",
        alt: "Placeholder schematic for the example systems workspace.",
        caption: "Replace this figure with a real screenshot or diagram.",
        kind: "desktop",
      },
    ],
  },
  {
    title: "Example Perception Pipeline",
    slug: "example-perception-pipeline",
    code: "EX-02",
    description:
      "Replace this with a short description of a perception, robotics, or data-pipeline project.",
    longDescription:
      "A fuller write-up belongs here. Cover sensing, processing, and how output was consumed by the rest of the system. Placeholder text.",
    category: "Robotics",
    year: "2025",
    featured: true,
    sample: true,
    status: "complete",
    order: 2,
    priority: 2,
    role: "Replace with your role.",
    technologies: ["Python", "C++", "OpenCV", "ROS"],
    github: "https://github.com/your-username/example-perception-pipeline",
    problem: "What signal, sensor, or environment made this hard? Replace this sentence.",
    solution:
      "What pipeline did you assemble, and what did 'good enough' mean in practice? Replace this sentence.",
    technicalDecisions: [
      "Replace with a decision about models, filters, or runtime constraints.",
    ],
    learnings: ["Replace with what you would do differently on the next revision."],
  },
  {
    title: "Example Control Interface",
    slug: "example-control-interface",
    code: "EX-03",
    description:
      "Replace this with a description of a product or interface you designed for a technical system.",
    category: "Product",
    year: "2025",
    featured: true,
    sample: true,
    status: "complete",
    order: 3,
    role: "Replace with your role.",
    technologies: ["TypeScript", "React", "WebSockets"],
    demo: "https://example.com",
    problem:
      "Who needed to operate or inspect the system, and what was in their way? Replace this.",
    solution: "What did you ship, and how did it change the operator loop? Replace this.",
  },
  {
    title: "Example Open Source Tool",
    slug: "example-open-source-tool",
    code: "EX-04",
    description:
      "Replace this with a description of a small tool, library, or experiment you published.",
    category: "Open source",
    year: "2024",
    featured: true,
    sample: true,
    status: "active",
    order: 4,
    technologies: ["TypeScript", "Node.js"],
    github: "https://github.com/your-username/example-open-source-tool",
    learnings: ["Replace with a note on API design, documentation, or maintenance."],
  },
  {
    title: "Nexus",
    slug: "nexus",
    code: "EX-05",
    description: "Short placeholder. Tests a brief title and compact copy.",
    category: "Experiment",
    year: "2024",
    featured: false,
    sample: true,
    status: "archived",
    order: 10,
    technologies: ["Python"],
  },
  {
    title: "Example Project With a Longer Title to Test Wrapping",
    slug: "example-long-title-project",
    code: "EX-06",
    description:
      "This archive entry uses a longer name and a longer supporting sentence so the index layout can be checked with real-world copy length rather than only short placeholders.",
    category: "Software",
    year: "2024",
    featured: false,
    sample: true,
    status: "complete",
    order: 11,
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Linux",
      "Python",
      "C++",
      "REST",
      "WebSockets",
      "Git",
      "Replace me",
      "Another tool",
    ],
    github: "https://github.com/your-username/example-long-title-project",
  },
  {
    title: "Example Lab Notebook",
    slug: "example-lab-notebook",
    code: "EX-07",
    description:
      "Replace this with notes on an experiment that never became a full product.",
    category: "Experiment",
    year: "2023",
    featured: false,
    sample: true,
    status: "paused",
    order: 12,
  },
  {
    title: "Hidden Draft Project",
    slug: "hidden-draft-project",
    description:
      "This project is hidden. It should not appear on the homepage, archive, or sitemap.",
    featured: true,
    hidden: true,
    sample: true,
    order: 99,
    technologies: ["TypeScript"],
  },
];
