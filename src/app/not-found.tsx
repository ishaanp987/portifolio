import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";

export default function NotFound() {
  return (
    <div className="section-space">
      <Container width="wide">
        <p className="section-kicker mb-10">
          <span>
            <span className="text-accent">Err</span>
            <span className="text-muted"> / </span>
            404
          </span>
          <span className="section-kicker-rule" aria-hidden="true" />
        </p>
        <h1 className="contact-title max-w-[12ch]">This page does not exist.</h1>
        <p className="mt-6 max-w-[32rem] text-secondary">
          The page may have been moved, or the project is hidden from the public index.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-6">
          <TextLink href="/" variant="action">
            Return home
          </TextLink>
          <TextLink href="/projects" variant="ghost">
            Project index
          </TextLink>
        </div>
      </Container>
    </div>
  );
}
