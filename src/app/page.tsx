import SectionAbout from "./components/landing_page/SectionAbout";
import SectionFAQ from "./components/landing_page/SectionFAQ";
import SectionFooter from "./components/landing_page/SectionFooter";
import SectionHeader from "./components/landing_page/SectionHeader";
import SectionHero from "./components/landing_page/SectionHero";

export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-5 bg-[#f0f2f5]">
        <SectionHeader />
        <SectionHero />
        <SectionAbout />
        <SectionFAQ />
        <SectionFooter />
      </div>
    </>
  );
}
