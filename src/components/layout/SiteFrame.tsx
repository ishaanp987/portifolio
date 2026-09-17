import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <SkipLink />
      <Header />
      <div className="site-frame">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
