import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import PageHero from "../../components/PageHero";
import cloudSecurityImage from "../../assets/images/page-heros/cloud-security.png";

const capabilities = [
  "Cloud security architecture",
  "Identity and access management",
  "Infrastructure security controls",
  "Security monitoring",
  "Configuration and policy management",
  "Security-focused cloud operations",
];

const approachSteps = [
  [
    "01",
    "Assess",
    "Understand the current environment, access patterns, configurations, and security requirements.",
  ],
  [
    "02",
    "Design",
    "Define security controls and architecture appropriate for the workloads and business needs.",
  ],
  [
    "03",
    "Implement",
    "Apply practical controls across identity, infrastructure, configuration, and monitoring.",
  ],
  [
    "04",
    "Improve",
    "Continuously review security signals and improve controls as the environment evolves.",
  ],
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Scroll reveal. Returns a ref + inline style for the element.
  Once the animation is finished the inline style is removed, so the
  element's own hover effects and transitions work exactly as designed.
*/
function useReveal(delay = 0, direction = "up") {
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
    const timer = setTimeout(() => setState("done"), delay + 1000);
    return () => clearTimeout(timer);
  }, [state, delay]);

  if (state === "done") return [ref, undefined];

  const hiddenTransform =
    direction === "left"
      ? "translate3d(-32px, 0, 0)"
      : direction === "right"
      ? "translate3d(32px, 0, 0)"
      : "translate3d(0, 32px, 0)";

  return [
    ref,
    {
      opacity: state === "shown" ? 1 : 0,
      transform: state === "shown" ? "none" : hiddenTransform,
      transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
  ];
}

function Reveal({ as: Tag = "div", delay = 0, direction = "up", className, children }) {
  const [ref, style] = useReveal(delay, direction);

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

/* Capability card: soft cyan glow follows the mouse + small lift on hover */
function SpotlightCard({ children, className = "", delay = 0 }) {
  const [revealRef, revealStyle] = useReveal(delay);
  const cardRef = useRef(null);

  const setRefs = (node) => {
    cardRef.current = node;
    revealRef.current = node;
  };

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={setRefs}
      style={revealStyle}
      onMouseMove={handleMove}
      className={`group relative overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan/40 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(0,200,255,0.14), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* Approach step: lifts on hover and fills a cyan line up to this step */
function ApproachStep({ step, index, activeStep, setActiveStep }) {
  const [number, title, description] = step;
  const [ref, style] = useReveal(index * 100);

  const reached = activeStep !== null && index <= activeStep;
  const isActive = activeStep === index;

  return (
    <article
      ref={ref}
      style={style}
      tabIndex={0}
      onMouseEnter={() => setActiveStep(index)}
      onFocus={() => setActiveStep(index)}
      onClick={() => setActiveStep(index)}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm outline-none transition duration-300 hover:border-cyan/30 hover:shadow-md ${
        isActive ? "-translate-y-1" : ""
      }`}
    >
      <span
        className="absolute left-0 top-0 h-[2px] bg-cyan transition-all duration-500 ease-out"
        style={{
          width: reached ? "100%" : "0%",
          transitionDelay: reached ? `${index * 70}ms` : "0ms",
        }}
      />

      <span className="text-xs font-semibold tracking-[0.15em] text-cyan">
        {number}
      </span>

      <h3
        className={`mt-6 text-xl font-semibold text-slate-900 transition-transform duration-300 ${
          isActive ? "translate-x-1" : ""
        }`}
      >
        {title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
    </article>
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

function CloudSecurity() {
  // Hovered / focused step in "Security Approach" (null = none)
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      <SEO
        title="Cloud Security | Fexkode"
        description="Fexkode helps organizations strengthen cloud security through security-focused architecture, identity and access controls, infrastructure security, monitoring, and operational practices."
        canonical="/solutions/cloud-security"
      />

      <main className="min-h-screen pt-20">

        {/* Hero */}
        <PageHero
          eyebrow="Cloud Security"
          title="Build security into your cloud foundation."
          description="Strengthen cloud environments with security-focused architecture, access controls, monitoring, and operational practices."
            image={cloudSecurityImage}
          buttonText="Discuss Cloud Security"
          buttonLink="/contact"
        />

        {/* Overview */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">

            <Reveal direction="left">
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Security by Design
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Security should be part of the architecture.
              </h2>
            </Reveal>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <Reveal as="p" delay={150}>
                Cloud environments introduce new ways of building and operating
                applications, but they also introduce security considerations
                around identity, access, configuration, infrastructure, and
                monitoring.
              </Reveal>

              <Reveal as="p" delay={300}>
                Security controls should be considered during architecture and
                implementation rather than added after infrastructure has already
                been deployed.
              </Reveal>

              <Reveal as="p" delay={450}>
                We focus on practical security practices that help organizations
                improve visibility, control, and resilience across their cloud
                environments.
              </Reveal>
            </div>

          </div>
        </section>

        {/* Capabilities */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <Reveal
              as="h1"
              className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
            >
              Capabilities
            </Reveal>

            <Reveal
              as="h2"
              delay={120}
              className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Security across your cloud environment.
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {capabilities.map((capability, index) => (
                <SpotlightCard
                  key={capability}
                  delay={index * 90}
                  className="rounded-2xl border border-white/10 bg-deepBlue/30 p-6"
                >
                  <span className="text-xs font-semibold tracking-[0.15em] text-cyan/60 transition-colors duration-300 group-hover:text-cyan">
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {capability}
                  </h3>
                </SpotlightCard>
              ))}

            </div>

          </div>
        </section>

        {/* Security Approach */}
        <section className="border-b border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <Reveal className="max-w-3xl">
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Security Approach
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Protect the environment from architecture to operations.
              </h2>
            </Reveal>

            <div
              className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
              onMouseLeave={() => setActiveStep(null)}
              onBlur={() => setActiveStep(null)}
            >

              {approachSteps.map((step, index) => (
                <ApproachStep
                  key={step[0]}
                  step={step}
                  index={index}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              ))}

            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

            <Reveal
              as="h1"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Strengthen your cloud security.
            </Reveal>

            <Reveal
              as="h3"
              delay={120}
              className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base"
            >
              Let's discuss your current environment and the security
              improvements you want to make.
            </Reveal>

            <Reveal delay={240}>
              <MagneticLink
                href="/contact"
                className="mt-9 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-electric/90"
              >
                Talk to an Expert
              </MagneticLink>
            </Reveal>

          </div>
        </section>

      </main>
    </>
  );
}

export default CloudSecurity;
