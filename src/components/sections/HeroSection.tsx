import { FocusPanel } from "@/components/identity/FocusPanel";
import { ProfileCard } from "@/components/identity/ProfileCard";
import { Container } from "@/components/layout/Container";
import { site } from "@/config/site";
import { highlightPhrase } from "@/lib/highlight";

export function HeroSection() {
  return (
    <section id="index" aria-labelledby="site-name" className="section-anchor">
      <Container
        width="wide"
        className="py-8 md:py-12 lg:flex lg:min-h-[calc(100dvh-5rem)] lg:items-center lg:py-16 xl:min-h-[calc(100dvh-1.5rem)]"
      >
        <div className="hero-stage w-full">
          <ProfileCard />
          <div className="hero-intro">
            <p className="hero-greeting">{site.greeting}</p>
            <h1 id="site-name" className="hero-name">
              I’m {site.firstName}.
            </h1>
            <p className="hero-statement">
              {site.statement.map((line) => (
                <span key={line} className="block">
                  {highlightPhrase(line, site.highlight)}
                </span>
              ))}
            </p>
            <p className="mt-7 max-w-[34rem] text-[length:var(--text-lead)] leading-7 text-secondary">
              {site.headline}
            </p>
          </div>
          <div className="hero-focus">
            <FocusPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
