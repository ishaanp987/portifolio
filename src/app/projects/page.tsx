import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProjectIndex } from "@/components/projects/ProjectIndex";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { getPublishedProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const projects = getPublishedProjects();
  if (projects.length === 0) {
    return {
      title: "Projects",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: "Projects",
    description: `Project index — ${site.name}.`,
    alternates: {
      canonical: "/projects",
    },
  };
}

export default function ProjectsPage() {
  const projects = getPublishedProjects();
  if (projects.length === 0) {
    redirect("/");
  }

  return (
    <div className="section-space">
      <Container width="wide">
        <SectionHeading index="01" label="Index" />
        <h1 className="contact-title max-w-[12ch] text-foreground">All projects</h1>
        <p className="mt-6 max-w-[36rem] text-secondary">A register of published work.</p>
        <div className="mt-12">
          <ProjectIndex projects={projects} />
        </div>
      </Container>
    </div>
  );
}
