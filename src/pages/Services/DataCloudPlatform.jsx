import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import PageHero from "../../components/PageHero";

const capabilities = [
  "Cloud data platform design",
  "Data storage and processing",
  "Data pipeline architecture",
  "Cloud-native data workloads",
  "Data integration",
  "Platform monitoring and optimization",
];

const approachSteps = [
  [
    "01",
    "Understand",
    "Identify data sources, workloads, dependencies, and platform requirements.",
  ],
  [
    "02",
    "Design",
    "Define the cloud architecture, data flows, storage, and processing approach.",
  ],
  [
    "03",
    "Build",
    "Implement the platform and integrate the required data workloads.",
  ],
  [
    "04",
    "Optimize",
    "Improve platform reliability, scalability, performance, and operational efficiency.",
  ],
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Scroll reveal: content slides in (and fades in) as it scrolls into view.
    "left" - slides in from the side (headings)
    "up"   - slides up into place (text, cards, button)
  When the animation ends the inline style is removed, so the element's
  own hover effects work exactly as designed.
*/
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const HIDDEN = {
  left: { opacity: 0, transform: "translate3d(-56px, 0, 0)" },
  up: { opacity: 0, transform: "translate3d(0, 48px, 0)" },
};

const SHOWN = { opacity: 1, transform: "none" };

function useReveal(delay = 0, variant = "up") {
  const ref = useRef(null);
  const [state, setState] = useState(() =>
    prefersReducedMotion() ? "done" : "hidden"
  ); // hidden -> shown -> done

  useEffect(() => {
    const el = ref.current;
    if (!el || state !== "hidden") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [state]);

  useEffect(() => {
    if (state !== "shown") return;
    const timer = setTimeout(() => setState("done"), delay + 1100);
    return () => clearTimeout(timer);
  }, [state, delay]);

  if (state === "done") return [ref, undefined];

  return [
    ref,
    {
      ...(state === "shown" ? SHOWN : HIDDEN[variant]),
      transition: `opacity 900ms ${EASE} ${delay}ms, transform 900ms ${EASE} ${delay}ms`,
    },
  ];
}

function Reveal({ as: Tag = "div", delay = 0, variant = "up", className, children }) {
  const [ref, style] = useReveal(delay, variant);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

/* Capability card: a "data flow" line runs across the bottom on hover */
function FlowCard({ children, className = "", delay = 0 }) {
  const [ref, style] = useReveal(delay, "up");

  return (
    <div
      ref={ref}
      style={style}
      className={`group relative overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan/40 ${className}`}
    >
      {children}

      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-cyan to-electric transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </div>
  );
}

/* Approach step: a cyan wash sweeps across the card from left to right */
function ApproachStep({ step, index }) {
  const [number, title, description] = step;
  const [ref, style] = useReveal(index * 110, "up");

  return (
    <article
      ref={ref}
      style={style}
      tabIndex={0}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-md focus:border-cyan/30 focus:shadow-md"
    >
      <span className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-cyan/10 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100 group-focus:scale-x-100" />

      <div className="relative">
        <span className="inline-block text-xs font-semibold tracking-[0.15em] text-cyan transition-all duration-500 group-hover:tracking-[0.35em] group-focus:tracking-[0.35em]">
          {number}
        </span>

        <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>

        <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  );
}

/* CTA button: a white fill slides up from the bottom on hover */
function FillButton({ href, delay = 0, children }) {
  const [ref, style] = useReveal(delay, "up");

  return (
    <a
      ref={ref}
      style={style}
      href={href}
      className="group relative mt-9 inline-flex overflow-hidden rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-electric/90"
    >
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />

      <span className="relative transition-colors duration-500 group-hover:text-slate-900">
        {children}
      </span>
    </a>
  );
}

function DataCloudPlatform() {
  return (
    <>
      <SEO
        title="Data & Cloud Platform | Fexkode"
        description="Fexkode helps organizations design scalable cloud data platforms for data storage, processing, integration, cloud-native workloads, monitoring, and optimization."
        canonical="/solutions/data-cloud-platform"
      />

      <main className="min-h-screen pt-20">

        {/* Hero */}
        <PageHero
          eyebrow="Data & Cloud Platform"
          title="Build a cloud platform ready for your data."
          description="Design scalable cloud data platforms that bring together infrastructure, data workloads, integration, and operational requirements."
          image="/src/assets/images/page-heros/data-cloud.png"
          buttonText="Discuss Your Data Platform"
          buttonLink="/contact"
        />

        {/* Overview */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">

            <div>
              <Reveal
                as="h1"
                variant="left"
                className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
              >
                Data Platform
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                Turn your cloud environment into a foundation for data.
              </Reveal>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <Reveal as="p" delay={200}>
                Modern applications generate and depend on increasing amounts
                of data. A reliable data platform needs infrastructure that can
                support storage, processing, integration, and access.
              </Reveal>

              <Reveal as="p" delay={350}>
                Cloud platforms provide the flexibility to build data
                environments that can evolve as workloads and business
                requirements change.
              </Reveal>

              <Reveal as="p" delay={500}>
                We help organizations design practical data and cloud platforms
                that connect infrastructure with their data requirements.
              </Reveal>
            </div>

          </div>
        </section>

        {/* Capabilities */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <Reveal
              as="h1"
              variant="left"
              className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
            >
              Capabilities
            </Reveal>

            <Reveal
              as="h2"
              variant="left"
              delay={150}
              className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Infrastructure for modern data workloads.
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {capabilities.map((capability, index) => (
                <FlowCard
                  key={capability}
                  delay={index * 90}
                  className="rounded-2xl border border-white/10 bg-deepBlue/30 p-6"
                >
                  <span className="text-xs font-semibold tracking-[0.15em] text-cyan">
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {capability}
                  </h3>
                </FlowCard>
              ))}

            </div>

          </div>
        </section>

        {/* Approach */}
        <section className="border-b border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">
              <Reveal
                as="h1"
                variant="left"
                className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
              >
                Platform Approach
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                From data requirements to a scalable cloud platform.
              </Reveal>

              <Reveal
                as="h3"
                delay={300}
                className="mt-6 text-sm font-normal leading-7 text-slate-600 sm:text-base"
              >
                A strong data platform starts with understanding the workloads,
                data flows, infrastructure, and operational requirements.
              </Reveal>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {approachSteps.map((step, index) => (
                <ApproachStep key={step[0]} step={step} index={index} />
              ))}

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

            <Reveal
              as="h1"
              variant="left"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Building a data platform in the cloud?
            </Reveal>

            <Reveal
              as="h3"
              delay={200}
              className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base"
            >
              Let's discuss your data workloads and the cloud platform you need
              to support them.
            </Reveal>

            <FillButton href="/contact" delay={400}>
              Talk to an Expert
            </FillButton>

          </div>
        </section>

      </main>
    </>
  );
}

export default DataCloudPlatform;
