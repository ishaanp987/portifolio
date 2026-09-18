export type SocialLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type HomepageSectionId =
  | "hero"
  | "projects"
  | "building"
  | "facts"
  | "experience"
  | "skills"
  | "about"
  | "contact";

export type HomepageSectionConfig = {
  id: HomepageSectionId;
  enabled: boolean;
  order: number;
};

export type ProjectStatus = "active" | "complete" | "paused" | "archived" | "wip";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  kind?: "desktop" | "mobile" | "other";
};

export type Project = {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category?: string;
  year?: string;
  featured?: boolean;
  hidden?: boolean;
  sample?: boolean;
  status?: ProjectStatus | string;
  priority?: number;
  order?: number;
  code?: string;
  role?: string;
  technologies?: string[];
  github?: string;
  demo?: string;
  coverImage?: string;
  coverAlt?: string;
  images?: ProjectImage[];
  problem?: string;
  solution?: string;
  architecture?: string;
  technicalDecisions?: string[];
  challenges?: string[];
  learnings?: string[];
  video?: string;
};

export type Experience = {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  link?: string;
  hidden?: boolean;
  sample?: boolean;
};

export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export type ProfileFact = {
  label: string;
  value: string;
};
