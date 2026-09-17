import Image from "next/image";
import type { Project, ProjectImage } from "@/types";
import { formatIndex } from "@/lib/format";

function isSvg(src: string): boolean {
  return src.toLowerCase().endsWith(".svg");
}

export function ProjectGallery({ project }: { project: Project }) {
  const images = project.images?.filter((image) => image.src && image.alt) ?? [];
  if (images.length === 0) return null;

  return (
    <div className="grid gap-10">
      {images.map((image, index) => (
        <ProjectFigure key={`${image.src}-${index}`} image={image} index={index} />
      ))}
    </div>
  );
}

function ProjectFigure({ image, index }: { image: ProjectImage; index: number }) {
  const compact = image.kind === "mobile";

  return (
    <figure className={compact ? "max-w-[22rem]" : "w-full min-w-0"}>
      <p className="meta mb-2">
        Fig. {formatIndex(index)}
        <span className="text-border-strong"> / </span>
        {image.kind ?? "Still"}
      </p>
      <div
        className={["media-frame", compact ? "aspect-[9/19]" : "media-wide"].join(" ")}
      >
        {isSvg(image.src) ? (
          // SVGs are authored assets; next/image does not optimize them.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.src}
            alt={image.alt}
            className="media-zoom absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              compact
                ? "(min-width: 768px) 22rem, 100vw"
                : "(min-width: 1024px) 72rem, 100vw"
            }
            className="media-zoom object-cover"
          />
        )}
      </div>
      {image.caption ? (
        <figcaption className="mt-3 max-w-[40rem] text-sm leading-6 text-muted">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
