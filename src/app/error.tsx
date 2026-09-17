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
            <span className="kicker-index">500</span>
            <span className="text-muted"> · </span>
            Error
          </span>
          <span className="section-kicker-rule" aria-hidden="true" />
        </p>
        <h1 className="contact-title max-w-[12ch]">Something failed to render.</h1>
        <p className="mt-6 max-w-[32rem] text-secondary">Try again in a moment.</p>
        <button type="button" onClick={reset} className="btn btn-primary mt-10">
          Retry
        </button>
      </Container>
    </div>
  );
}
