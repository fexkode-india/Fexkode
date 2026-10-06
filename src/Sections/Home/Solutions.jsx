import { useState } from "react";
import {
  ArrowUpRight,
  CloudUpload,
  GitBranch,
  Shield,
  Settings,
  Box,
  Database,
} from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";

const solutions = [
  {
    number: "01",
    title: "Cloud Migration",
    shortDesc:
      "Move applications and infrastructure to modern cloud environments.",
    path: "/solutions/cloud-migration",
    icon: CloudUpload,
    fullExplanation:
      "Seamlessly migrate your existing applications and infrastructure to cloud platforms while maintaining performance and minimizing downtime. We handle assessment, planning, execution, and validation.",
  },
  {
    number: "02",
    title: "DevOps & Automation",
    shortDesc:
      "Improve software delivery and operations with automation, CI/CD, and modern DevOps practices.",
    path: "/solutions/devops-automation",
    icon: GitBranch,
    fullExplanation:
      "Accelerate your delivery pipeline with DevOps practices and automation. From CI/CD pipelines to infrastructure-as-code, we streamline your development and deployment processes.",
  },
  {
    number: "03",
    title: "Managed Cloud",
    shortDesc:
      "Keep cloud environments reliable, monitored, optimized, and ready to support changing business needs.",
    path: "/solutions/managed-cloud",
    icon: Settings,
    fullExplanation:
      "Let us manage your cloud infrastructure 24/7. Our managed services include monitoring, maintenance, updates, and proactive optimization to keep your systems running smoothly.",
  },
  {
    number: "04",
    title: "Cloud Security",
    shortDesc:
      "Build stronger cloud environments with security-focused architecture, identity, monitoring, and protection.",
    path: "/solutions/cloud-security",
    icon: Shield,
    fullExplanation:
      "Implement comprehensive security strategies across your cloud environment. We protect your infrastructure, applications, and data with industry-leading security practices and compliance standards.",
  },
  {
    number: "05",
    title: "Kubernetes & Containers",
    shortDesc:
      "Build scalable container platforms for modern cloud-native applications and workloads.",
    path: "/solutions/kubernetes-containers",
    icon: Box,
    fullExplanation:
      "Build and manage scalable container platforms using modern cloud-native technologies such as Kubernetes and Docker.",
  },
  {
    number: "06",
    title: "Data & Cloud Platforms",
    shortDesc:
      "Create dependable platforms for applications, data workloads, analytics, and modern business systems.",
    path: "/solutions/data-cloud-platform",
    icon: Database,
    fullExplanation:
      "Create dependable cloud platforms for applications, data workloads, analytics, and modern business systems.",
  },
];

function Solutions() {
  const [activeSolution, setActiveSolution] = useState(0);

  const solution = solutions[activeSolution];
  const Icon = solution.icon;

  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-ink py-24 text-white sm:py-28"
      aria-labelledby="solutions-title"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
              Solutions
            </p>
          </ScrollReveal>

          <ScrollReveal className="delay-100">
            <h2
              id="solutions-title"
              className="mt-6 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl"
            >
              Cloud solutions
              <span className="block text-slate-500">
                that move business forward.
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="delay-200">
            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Practical cloud and infrastructure solutions designed to improve
              reliability, security, scalability, and operational efficiency.
            </p>
          </ScrollReveal>
        </div>

        {/* Solution Navigation + Detail */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">

          {/* LEFT — SOLUTION NAVIGATION */}
          <ScrollReveal className="delay-300">
            <div className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white shadow-[0_25px_70px_-15px_rgba(15,23,42,0.15)] hover:shadow-lg transition-shadow duration-300">

              {solutions.map((item, index) => {
                const isActive = activeSolution === index;
                const ItemIcon = item.icon;

                return (
                  <a
                    key={item.title}
                    href={item.path}
                    onMouseEnter={() => setActiveSolution(index)}
                    className={`group relative flex w-full items-center gap-5 overflow-hidden border-b border-slate-100 px-6 py-6 text-left transition-all duration-300 last:border-b-0 sm:py-7 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-50/70 via-white to-white text-slate-900"
                        : "bg-white text-slate-500 hover:bg-slate-50/70 hover:text-slate-900"
                    }`}
                  >
                    {/* Active left accent */}
                    <span
                      className={`absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-cyan-400 to-cyan-600 transition-all duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Number */}
                    <span
                      className={`w-8 shrink-0 text-xs font-semibold tracking-[0.18em] transition-colors duration-300 ${
                        isActive
                          ? "text-cyan-600"
                          : "text-slate-300 group-hover:text-slate-500"
                      }`}
                    >
                      {item.number}
                    </span>

                    {/* Icon */}
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400 bg-cyan-400 text-slate-950 shadow-[0_8px_20px_rgba(6,182,212,0.35)] scale-110"
                          : "border-slate-200 bg-slate-50 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-700 group-hover:scale-105"
                      }`}
                    >
                      <ItemIcon size={18} strokeWidth={1.5} />
                    </span>

                    {/* Title */}
                    <span
                      className={`flex-1 text-base font-medium tracking-tight transition-colors duration-300 sm:text-lg ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-500 group-hover:text-slate-900"
                      }`}
                    >
                      {item.title}
                    </span>

                    {/* Arrow */}
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400/50 text-cyan-600"
                          : "border-transparent text-slate-300 group-hover:border-slate-200 group-hover:text-slate-600 group-hover:bg-slate-100"
                      }`}
                    >
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* RIGHT — FEATURED SOLUTION (whole panel links to the active solution) */}
          <ScrollReveal className="delay-400 h-full">
            <a
              href={solution.path}
              className="group relative block min-h-[500px] h-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0b1a2e] via-[#0a1424] to-[#060b14] p-8 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:-translate-y-1 sm:p-10 lg:p-12"
            >

              {/* Top highlight line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-50" />

              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-cyan/10 transition-transform duration-700 group-hover:scale-110" />

            <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full border border-white/5" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.12),transparent_35%)]" />

            <div className="relative flex h-full flex-col">

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan-400/5 text-cyan shadow-[0_8px_24px_rgba(6,182,212,0.2)]">
                <Icon size={24} strokeWidth={1.4} />
              </div>

              {/* Label */}
              <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Solution {solution.number}
              </p>

              {/* Title */}
              <h3 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                {solution.title}
              </h3>

              {/* Short description */}
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                {solution.shortDesc}
              </p>

              {/* Full explanation */}
              <div className="mt-8 max-w-2xl border-t border-white/10 pt-7">
                <p className="text-sm leading-7 text-slate-500 sm:text-base">
                  {solution.fullExplanation}
                </p>
              </div>
            </div>
          </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
