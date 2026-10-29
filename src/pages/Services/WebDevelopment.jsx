import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";
import webDevImg from "../assets/images/page-heros/web-development.png";

const capabilities = [
  "Business websites",
  "Web applications and dashboards",
  "E-commerce platforms",
  "API and backend development",
  "Performance and SEO optimization",
  "Maintenance and support",
    "UI/UX design",
];

const processSteps = [
  ["01", "Discover", "Understand your goals, users, and requirements."],
  ["02", "Design", "Plan the structure, interface, and user experience."],
  ["03", "Build", "Develop, test, and refine the product."],
  ["04", "Launch", "Deploy, monitor, and support after go-live."],
];

function WebDevelopment() {
  return (
    <>
      <SEO
        title="Web Development | Fexkode"
        description="Fexkode builds fast, secure, and scalable websites and web applications."
        canonical="/web-development"
      />

      <main className="min-h-screen pt-20">
        <PageHero
          eyebrow="Web Development"
          title="Websites and web apps built to scale."
          description="Fast, secure, and modern web solutions designed around your business."
          image={webDevImg}
          buttonText="Start Your Project"
          buttonLink="/contact"
        />

        <section className="border-y border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Capabilities
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item, i) => (
                <ScrollReveal key={item}>
                  <div className="h-full rounded-2xl border border-white/10 bg-deepBlue/30 p-6">
                    <span className="text-xs font-semibold tracking-[0.15em] text-cyan/60">
                      0{i + 1}
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{item}</h3>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ScrollReveal>
              <h2 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Our Process
              </h2>
            </ScrollReveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(([n, title, desc]) => (
                <ScrollReveal key={n}>
                  <article className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <span className="text-xs font-semibold tracking-[0.15em] text-cyan">{n}</span>
                    <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{desc}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default WebDevelopment;