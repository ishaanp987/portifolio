import { Container } from "@/components/layout/Container";
import { RegistrationMark } from "@/components/media/RegistrationMark";
import { Reveal } from "@/components/motion/Reveal";
import { getInterludeTerms } from "@/lib/content";
import { getSectionIndex } from "@/lib/sections";

export function InterludeSection() {
  const terms = getInterludeTerms();
  if (terms.length < 2) return null;

  return (
    <section className="interlude" aria-label={terms.join(" × ")}>
      <Container width="wide" className="interlude-shell">
        <Reveal>
          <div className="interlude-kicker">
            <span className="meta m-0">{getSectionIndex("skills")} / Field</span>
            <span className="section-kicker-rule" aria-hidden="true" />
            <RegistrationMark />
          </div>
          <p className="interlude-board">
            {terms.map((term, index) => (
              <span key={term} className="interlude-term">
                {index > 0 ? (
                  <span className="interlude-times" aria-hidden="true">
                    ×
                  </span>
                ) : null}
                {term}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
