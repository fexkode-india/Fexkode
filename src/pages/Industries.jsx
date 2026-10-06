import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Activity,
  Briefcase,
  Check,
  ClipboardList,
  Cloud,
  Factory,
  Gauge,
  HeartPulse,
  Landmark,
  Layers,
  PenTool,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Workflow,
} from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

const industries = [
  {
    title: "SaaS",
    description: "Cloud infrastructure designed for scalable software platforms.",
    icon: Layers,
    accent: "#3b82f6",
    overview:
      "Software platforms grow quickly, and the infrastructure underneath has to keep up without slowing releases or inflating costs. We build cloud foundations and delivery pipelines that let product teams ship often while keeping environments stable, secure and cost-aware.",
    challenges: [
      "Scaling infrastructure as the user base grows",
      "Security and isolation in multi-tenant environments",
      "Shipping frequent releases without downtime",
      "Cloud costs growing faster than revenue",
    ],
    deliver: [
      "Scalable cloud architecture built for growth",
      "CI/CD pipelines for fast, reliable releases",
      "Container and Kubernetes platforms",
      "Monitoring and cost optimization",
    ],
  },
  {
    title: "FinTech",
    description: "Secure and reliable infrastructure for financial technology.",
    icon: Landmark,
    accent: "#a855f7",
    overview:
      "Financial products depend on trust. We design cloud environments around strong access control, encryption, monitoring and resilience, so teams can build and operate financial services on infrastructure that is secure and dependable.",
    challenges: [
      "Strict security and access-control expectations",
      "High availability for time-sensitive transactions",
      "Audit trails and traceability across systems",
      "Protecting sensitive financial data",
    ],
    deliver: [
      "Secure architecture with least-privilege access",
      "Encryption, logging and continuous monitoring",
      "Highly available, resilient environments",
      "Infrastructure designed to support compliance requirements",
    ],
    services: [
      { label: "Cloud Security", path: "/solutions/cloud-security" },
      { label: "Managed Cloud", path: "/solutions/managed-cloud" },
      { label: "Cloud Migration", path: "/solutions/cloud-migration" },
    ],
  },
  {
    title: "Healthcare",
    description: "Infrastructure designed around security, reliability and data protection.",
    icon: HeartPulse,
    accent: "#ec4899",
    overview:
      "Healthcare organizations handle sensitive data and run systems that people rely on every day. We focus on protecting data, designing for reliability, and modernizing legacy workloads in a controlled, well-planned way.",
    challenges: [
      "Protecting patient and health data",
      "Reliability for systems that cannot go down",
      "Connecting legacy systems with modern cloud services",
      "Meeting regulatory and audit expectations",
    ],
    deliver: [
      "Data protection with encryption and access control",
      "Resilient backup and recovery design",
      "Phased, low-risk migration of legacy workloads",
      "Monitoring and audit-ready logging",
    ],
    services: [
      { label: "Cloud Security", path: "/solutions/cloud-security" },
      { label: "Cloud Migration", path: "/solutions/cloud-migration" },
      { label: "Managed Cloud", path: "/solutions/managed-cloud" },
    ],
  },
  {
    title: "E-commerce",
    description: "Scalable cloud environments for high-traffic applications.",
    icon: ShoppingCart,
    accent: "#f97316",
    overview:
      "Online businesses live with unpredictable traffic and little tolerance for slow or unavailable stores. We design elastic, observable environments that stay fast during peak demand and efficient the rest of the time.",
    challenges: [
      "Traffic spikes during campaigns and sales",
      "Slow pages that cost conversions",
      "Reliable checkout and payment flows",
      "Paying for peak capacity all year round",
    ],
    deliver: [
      "Auto-scaling architectures for peak demand",
      "Performance tuning and caching strategies",
      "Observability across the whole stack",
      "Ongoing cost optimization",
    ],
    services: [
      { label: "DevOps & Automation", path: "/solutions/devops-automation" },
      { label: "Kubernetes & Containers", path: "/solutions/kubernetes-containers" },
      { label: "Managed Cloud", path: "/solutions/managed-cloud" },
    ],
  },
  {
    title: "Manufacturing",
    description: "Modern infrastructure for connected operations.",
    icon: Factory,
    accent: "#10b981",
    overview:
      "Modern manufacturing connects machines, plants and business systems. We help bring operational data and workloads into the cloud securely, with architectures that respect existing systems and limited downtime windows.",
    challenges: [
      "Connecting plant systems with cloud platforms",
      "Collecting and using operational data",
      "Legacy systems and tight downtime windows",
      "Securing connected operations",
    ],
    deliver: [
      "Hybrid and cloud-connected architectures",
      "Data platforms for operational data and analytics",
      "Planned, low-disruption migration",
      "Secure network and access design",
    ],
    services: [
      { label: "Data & Cloud Platforms", path: "/solutions/data-cloud-platform" },
      { label: "Cloud Migration", path: "/solutions/cloud-migration" },
      { label: "Cloud Security", path: "/solutions/cloud-security" },
    ],
  },
  {
    title: "Professional Services",
    description: "Cloud modernization and managed infrastructure.",
    icon: Briefcase,
    accent: "#6366f1",
    overview:
      "Firms built on people and client trust need dependable systems without a large internal IT team. We modernize aging infrastructure and provide managed cloud environments that keep teams productive and client data protected.",
    challenges: [
      "Aging on-premise servers and legacy systems",
      "Secure access for distributed teams",
      "Protecting client data and confidentiality",
      "Limited in-house IT capacity",
    ],
    deliver: [
      "Cloud modernization with minimal disruption",
      "Managed infrastructure and ongoing support",
      "Secure remote access and identity management",
      "Backup, recovery and business continuity",
    ],
    services: [
      { label: "Cloud Migration", path: "/solutions/cloud-migration" },
      { label: "Managed Cloud", path: "/solutions/managed-cloud" },
      { label: "Cloud Security", path: "/solutions/cloud-security" },
    ],
  },
];

const approach = [
  {
    icon: Search,
    title: "Understand your industry",
    description:
      "We start with how your business works, the systems you depend on, and the requirements that shape your technology.",
  },
  {
    icon: ClipboardList,
    title: "Assess your environment",
    description:
      "We review your current infrastructure, risks and costs to find what matters most and where to begin.",
  },
  {
    icon: PenTool,
    title: "Design and build",
    description:
      "We design the target architecture and build it with automation, security and reliability in mind from day one.",
  },
  {
    icon: RefreshCw,
    title: "Operate and improve",
    description:
      "We monitor, support and keep optimizing so the environment keeps pace as your business changes.",
  },
];

const foundations = [
  {
    icon: ShieldCheck,
    title: "Security by design",
    description: "Access control, encryption and monitoring built in from the start, not added later.",
  },
  {
    icon: Activity,
    title: "Reliability",
    description: "Resilient architectures with monitoring, backups and recovery planning.",
  },
  {
    icon: TrendingUp,
    title: "Scalability",
    description: "Environments that grow with demand instead of being rebuilt to keep up.",
  },
  {
    icon: Gauge,
    title: "Cost awareness",
    description: "Visibility into cloud spend and regular optimization to keep it under control.",
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "Repeatable infrastructure and delivery pipelines that reduce manual work and errors.",
  },
  {
    icon: Cloud,
    title: "Platform choice",
    description: "Experience across AWS, Microsoft Azure and Google Cloud, so the platform fits your needs.",
  },
];

const faqs = [
  {
    question: "Do you work with industries that aren't listed here?",
    answer:
      "Yes. These are the industries where we see the most demand, but the fundamentals of secure, scalable and reliable infrastructure apply broadly. Tell us about your business and we'll be upfront about whether we're the right fit.",
  },
  {
    question: "Can you support regulated environments?",
    answer:
      "We design infrastructure with security, access control, logging and data protection in mind, which supports regulated environments. Specific compliance requirements are scoped with you at the start of an engagement.",
  },
  {
    question: "Which cloud platforms do you work with?",
    answer:
      "We work with AWS, Microsoft Azure and Google Cloud, and help you choose the platform that fits your workload, team and budget.",
  },
  {
    question: "Do I need a full migration to get started?",
    answer:
      "No. Many engagements begin with a focused assessment, a single workload, or one specific problem such as cost, security or delivery speed.",
  },
  {
    question: "How do we get started?",
    answer:
      "Start with a conversation about what you're building, modernizing or improving. From there we assess your current environment and recommend a practical next step.",
  },
];

// -- Motion helpers ------------------------------------------------------------
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/*
  Scroll reveal: content slides in (and fades in) as it scrolls into view.
    "left" - slides in from the side (headings)
    "up"   - slides up into place (text, cards, buttons)
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

/* "Where We Work" card: a glow in the industry's own colour follows the mouse,
   and the icon tilts and grows on hover */
function IndustryCard({ industry, index, onOpen }) {
  const [revealRef, revealStyle] = useReveal(Math.min(index, 5) * 100, "up");
  const cardRef = useRef(null);
  const Icon = industry.icon;

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
    <a
      ref={setRefs}
      style={revealStyle}
      href="#industry-focus"
      onClick={onOpen}
      onMouseMove={handleMove}
      className="group relative block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-white hover:shadow-lg"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), ${industry.accent}26, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-cyan/30 bg-gradient-to-br from-cyan/10 to-blue/5 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-cyan/60 group-hover:shadow-lg">
            <Icon size={22} strokeWidth={1.6} className="text-cyan" />
          </div>

          <ArrowUpRight
            size={18}
            strokeWidth={1.6}
            className="text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan"
          />
        </div>

        <h2 className="mt-7 text-2xl font-semibold text-slate-900 transition-colors duration-300">
          {industry.title}
        </h2>

        <p className="mt-5 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
          {industry.description}
        </p>

        <div
          className="mt-8 h-0.5 w-2 transition-all duration-300 group-hover:w-14"
          style={{ background: industry.accent }}
        />
      </div>
    </a>
  );
}

/* Industry Focus tab: the selected tab also nudges right on large screens */
function IndustryTab({ industry, index, isActive, onSelect, buttonRef }) {
  const [revealRef, revealStyle] = useReveal(index * 80, "up");
  const Icon = industry.icon;

  const setRefs = (node) => {
    revealRef.current = node;
    buttonRef(node);
  };

  return (
    <button
      ref={setRefs}
      style={revealStyle}
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onSelect(index)}
      onMouseEnter={() => onSelect(index)}
      className={`flex shrink-0 items-center gap-4 rounded-xl border px-5 py-4 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-cyan/50 ${
        isActive
          ? "border-cyan bg-white text-slate-900 shadow-lg shadow-cyan/10 lg:translate-x-2"
          : "border-transparent bg-white/90 text-slate-600 hover:bg-white hover:text-slate-900"
      }`}
    >
      <Icon
        size={20}
        strokeWidth={1.6}
        className={`transition-colors duration-300 ${
          isActive ? "text-cyan" : "text-slate-400"
        }`}
      />
      <span className="whitespace-nowrap text-base font-medium">
        {industry.title}
      </span>
    </button>
  );
}

/* Approach step: the icon fills with cyan and turns on hover */
function ApproachCard({ step, index }) {
  const [ref, style] = useReveal(index * 120, "up");
  const Icon = step.icon;

  return (
    <article
      ref={ref}
      style={style}
      className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-md"
    >
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border-2 border-cyan/30 bg-cyan/10 transition-all duration-300 group-hover:border-cyan group-hover:bg-cyan">
        <Icon
          size={22}
          strokeWidth={1.6}
          className="text-cyan transition-all duration-300 group-hover:rotate-12 group-hover:text-white"
        />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-slate-900">
        {step.title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        {step.description}
      </p>
    </article>
  );
}

/* Foundation item: title lights up and the text brightens on hover */
function FoundationItem({ item, index }) {
  const [ref, style] = useReveal(index * 100, "up");
  const Icon = item.icon;

  return (
    <div ref={ref} style={style} className="group flex gap-5">
      <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-cyan/30 bg-cyan/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan/60 group-hover:shadow-lg">
        <Icon size={22} strokeWidth={1.6} className="text-cyan" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-cyan">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {item.description}
        </p>
      </div>
    </div>
  );
}

/* FAQ item: the question nudges right and the plus turns on hover */
function FaqItem({ faq, index, isOpen, onToggle }) {
  const [ref, style] = useReveal(index * 100, "up");

  return (
    <div ref={ref} style={style}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left outline-none"
      >
        <span
          className={`text-base font-medium transition-all duration-300 group-hover:translate-x-1 sm:text-lg ${
            isOpen ? "text-cyan" : "text-slate-900"
          }`}
        >
          {faq.question}
        </span>

        <Plus
          size={20}
          strokeWidth={1.6}
          className={`shrink-0 text-slate-500 transition-transform duration-300 ${
            isOpen ? "rotate-45 text-cyan" : "group-hover:rotate-90"
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* CTA button: lifts with a glow on hover and presses in on click */
function LiftButton({ href, delay = 0, children }) {
  const [ref, style] = useReveal(delay, "up");

  return (
    <a
      ref={ref}
      style={style}
      href={href}
      className="mt-9 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-electric/90 hover:shadow-lg hover:shadow-cyan/30 active:translate-y-0 active:scale-95"
    >
      {children}
    </a>
  );
}

function Industries() {
  // Industry shown in the "Industry Focus" explorer
  const [selected, setSelected] = useState(0);
  // Open FAQ item (null = all closed)
  const [openFaq, setOpenFaq] = useState(0);
  const tabRefs = useRef([]);

  const current = industries[selected];
  const CurrentIcon = current.icon;

  // Card click -> select that industry and scroll to the explorer
  const openIndustry = (e, index) => {
    const target = document.getElementById("industry-focus");
    if (!target) return;
    e.preventDefault();
    setSelected(index);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Arrow keys / Home / End move between the industry tabs
  const handleTabKeys = (e) => {
    const last = industries.length - 1;
    let next = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      next = selected === last ? 0 : selected + 1;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      next = selected === 0 ? last : selected - 1;
    } else if (e.key === "Home") {
      next = 0;
    } else if (e.key === "End") {
      next = last;
    }

    if (next === null) return;

    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <SEO
        title="Industries | Fexkode"
        description="Fexkode provides scalable, secure and reliable cloud infrastructure solutions tailored to the needs of SaaS, FinTech, healthcare, e-commerce, manufacturing and professional services."
        canonical="/industries"
      />

      <style>{`
        @keyframes industryFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="min-h-screen pt-20">

        {/* Hero */}
        <PageHero
          eyebrow="Industries"
          title="Infrastructure built around your industry."
          description="Every industry has different operational, security, scalability, and technology requirements. Our engineering approach adapts to those needs."
          image="/src/assets/images/page-heros/industries.png"
        />

        {/* Industries — Light */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">
              <Reveal
                as="h1"
                variant="left"
                className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
              >
                Where We Work
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                Technology that fits the business.
              </Reveal>

              <Reveal
                as="h3"
                delay={300}
                className="mt-6 text-sm font-normal leading-7 text-slate-600 sm:text-base"
              >
                We help organizations address infrastructure challenges while
                keeping business priorities at the center of the solution.
              </Reveal>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {industries.map((industry, index) => (
                <IndustryCard
                  key={industry.title}
                  industry={industry}
                  index={index}
                  onOpen={(e) => openIndustry(e, index)}
                />
              ))}

            </div>

          </div>
        </section>

        {/* Industry Focus — Dark, interactive */}
        <section
          id="industry-focus"
          className="scroll-mt-20 border-y border-white/5 bg-ink py-24 text-white"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">
              <Reveal
                as="p"
                variant="left"
                className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
              >
                Industry Focus
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                What matters most in each industry.
              </Reveal>

              <Reveal
                as="p"
                delay={300}
                className="mt-6 text-sm font-normal leading-7 text-slate-400 sm:text-base"
              >
                Select an industry to see the challenges we commonly help with,
                what we deliver, and the services involved.
              </Reveal>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-[300px_1fr]">

              {/* Industry list */}
              <div
                role="tablist"
                aria-label="Industries"
                onKeyDown={handleTabKeys}
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
              >
                {industries.map((industry, index) => (
                  <IndustryTab
                    key={industry.title}
                    industry={industry}
                    index={index}
                    isActive={selected === index}
                    onSelect={setSelected}
                    buttonRef={(node) => {
                      tabRefs.current[index] = node;
                    }}
                  />
                ))}
              </div>

              {/* Detail panel */}
              <Reveal delay={200} className="flex flex-col">
                <div
                  key={current.title}
                  role="tabpanel"
                  className="flex-1 rounded-2xl border border-slate-200 bg-white p-7 text-slate-900 shadow-xl sm:p-10"
                  style={{ animation: "industryFade 0.5s ease-out both" }}
                >
                  <div className="flex items-center gap-5">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl border-2 border-cyan/40 bg-cyan/10">
                      <CurrentIcon size={26} strokeWidth={1.6} className="text-cyan" />
                    </div>

                    <h3 className="text-3xl font-semibold tracking-tight text-slate-900">
                      {current.title}
                    </h3>
                  </div>

                  <div
                    className="mt-6 h-0.5 w-14"
                    style={{ background: current.accent }}
                  />

                  <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
                    {current.overview}
                  </p>

                  <div className="mt-10 grid gap-10 md:grid-cols-2">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                        Common challenges
                      </h4>

                      <ul className="mt-5 space-y-4">
                        {current.challenges.map((item, i) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-slate-600"
                            style={{
                              animation: "industryFade 0.5s ease-out both",
                              animationDelay: `${150 + i * 80}ms`,
                            }}
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                        What we deliver
                      </h4>

                      <ul className="mt-5 space-y-4">
                        {current.deliver.map((item, i) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-slate-600"
                            style={{
                              animation: "industryFade 0.5s ease-out both",
                              animationDelay: `${270 + i * 80}ms`,
                            }}
                          >
                            <Check size={16} strokeWidth={2} className="mt-1 shrink-0 text-cyan" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

          </div>
        </section>

        {/* How we work — Light */}
        <section className="border-b border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">
              <Reveal
                as="p"
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
                The same careful process, shaped around your industry.
              </Reveal>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {approach.map((step, index) => (
                <ApproachCard key={step.title} step={step} index={index} />
              ))}

            </div>

          </div>
        </section>

        {/* Foundations — Dark */}
        <section className="border-t border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">
              <Reveal
                as="p"
                variant="left"
                className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
              >
                Our Foundations
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                What stays the same in every industry.
              </Reveal>

              <Reveal
                as="h3"
                delay={300}
                className="mt-6 text-sm font-normal leading-7 text-slate-400 sm:text-base"
              >
                Whatever the sector, these principles guide how we design,
                build and run infrastructure.
              </Reveal>
            </div>

            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">

              {foundations.map((item, index) => (
                <FoundationItem key={item.title} item={item} index={index} />
              ))}

            </div>

          </div>
        </section>

        {/* FAQ — Light */}
        <section className="border-y border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

            <div>
              <Reveal
                as="p"
                variant="left"
                className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
              >
                FAQ
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                Common questions.
              </Reveal>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>

          </div>
        </section>

        {/* CTA — Dark */}
        <section className="border-t border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

            <Reveal
              as="h1"
              variant="left"
              className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
            >
              Talk to Us
            </Reveal>

            <Reveal
              as="h2"
              variant="left"
              delay={150}
              className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Have an infrastructure challenge?
            </Reveal>

            <Reveal
              as="h3"
              delay={300}
              className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base"
            >
              Tell us what you're trying to build, modernize, or improve.
            </Reveal>

            <LiftButton href="/contact" delay={450}>
              Talk to an Expert
            </LiftButton>

          </div>
        </section>

      </main>
    </>
  );
}

export default Industries;
