import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/TextLink";

export default function NotFound() {
  return (
    <div className="section-space">
      <Container className="max-w-3xl">
        <p className="section-kicker mb-8 after:hidden">
          <span>
            ERR
            <span className="text-muted"> / </span>
            404
          </span>
        </p>
        <h1 className="max-w-[12ch] text-[length:var(--text-page)] font-medium tracking-[-0.04em]">
          This sheet does not exist.
        </h1>
        <p className="mt-5 max-w-[32rem] text-secondary">
          The page may have been moved, or the project is hidden from the public index.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6">
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
