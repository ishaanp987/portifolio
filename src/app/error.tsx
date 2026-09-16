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
      <Container className="max-w-3xl">
        <p className="section-kicker mb-8 after:hidden">
          <span>
            ERR
            <span className="text-muted"> / </span>
            500
          </span>
        </p>
        <h1 className="max-w-[14ch] text-[length:var(--text-page)] font-medium tracking-[-0.04em]">
          Something failed to render.
        </h1>
        <p className="mt-5 max-w-[32rem] text-secondary">
          Try again. If this keeps happening, check the project data files for a malformed
          entry.
        </p>
        <button
          type="button"
          onClick={reset}
          className="action-link mt-8 cursor-pointer border-0 bg-transparent p-0"
        >
          Retry
        </button>
      </Container>
    </div>
  );
}
