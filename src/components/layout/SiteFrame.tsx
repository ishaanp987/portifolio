import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { site } from "@/config/site";
import { getPrimaryNavigation, getUtilityLinks } from "@/lib/navigation";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const navigation = getPrimaryNavigation();
  const utilityLinks = getUtilityLinks();

  return (
    <div className="site-shell">
      <SkipLink />
      <Header
        navigation={navigation}
        utilityLinks={utilityLinks}
        brandName={site.name}
        initials={site.initials}
      />
      <div className="site-frame">
        <main id="main">{children}</main>
        <Footer navigation={navigation} />
      </div>
    </div>
  );
}
