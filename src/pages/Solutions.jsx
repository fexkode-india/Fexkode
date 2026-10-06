import { useState, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../components/PageHero";
import solutionsBanner from "../assets/images/page-heros/solutions.jpg";
import ScrollReveal from "../components/ScrollReveal";

const solutions = [
  {
    number: "01",
    title: "Cloud Migration",
    description:
      "Move applications and workloads to the cloud through a structured and secure migration approach.",
    path: "/solutions/cloud-migration",
  },
  {
    number: "02",
    title: "DevOps & Automation",
    description:
      "Improve software delivery and operations with automation, CI/CD, and modern DevOps practices.",
    path: "/solutions/devops-automation",
  },
  {
    number: "03",
    title: "Managed Cloud",
    description:
      "Keep cloud environments reliable, monitored, optimized, and ready to support changing business needs.",
    path: "/solutions/managed-cloud",
  },
  {
    number: "04",
    title: "Cloud Security",
    description:
      "Build stronger cloud environments with security-focused architecture, identity, monitoring, and protection.",
    path: "/solutions/cloud-security",
  },
  {
    number: "05",
    title: "Kubernetes & Containers",
    description:
      "Build scalable container platforms for modern cloud-native applications and workloads.",
    path: "/solutions/kubernetes-containers",
  },
  {
    number: "06",
    title: "Data & Cloud Platforms",
    description:
      "Create dependable platforms for applications, data workloads, analytics, and modern business systems.",
    path: "/solutions/data-cloud-platform",
  },
];

/*
  Individual Row with scroll-entry reveal and hover spotlight
*/
function SolutionRow({ solution, isActive, onActivate, index }) {
  const rowRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll intersection observer to animate the card in as user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (rowRef.current) {
      observer.observe(rowRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <a
        ref={rowRef}
        href={solution.path}
        onMouseEnter={() => {
          setIsHovered(true);
          onActivate();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onFocus={onActivate}
        className={`group relative block overflow-hidden rounded-2xl border px-5 outline-none transition-all duration-500 sm:px-7 ${
          isActive
            ? "border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-xl shadow-black/10 scale-[1.008]"
            : "border-slate-200/90 bg-white text-slate-900 hover:border-slate-300 hover:shadow-md"
        }`}
      >
        {/* Interactive cursor spotlight effect */}
        {isActive && isHovered && (
          <div
            className="pointer-events-none absolute -inset-px opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.25), transparent 70%)`,
            }}
          />
        )}

        {/* Top row: number, title, single action arrow */}
        <div className="relative z-10 flex items-center gap-5 py-5 sm:gap-8 sm:py-6">
          <span
            className={`w-8 shrink-0 text-xs font-semibold tracking-[0.18em] transition-colors duration-500 ${
              isActive ? "text-cyan" : "text-slate-400 group-hover:text-slate-600"
            }`}
          >
            {solution.number}
          </span>

          <h3
            className={`flex-1 text-xl font-medium leading-tight tracking-[-0.035em] transition-all duration-500 sm:text-2xl lg:text-[28px] ${
              isActive ? "lg:translate-x-2 text-white" : "group-hover:translate-x-1"
            }`}
          >
            {solution.title}
          </h3>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
              isActive
                ? "rotate-45 border-cyan bg-cyan text-slate-950 scale-105 shadow-md shadow-cyan/20"
                : "border-slate-200 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-800"
            }`}
          >
            <ArrowUpRight size={18} strokeWidth={1.75} />
          </div>
        </div>

        {/* Expanding details (always open below lg, accordion on lg+) */}
        <div
          className={`relative z-10 grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
            isActive
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-5 pb-6 pl-[52px] sm:pl-[64px] lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-7">
              <p
                className={`max-w-xl text-[13px] leading-6 sm:text-sm transition-colors duration-500 ${
                  isActive ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {solution.description}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

function Solutions() {
  const [active, setActive] = useState(solutions[0].number);

  return (
    <>
      {/* Solutions Banner */}
      <PageHero
        eyebrow="Solutions"
        title="Technology foundations built to move forward."
        description="From cloud migration and DevOps to security and modern platforms, Fexkode helps businesses build infrastructure that can evolve with them."
        image={solutionsBanner}
        viewportHeight
      />

      {/* Compact Editorial Section */}
      <section className="bg-[#f7f7f5] py-14 text-slate-900 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Section Heading */}
          <div className="grid gap-6 border-b border-slate-200 pb-8 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:pb-10">
            <div>
              <ScrollReveal>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
                  What we do
                </p>
              </ScrollReveal>

              <ScrollReveal className="delay-100">
                <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
                  Infrastructure for
                  <span className="block text-slate-400">
                    what's next.
                  </span>
                </h2>
              </ScrollReveal>
            </div>

            <ScrollReveal className="delay-200">
              <p className="max-w-xl text-base leading-7 text-slate-500 sm:text-lg lg:pb-2">
                From cloud migration and DevOps to security and modern platforms,
                we help businesses create dependable technology foundations
                that can evolve with them.
              </p>
            </ScrollReveal>
          </div>

          {/* Six interactive rows with staggered scroll entrance */}
          <div
            className="mt-8 flex flex-col gap-3"
            onMouseLeave={() => setActive(solutions[0].number)}
          >
            {solutions.map((solution, idx) => (
              <SolutionRow
                key={solution.number}
                solution={solution}
                index={idx}
                isActive={active === solution.number}
                onActivate={() => setActive(solution.number)}
              />
            ))}
          </div>

          {/* Footer Note */}
          <ScrollReveal className="delay-300">
            <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Cloud · Infrastructure · Automation · Security
              </p>

              <p className="text-sm text-slate-500">
                Built around your business. Designed for what comes next.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

export default Solutions;