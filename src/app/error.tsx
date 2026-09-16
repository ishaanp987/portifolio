"use client";

import { Container } from "@/components/layout/Container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="section-space">
      <Container width="wide">
        <p className="section-kicker mb-8">
          <span>
            <span className="text-accent">Err</span>
            <span className="text-muted"> / </span>
            500
          </span>
          <span className="section-kicker-rule" aria-hidden="true" />
        </p>
        <h1 className="contact-title max-w-[12ch]">Something failed to render.</h1>
        <p className="mt-6 max-w-[32rem] text-secondary">
          Try again. If this keeps happening, check the project data files for a malformed
          entry.
        </p>
        <button
          type="button"
          onClick={reset}
          className="action-link mt-10 cursor-pointer border-0 bg-transparent p-0"
        >
          Retry
          <span className="action-rule" aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
