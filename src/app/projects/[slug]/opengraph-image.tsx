import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { theme } from "@/config/theme";
import { getProjectBySlug, getVisibleProjects } from "@/lib/projects";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getVisibleProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Project";
  const description = project?.description ?? site.description;
  const code = project?.code ?? "PRJ";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: theme.background,
        color: theme.foreground,
        padding: 36,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `1px solid ${theme.border}`,
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.accent,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>CASE STUDY / {code}</span>
          <span>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 28 ? 56 : 68,
              letterSpacing: -2,
              lineHeight: 1.08,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: theme.secondary,
              lineHeight: 1.4,
              maxWidth: 860,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.muted,
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>
            {[project?.category, project?.year].filter(Boolean).join("  /  ") ||
              "Project"}
          </span>
          <span>{project?.slug ?? slug}</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
