import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import PageHero from "../../components/PageHero";
import ScrollReveal from "../../components/ScrollReveal";

const capabilities = [
  "Migration assessment and planning",
  "Application and workload migration",
  "Cloud architecture design",
  "Infrastructure automation",
  "Migration validation and optimization",
  "Post-migration support",
];

const processSteps = [
  [
    "01",
    "Assessment",
    "Understand workloads, dependencies, risks, and business priorities.",
  ],
  [
    "02",
    "Plan",
    "Define the migration strategy, target architecture, and execution plan.",
  ],
  [
    "03",
    "Migrate",
    "Move prioritized workloads while maintaining operational control.",
  ],
  [
    "04",
    "Optimize",
    "Validate the environment and improve reliability, performance, and efficiency.",
  ],
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Card with a soft cyan glow that follows the mouse + a small lift on hover */
function SpotlightCard({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/5 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(0,200,255,0.16), transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* Button that gently follows the cursor */
function MagneticLink({ href, className = "", children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </a>
  );
}

function CloudMigration() {
  // Hovered / focused step in "Migration Process" (null = none)
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      <SEO
        title="Cloud Migration | Fexkode"
        description="Fexkode helps organizations plan and execute secure, reliable, and scalable cloud migrations with structured assessment, architecture, automation, and post-migration support."
        canonical="/solutions/cloud-migration"
      />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <PageHero
          eyebrow="Cloud Migration"
          title="Move to the cloud without losing control."
          description="Plan and execute cloud migrations with a structured approach focused on reliability, security, scalability, and business continuity."
          image="/src/assets/images/page-heros/cloud-migration.png"
          buttonText="Discuss Your Migration"
          buttonLink="/contact"
        />

        {/* Overview — Light */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <ScrollReveal>
                <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                  Migration Strategy
                </h1>
              </ScrollReveal>

              <ScrollReveal className="delay-100">
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  A migration plan built around your environment.
                </h2>
              </ScrollReveal>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <ScrollReveal className="delay-150">
                <p>
                  Cloud migration is more than moving servers from one location
                  to another. Applications, dependencies, data, security, and
                  operational processes all need to be considered.
                </p>
              </ScrollReveal>

              <ScrollReveal className="delay-200">
                <p>
                  We use a structured approach to understand the existing
                  environment, identify migration priorities, design the target
                  architecture, and support the transition.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Capabilities — Dark */}
        <section className="border-y border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ScrollReveal>
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Capabilities
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                What we can help with.
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <ScrollReveal
                  key={capability}
                  className={`delay-${((index % 3) + 1) * 100}`}
                >
                  <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-deepBlue/30 p-6">
                    <span className="text-xs font-semibold tracking-[0.15em] text-cyan/60 transition-colors duration-300 group-hover:text-cyan">
                      0{index + 1}
                    </span>

                    <h3 className="mt-5 text-lg font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {capability}
                    </h3>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process — Light */}
        <section className="border-b border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <ScrollReveal>
                <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                  Migration Process
                </h1>
              </ScrollReveal>

              <ScrollReveal className="delay-100">
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  From assessment to a stable cloud environment.
                </h2>
              </ScrollReveal>
            </div>

            <div
              className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
              onMouseLeave={() => setActiveStep(null)}
              onBlur={() => setActiveStep(null)}
            >
              {processSteps.map(([number, title, description], index) => {
                const reached = activeStep !== null && index <= activeStep;
                const isActive = activeStep === index;

                return (
                  <ScrollReveal
                    key={number}
                    className={`delay-${((index % 4) + 1) * 100}`}
                  >
                    <article
                      tabIndex={0}
                      onMouseEnter={() => setActiveStep(index)}
                      onFocus={() => setActiveStep(index)}
                      onClick={() => setActiveStep(index)}
                      className={`relative h-full overflow-hidden rounded-2xl border bg-white p-7 shadow-sm outline-none transition-all duration-300 hover:border-cyan/40 hover:shadow-md ${
                        isActive
                          ? "-translate-y-1.5 border-cyan/40 shadow-md"
                          : "border-slate-200"
                      }`}
                    >
                      {/* Progress line: fills up to the hovered step */}
                      <span
                        className="absolute left-0 top-0 h-[2px] bg-cyan transition-all duration-500 ease-out"
                        style={{
                          width: reached ? "100%" : "0%",
                          transitionDelay: reached ? `${index * 70}ms` : "0ms",
                        }}
                      />

                      <span
                        className={`text-xs font-semibold tracking-[0.15em] transition-colors duration-300 ${
                          isActive ? "text-cyan" : "text-cyan/80"
                        }`}
                      >
                        {number}
                      </span>

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

        {/* CTA — Dark */}
        <section className="border-t border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <ScrollReveal>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Planning a cloud migration?
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h3 className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base">
                Start with a conversation about your current infrastructure and
                migration goals.
              </h3>
            </ScrollReveal>

            <ScrollReveal className="delay-200">
              <MagneticLink
                href="/contact"
                className="mt-9 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-electric/25 transition duration-300 hover:bg-electric/90 hover:scale-105"
              >
                Talk to an Expert
              </MagneticLink>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}

export default CloudMigration;