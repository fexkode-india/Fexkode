import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import learnCloudImage from "../assets/images/page-heros/learn-cloud.png";

function Training() {
  return (
    <>
      <SEO
        title="Coding & Cloud Training | Fexkode"
        description="Fexkode offers hands-on coding and cloud training built around practical projects and real engineering skills."
        canonical="/training"
      />
      <main className="min-h-screen pt-20">
        <PageHero
          eyebrow="Coding & Cloud Training"
          title={<>Learn to code.<br /><span className="text-slate-400">Learn the cloud.</span></>}
          description="Hands-on training in programming and cloud technologies, taught by working engineers and built around real projects."
          image={learnCloudImage}
          buttonText="Enquire About Training"
          buttonLink="/contact"
        />
      </main>
    </>
  );
}

export default Training;
