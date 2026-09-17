import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { getPrimaryNavigation, getUtilityLinks } from "@/lib/navigation";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const navigation = getPrimaryNavigation();
  const utilityLinks = getUtilityLinks();

  return (
    <div className="site-shell">
      <SkipLink />
      <Header navigation={navigation} utilityLinks={utilityLinks} />
      <div className="site-frame">
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
