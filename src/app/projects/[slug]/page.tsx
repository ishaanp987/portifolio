import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { site } from "@/config/site";
import { isRealValue } from "@/lib/content";
import { formatProjectIndex, getProjectBySlug, getVisibleProjects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getVisibleProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }

  const description = isRealValue(project.description)
    ? project.description
    : `${project.title} — ${site.name}`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: `/projects/${project.slug}`,
      siteName: site.name,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const visible = getVisibleProjects();
  const index = visible.findIndex((item) => item.slug === project.slug);

  return <CaseStudy project={project} sequenceLabel={formatProjectIndex(index)} />;
}
