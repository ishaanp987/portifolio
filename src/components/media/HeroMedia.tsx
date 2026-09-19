import Image from "next/image";
import { site } from "@/config/site";
import { getHeroVisual } from "@/lib/content";

/**
 * Hero still. Set `site.heroImage` (e.g. `/media/portrait.webp`) to replace
 * the brand plate. The photo fills this same frame with object-fit: cover.
 */
export function HeroMedia() {
  const visual = getHeroVisual();

  return (
    <div className="hero-media">
      <div className="hero-media-frame">
        {visual ? (
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            priority
            sizes="(min-width: 64rem) 36vw, (min-width: 40rem) 20rem, 85vw"
            className="hero-media-photo"
          />
        ) : (
          <div className="hero-media-plate" aria-hidden="true">
            <span className="hero-media-texture" />
            <span className="hero-media-mark">
              <span className="hero-media-initials">{site.initials}</span>
              <span className="hero-media-dash" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
