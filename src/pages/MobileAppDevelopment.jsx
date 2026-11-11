import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import mobileAppDevelopmentHeroImage from "../assets/images/page-heros/mobile-app-development.png";

function MobileAppDevelopment() {
  return (
    <>
      <SEO
        title="Mobile App Development | Fexkode"
        description="Fexkode builds reliable Android and iOS mobile applications, from product planning through launch and ongoing growth."
        canonical="/mobile-app-development"
      />
      <main className="min-h-screen pt-20">
        <PageHero
          eyebrow="Mobile App Development"
          title="Android and iOS apps built to scale."
          description="We design and build reliable mobile apps for Android and iOS, from first idea to store launch and beyond."
          image={mobileAppDevelopmentHeroImage}
          buttonText="Talk to an Expert"
          buttonLink="/contact"
        />
      </main>
    </>
  );
}

export default MobileAppDevelopment;
