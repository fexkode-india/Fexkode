import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import webDevelopmentImage from "../assets/images/page-heros/web-development.png";

function WebDevelopment() {
  return (
    <>
      <SEO
        title="Web Development | Fexkode"
        description="Fexkode designs and builds responsive, secure, and scalable websites and web applications for growing businesses."
        canonical="/web-development"
      />
      <main className="min-h-screen pt-20">
        <PageHero
          eyebrow="Web Development"
          title={<>Fast, modern websites<br /><span className="text-slate-400">built to scale.</span></>}
          description="We design and build responsive websites and web applications that are fast, secure and easy to grow."
          image={webDevelopmentImage}
          buttonText="Talk to an Expert"
          buttonLink="/contact"
        />
      </main>
    </>
  );
}

export default WebDevelopment;
