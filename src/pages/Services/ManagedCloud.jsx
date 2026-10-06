import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import PageHero from "../../components/PageHero";
import ScrollReveal from "../../components/ScrollReveal";

const capabilities = [
  "24/7 infrastructure monitoring",
  "Cloud performance management",
  "Incident response and support",
  "Infrastructure maintenance",
  "Cloud cost optimization",
  "Operational reporting",
];

const serviceSteps = [
  [
    "01",
    "Monitor",
    "Track infrastructure health, availability, performance, and important operational signals.",
  ],
  [
    "02",
    "Respond",
    "Identify issues quickly and take appropriate action to reduce operational impact.",
  ],
  [
    "03",
    "Optimize",
    "Use operational insights to improve performance, reliability, and infrastructure efficiency.",
  ],
];

function ManagedCloud() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <SEO
        title="Managed Cloud Services | Fexkode"
        description="Fexkode provides managed cloud services for infrastructure monitoring, performance management, incident response, maintenance, cost optimization, and reliable cloud operations."
        canonical="/solutions/managed-cloud"
      />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <PageHero
          eyebrow="Managed Cloud"
          title="Keep your cloud reliable, secure, and ready to scale."
          description="Managed cloud services that help teams operate infrastructure efficiently while maintaining visibility, performance, and reliability."
          image="/src/assets/images/page-heros/managed-cloud.png"
          buttonText="Discuss Managed Cloud"
          buttonLink="/contact"
        />

        {/* Overview */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <ScrollReveal>
                <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                  Managed Infrastructure
                </h1>
              </ScrollReveal>

              <ScrollReveal className="delay-100">
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Spend less time managing infrastructure.
                </h2>
              </ScrollReveal>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <ScrollReveal className="delay-150">
                <p>
                  Cloud environments require continuous attention. Monitoring,
                  maintenance, performance, security, and cost management all
                  contribute to reliable operations.
                </p>
              </ScrollReveal>

              <ScrollReveal className="delay-200">
                <p>
                  Managed cloud services provide the operational support needed to
                  keep infrastructure healthy while allowing internal teams to
                  focus on applications and business priorities.
                </p>
              </ScrollReveal>

              <ScrollReveal className="delay-250">
                <p>
                  Our approach emphasizes visibility, proactive operations, and
                  continuous improvement.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Capabilities — Interactive Status Pulse Grid */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ScrollReveal>
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Capabilities
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Operational support for your cloud environment.
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <ScrollReveal
                  key={capability}
                  className={`delay-${((index % 3) + 1) * 100}`}
                >
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-deepBlue/30 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/5">
                    {/* Top row: Counter & Live Status indicator */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold tracking-[0.15em] text-cyan">
                        0{index + 1}
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-40 group-hover:opacity-80" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan/70 group-hover:bg-cyan" />
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {capability}
                    </h3>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Service Model — Interactive Stage Progression */}
        <section className="border-b border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <ScrollReveal>
                <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                  Service Model
                </h1>
              </ScrollReveal>

              <ScrollReveal className="delay-100">
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Visibility first. Action when it matters.
                </h2>
              </ScrollReveal>

              <ScrollReveal className="delay-150">
                <h3 className="mt-6 text-sm font-normal leading-7 text-slate-600 sm:text-base">
                  Effective managed infrastructure combines monitoring,
                  operational processes, automation, and continuous improvement.
                </h3>
              </ScrollReveal>
            </div>

            <div
              className="mt-14 grid gap-5 md:grid-cols-3"
              onMouseLeave={() => setActiveStep(0)}
            >
              {serviceSteps.map(([number, title, description], index) => {
                const isActive = activeStep === index;

                return (
                  <ScrollReveal
                    key={number}
                    className={`delay-${((index % 3) + 1) * 100}`}
                  >
                    <article
                      tabIndex={0}
                      onMouseEnter={() => setActiveStep(index)}
                      onFocus={() => setActiveStep(index)}
                      onClick={() => setActiveStep(index)}
                      className={`relative h-full cursor-pointer overflow-hidden rounded-2xl border bg-white p-7 shadow-sm transition-all duration-300 hover:border-cyan/40 hover:shadow-md ${
                        isActive
                          ? "-translate-y-2 border-cyan/60 shadow-xl shadow-cyan/5 ring-1 ring-cyan/30"
                          : "border-slate-200"
                      }`}
                    >
                      {/* Active top progress line */}
                      <span
                        className={`absolute left-0 top-0 h-[3px] bg-cyan transition-all duration-500 ${
                          isActive ? "w-full" : "w-0"
                        }`}
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-[0.15em] text-cyan">
                          {number}
                        </span>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
                            isActive ? "text-cyan" : "text-slate-400"
                          }`}
                        >
                          Step {number}
                        </span>
                      </div>

                      <h3
                        className={`mt-6 text-xl font-semibold text-slate-900 transition-transform duration-300 ${
                          isActive ? "translate-x-1" : ""
                        }`}
                      >
                        {title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {description}
                      </p>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <ScrollReveal>
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Need help operating your cloud?
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h3 className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base">
                Let's discuss your current environment and the level of
                operational support you need.
              </h3>
            </ScrollReveal>

            <ScrollReveal className="delay-200">
              <a
                href="/contact"
                className="mt-9 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-electric/25 transition-all duration-300 hover:bg-electric/90 hover:scale-105 active:scale-95"
              >
                Talk to an Expert
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}

export default ManagedCloud;