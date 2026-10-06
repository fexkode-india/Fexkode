import SEO from "../components/SEO";
import Button from "../components/Button";
import PageHero from "../components/PageHero";
import ScrollReveal from "../components/ScrollReveal";

const capabilities = [
  {
    number: "01",
    title: "Cloud",
    description:
      "Helping businesses adopt cloud technologies and build scalable digital platforms.",
  },
  {
    number: "02",
    title: "Infrastructure",
    description:
      "Building modern infrastructure foundations designed for reliability and scale.",
  },
  {
    number: "03",
    title: "DevOps",
    description:
      "Applying modern DevOps practices to improve infrastructure and software delivery.",
  },
  {
    number: "04",
    title: "Automation",
    description:
      "Using automation to simplify infrastructure and make operations more efficient.",
  },
  {
    number: "05",
    title: "Security",
    description:
      "Building infrastructure with security considered throughout the technology environment.",
  },
  {
    number: "06",
    title: "Modernization",
    description:
      "Helping businesses modernize infrastructure and prepare technology for changing needs.",
  },
];

function About() {
  return (
    <>
      <SEO
        title="About Fexkode | Cloud Technology Company"
        description="Learn about Fexkode, an India-based cloud technology company focused on cloud infrastructure, DevOps, automation, security, and modernization."
        canonical="https://fexkode.com/about"
      />

      <main className="min-h-screen pt-20">

        <PageHero
          eyebrow="About Fexkode"
          title="Building Better Cloud Infrastructure"
          description="Fexkode is an India-based cloud technology company focused on helping businesses modernize infrastructure, adopt cloud technologies and build scalable digital platforms."
          image="/src/assets/images/page-heros/about.png"
        />

        {/* Company Introduction — Light */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:px-8">

            <div>
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Who We Are
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Cloud technology built for modern businesses.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p>
                Fexkode is an India-based cloud technology company focused on
                helping businesses modernize infrastructure, adopt cloud
                technologies and build scalable digital platforms.
              </p>

              <p>
                Our core capabilities span cloud, infrastructure, DevOps,
                automation, security, and modernization.
              </p>
            </div>

          </div>
        </section>

        {/* Core Capabilities — Dark */}
        <section className="border-y border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Core Capabilities
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                What Fexkode does.
              </h2>

              <h3 className="mt-6 text-sm font-normal leading-7 text-slate-400 sm:text-base">
                Our capabilities support modern cloud infrastructure and
                scalable digital platforms.
              </h3>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2">

              {capabilities.map((capability, idx) => (
                <ScrollReveal key={capability.number} className={`delay-${(idx % 2 + 1) * 100}`}>
                  <article
                    className="h-full rounded-2xl border border-white/10 bg-deepBlue/30 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan/50 hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)]"
                  >
                    <span className="text-xs font-semibold tracking-[0.15em] text-cyan/60">
                      {capability.number}
                    </span>

                    <h3 className="mt-7 text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-400">
                      {capability.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-400">
                      {capability.description}
                    </p>
                  </article>
                </ScrollReveal>
              ))}

            </div>
          </div>
        </section>

        {/* Mission & Vision — Light */}
        <section className="border-b border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12 lg:p-16">

              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Mission & Vision
              </h1>

              <div className="mt-5 grid gap-10 lg:grid-cols-2">

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    Mission
                  </h2>

                  <p className="mt-6 text-base leading-8 text-slate-600">
                    Make modern cloud infrastructure simpler, safer and easier
                    to scale.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    Vision
                  </h2>

                  <p className="mt-6 text-base leading-8 text-slate-600">
                    Build technology infrastructure that is ready for what's
                    next.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* CTA — Dark */}
        <section className="border-t border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

            <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
              Let's Build
            </h1>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Building better cloud infrastructure.
            </h2>

            <h3 className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base">
              Fexkode helps businesses modernize infrastructure, adopt cloud
              technologies and build scalable digital platforms.
            </h3>

            <div className="mt-9 flex justify-center">
              <Button to="/contact">
                Talk to an Expert
              </Button>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}

export default About;