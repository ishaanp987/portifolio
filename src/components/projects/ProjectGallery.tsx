import Image from "next/image";
import { isRealValue } from "@/lib/content";
import type { Project, ProjectImage } from "@/types";
import { formatIndex } from "@/lib/format";

function isSvg(src: string): boolean {
  return src.toLowerCase().endsWith(".svg");
}

export function ProjectGallery({ project }: { project: Project }) {
  const images =
    project.images?.filter(
      (image) =>
        image.src && isRealValue(image.alt) && !image.src.includes("example.com"),
    ) ?? [];
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
  const caption = isRealValue(image.caption) ? image.caption : undefined;

  return (
    <figure className={compact ? "max-w-[22rem]" : "w-full min-w-0"}>
      <p className="meta mb-2">
        Fig. {formatIndex(index)}
        {image.kind ? (
          <>
            <span className="text-border-strong"> · </span>
            {image.kind}
          </>
        ) : null}
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
      {caption ? (
        <figcaption className="mt-3 max-w-[40rem] text-sm leading-6 text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
