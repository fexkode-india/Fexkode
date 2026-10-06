import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import PageHero from "../../components/PageHero";

const capabilities = [
  "Kubernetes cluster architecture",
  "Containerized application deployment",
  "Container orchestration",
  "Cluster configuration and management",
  "Deployment automation",
  "Monitoring and operational support",
];

const approachSteps = [
  [
    "01",
    "Assess",
    "Understand applications, workloads, infrastructure, and operational requirements.",
  ],
  [
    "02",
    "Containerize",
    "Create consistent containerized environments for the appropriate workloads.",
  ],
  [
    "03",
    "Orchestrate",
    "Design and implement Kubernetes-based deployment and orchestration patterns.",
  ],
  [
    "04",
    "Operate",
    "Monitor workloads and continuously improve reliability and operational efficiency.",
  ],
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Scroll reveal: content slides in (and fades in) as it scrolls into view.
    "left" / "right" - slides in from the side (headings)
    "up"             - slides up into place (text, cards, button)
  When the animation ends the inline style is removed, so the element's
  own hover effects work exactly as designed.
*/
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const HIDDEN = {
  left: { opacity: 0, transform: "translate3d(-56px, 0, 0)" },
  right: { opacity: 0, transform: "translate3d(56px, 0, 0)" },
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

/* Capability card: tilts in 3D towards the mouse, like a pod being inspected */
function TiltCard({ children, className = "", delay = 0 }) {
  const [revealRef, revealStyle] = useReveal(delay, "up");
  const cardRef = useRef(null);

  const setRefs = (node) => {
    cardRef.current = node;
    revealRef.current = node;
  };

  const handleMove = (e) => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(800px) rotateX(${-py * 8}deg) rotateY(${
      px * 8
    }deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={setRefs}
      style={revealStyle}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group transition-[transform,border-color,box-shadow] duration-200 ease-out will-change-transform hover:border-cyan/40 hover:shadow-[0_18px_40px_-18px_rgba(0,200,255,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

/* Approach step: focus mode - the hovered step comes forward, the rest recede */
function ApproachStep({ step, index, activeStep, setActiveStep }) {
  const [number, title, description] = step;
  const [ref, style] = useReveal(index * 110, "up");

  const isActive = activeStep === index;
  const isDimmed = activeStep !== null && !isActive;

  return (
    <article
      ref={ref}
      style={style}
      tabIndex={0}
      onMouseEnter={() => setActiveStep(index)}
      onFocus={() => setActiveStep(index)}
      onClick={() => setActiveStep(index)}
      className={`rounded-2xl border border-slate-200 bg-white p-7 shadow-sm outline-none transition duration-300 hover:border-cyan/30 hover:shadow-md ${
        isActive ? "scale-[1.03] border-cyan/30 shadow-md" : ""
      } ${isDimmed ? "opacity-60" : ""}`}
    >
      <span className="text-xs font-semibold tracking-[0.15em] text-cyan">
        {number}
      </span>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}

/* CTA button: a light sweep crosses it on hover */
function ShineButton({ href, delay = 0, children }) {
  const [ref, style] = useReveal(delay, "up");

  return (
    <a
      ref={ref}
      style={style}
      href={href}
      className="group relative mt-9 inline-flex overflow-hidden rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-electric/90 hover:shadow-[0_0_30px_rgba(0,200,255,0.35)]"
    >
      <span className="relative">{children}</span>

      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 ease-out group-hover:left-[110%] group-hover:opacity-100" />
    </a>
  );
}

function KubernetesContainers() {
  // Hovered / focused step in "Our Approach" (null = none)
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      <SEO
        title="Kubernetes & Containers | Fexkode"
        description="Fexkode provides Kubernetes and container solutions for consistent application environments, scalable workloads, deployment automation, orchestration, and operational visibility."
        canonical="/solutions/kubernetes-containers"
      />

      <main className="min-h-screen pt-20">

        {/* Hero */}
      <PageHero
  eyebrow="Kubernetes & Containers"
  title="Run modern applications with confidence."
  description="Container and Kubernetes solutions designed to provide consistency, scalability, automation, and operational visibility for modern application environments."
 image="/src/assets/images/page-heros/kubernetes.jpg"
  buttonText="Discuss Your Environment"
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
                Container Engineering
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                Consistent application environments from development to production.
              </Reveal>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <Reveal as="p" delay={200}>
                Containers provide a consistent way to package applications and
                their dependencies, making them easier to move between
                environments.
              </Reveal>

              <Reveal as="p" delay={350}>
                Kubernetes adds orchestration capabilities that help teams
                deploy, scale, and manage containerized workloads across
                infrastructure.
              </Reveal>

              <Reveal as="p" delay={500}>
                We focus on practical container and Kubernetes architectures
                that are maintainable and aligned with operational requirements.
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
              Container infrastructure built for modern workloads.
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {capabilities.map((capability, index) => (
                <TiltCard
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
                </TiltCard>
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
                Our Approach
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                From container strategy to production operations.
              </Reveal>
            </div>

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
              variant="left"
              className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
            >
              Ready to modernize your application platform?
            </Reveal>

            <Reveal
              as="h3"
              delay={200}
              className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base"
            >
              Let's discuss your container and Kubernetes requirements.
            </Reveal>

            <ShineButton href="/contact" delay={400}>
              Talk to an Expert
            </ShineButton>

          </div>
        </section>

      </main>
    </>
  );
}

export default KubernetesContainers;
