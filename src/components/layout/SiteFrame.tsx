import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <SkipLink />
      <div className="site-frame">
        <span className="frame-tick frame-tick-tl" aria-hidden="true" />
        <span className="frame-tick frame-tick-tr" aria-hidden="true" />
        <span className="frame-tick frame-tick-bl" aria-hidden="true" />
        <span className="frame-tick frame-tick-br" aria-hidden="true" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
