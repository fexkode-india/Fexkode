import SEO from "../components/SEO";
import ScrollReveal from "../components/ScrollReveal";

import Hero from "../Sections/Home/Hero";
import ChallengesInfrastructure from "../Sections/Home/ChallengesInfrastructure";
import HowFexkodeCreatesValue from "../Sections/Home/HowFexkodeCreatesValue";
import Clients from "../Sections/Home/Clients";
import Solutions from "../Sections/Home/Solutions";
import TechnologyCompliance from "../Sections/Home/TechnologyCompilance";
import Partnerships from "../Sections/Home/Partnerships";
import FinalCTA from "../Sections/Home/FinalCTA";



function Home() {
  return (
    <>
      <SEO
        title="Fexkode | Cloud & Technology Solutions"
        description="Fexkode helps businesses modernize infrastructure, adopt cloud technologies, and build scalable digital platforms."
        canonical="https://fexkode.com/"
        image="/fexkode-logo.jpeg"
      />

     <Hero />

<ScrollReveal>
  <ChallengesInfrastructure/>
</ScrollReveal>

<ScrollReveal>
  <Clients />
</ScrollReveal>

<ScrollReveal>
  <HowFexkodeCreatesValue />
</ScrollReveal>

<ScrollReveal>
  <Solutions/>
</ScrollReveal>

<ScrollReveal>
  <TechnologyCompliance/>
</ScrollReveal>

<ScrollReveal>
  <Partnerships />
</ScrollReveal>

<ScrollReveal>
  <FinalCTA />
</ScrollReveal>
    </>
  );
}

export default Home;