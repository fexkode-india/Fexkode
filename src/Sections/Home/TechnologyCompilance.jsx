import { useState } from "react";
import { Cloud, Code, GitBranch, Eye, ArrowRight } from "lucide-react";

const technologies = [
  {
    number: "01",
    category: "Cloud",
    description:
      "Cloud platforms that provide the foundation for scalable and reliable infrastructure.",
    items: [
      { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Microsoft Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Google Cloud", logo: "https://cdn.simpleicons.org/googlecloud" },
    ],
    icon: Cloud,
    href: "/cloud-services",
  },
  {
    number: "02",
    category: "Infrastructure",
    description:
      "Modern infrastructure technologies for reliable and repeatable environments.",
    items: [
      { name: "Linux", logo: "https://cdn.simpleicons.org/linux" },
      { name: "Terraform", logo: "https://cdn.simpleicons.org/terraform" },
      { name: "Kubernetes", logo: "https://cdn.simpleicons.org/kubernetes" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker" },
    ],
    icon: Code,
    href: "#challenges-infrastructure",
    scrollTo: "challenges-infrastructure", // scrolls up to Common Challenges → Infrastructure tab
  },
  {
    number: "03",
    category: "DevOps",
    description:
      "Tools and practices that improve software delivery and operational efficiency.",
    items: [
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github" },
      { name: "GitLab", logo: "https://cdn.simpleicons.org/gitlab" },
      { name: "CI/CD", logo: "https://cdn.simpleicons.org/githubactions" },
    ],
    icon: GitBranch,
    href: "/solutions/devops-automation",
  },
  {
    number: "04",
    category: "Monitoring",
    description:
      "Visibility and monitoring tools that help teams understand system health.",
    items: [
      { name: "Prometheus", logo: "https://cdn.simpleicons.org/prometheus" },
      { name: "Grafana", logo: "https://cdn.simpleicons.org/grafana" },

    ],
    icon: Eye,
    href: "/solutions/managed-cloud",
  },
];

const frameworks = [
  {
    number: "01",
    name: "ISO 27001",
    description:
      "International standard for managing information security risks.",
    logo: "/iso27001.png",
  },
  {
    number: "02",
    name: "SOC",
    description:
      "Verifies data security, availability, and confidentiality for service providers.",
    logo: "/soc.png",
  },
];

function TechnologyCompliance() {
  const [activeTab, setActiveTab] = useState("technology");

  // Scroll to a section on the same page and open its "Infrastructure" tab
  const handleCardClick = (e, technology) => {
    if (!technology.scrollTo) return;

    const target = document.getElementById(technology.scrollTo);
    if (!target) return; // falls back to normal href

    e.preventDefault();
    window.dispatchEvent(new Event("show-infrastructure-tab"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isTechnology = activeTab === "technology";

  return (
    <section
      className="relative overflow-hidden border-t border-slate-200 bg-slate-50 py-24 text-slate-900 sm:py-28"
      aria-labelledby="technology-compliance-title"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
            {isTechnology
              ? "Technology"
              : "Compliance & Security"}
          </p>

          <h2
            id="technology-compliance-title"
            className="mt-7 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {isTechnology ? (
              <>
                The technology behind
                <span className="text-slate-400">
                  {" "}modern infrastructure.
                </span>
              </>
            ) : (
              <>
                Built to meet
                <span className="text-slate-400">
                  {" "}global compliance standards.
                </span>
              </>
            )}
          </h2>

          <p className="mt-7 max-w-4xl text-base leading-8 text-slate-500 sm:text-lg">
            {isTechnology
              ? "Modern cloud technologies that provide the foundation for reliable, scalable and efficient infrastructure."
              : "Fexkode designs and implements cloud infrastructure that aligns with major compliance frameworks — helping businesses meet regulatory requirements without slowing down."}
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-b border-slate-200">
          <div className="flex">

            {/* Technology */}
            <button
              type="button"
              onClick={() => setActiveTab("technology")}
              onMouseEnter={() => setActiveTab("technology")}
              className={`relative px-6 py-5 pl-0 text-sm font-medium transition-colors duration-300 ${
                isTechnology
                  ? "text-slate-900"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              Technology

              <span
                className={`absolute bottom-0 left-0 h-px bg-cyan transition-all duration-500 ${
                  isTechnology ? "w-full" : "w-0"
                }`}
              />
            </button>

            {/* Compliance & Security */}
            <button
              type="button"
              onClick={() => setActiveTab("compliance")}
              onMouseEnter={() => setActiveTab("compliance")}
              className={`relative px-6 py-5 text-sm font-medium transition-colors duration-300 ${
                !isTechnology
                  ? "text-slate-900"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              Compliance & Security

              <span
                className={`absolute bottom-0 left-6 h-px bg-cyan transition-all duration-500 ${
                  !isTechnology
                    ? "w-[calc(100%-1.5rem)]"
                    : "w-0"
                }`}
              />
            </button>

          </div>
        </div>

        {/* Technology Content */}
        {isTechnology && (
          <div className="mt-12 flex flex-col gap-3">
            {technologies.map((technology) => {
              const Icon = technology.icon;

              return (
                <a
                  key={technology.category}
                  href={technology.href}
                  onClick={(e) => handleCardClick(e, technology)}
                  className="group relative block overflow-hidden rounded-[28px] border border-slate-200 bg-white py-6 transition-colors duration-300 hover:bg-slate-50 sm:py-7"
                >
                  <div className="grid gap-5 px-6 lg:grid-cols-[55px_48px_0.8fr_1fr_1.1fr] lg:items-center lg:gap-6 lg:px-8">

                    {/* Number */}
                    <span className="text-[11px] font-medium tracking-[0.2em] text-slate-300 transition-colors duration-300 group-hover:text-cyan">
                      {technology.number}
                    </span>

                    {/* Icon */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-cyan/40 group-hover:text-cyan">
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                      />
                    </div>

                    {/* Category */}
                    <h3 className="text-xl font-medium tracking-tight text-slate-900 transition-transform duration-300 group-hover:translate-x-1 sm:text-[22px]">
                      {technology.category}
                    </h3>

                    {/* Description */}
                    <p className="max-w-md text-[13px] leading-6 text-slate-500 sm:text-sm">
                      {technology.description}
                    </p>

                    {/* Logos */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {technology.items.map((item) =>
                        item.logo ? (
                          <span
                            key={item.name}
                            title={item.name}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-2 transition-all duration-300 group-hover:border-slate-300"
                          >
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="h-full w-full object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                            />
                          </span>
                        ) : (
                          <span
                            key={item.name}
                            title={item.name}
                            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] font-medium leading-tight text-slate-500"
                          >
                            {item.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Hover Arrow (right side) */}
                  <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute right-6 top-1/2 hidden -translate-x-2 -translate-y-1/2 text-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:right-8 lg:block"
                  />

                  {/* Hover Accent */}
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan transition-all duration-500 group-hover:w-full" />
                </a>
              );
            })}
          </div>
        )}

        {/* Compliance Content */}
        {!isTechnology && (
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {frameworks.map((framework, index) => (
              <article
                key={framework.name}
                className="group relative min-h-[335px] overflow-hidden rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md sm:px-12 sm:py-12"
              >

                {/* Logo */}
                <div className="flex h-20 items-center justify-center">
                  <img
                    src={framework.logo}
                    alt={framework.name}
                    className="max-h-20 max-w-[120px] object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-8 text-2xl font-medium tracking-tight text-blue-600 sm:text-3xl">
                  {framework.name}
                </h3>

                {/* Description */}
                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                  {framework.description}
                </p>

                {/* Small Accent */}
                <div
                  className={`mx-auto mt-8 h-1 w-12 rounded-full transition-all duration-500 group-hover:w-16 ${
                    index === 0
                      ? "bg-cyan"
                      : "bg-blue-600"
                  }`}
                />

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                    index === 0
                      ? "bg-cyan"
                      : "bg-blue-600"
                  }`}
                />
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default TechnologyCompliance;