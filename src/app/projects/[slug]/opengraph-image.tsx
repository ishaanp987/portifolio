import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { theme } from "@/config/theme";
import { publicText } from "@/lib/content";
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
  const description = publicText(project?.description) ?? site.headline;
  const code = publicText(project?.code) ?? "Project";

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
          background: theme.backgroundSecondary,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: theme.accent,
            fontSize: 20,
          }}
        >
          <span>{code}</span>
          <span>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: title.length > 28 ? 54 : 68,
              letterSpacing: 0,
              lineHeight: 1.06,
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
          }}
        >
          <span>
            {[project?.category, project?.year].filter(Boolean).join("  /  ") ||
              "Case study"}
          </span>
          <span>{project?.year ?? ""}</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
