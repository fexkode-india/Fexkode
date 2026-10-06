import { useState } from "react";
import {
  Search,
  FileText,
  Target,
  Network,
  Shield,
  Zap,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

import InfrastructureStack from "./InfrastructureStack";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand infrastructure, applications and requirements.",
    heading: "Discovery & Assessment",
    detail:
      "We start by understanding your business goals, current infrastructure, applications and requirements. This helps us define the right strategy for your cloud journey.",
    points: [
      {
        icon: Search,
        text: "Infrastructure assessment",
      },
      {
        icon: FileText,
        text: "Requirement analysis",
      },
      {
        icon: Target,
        text: "Strategy and roadmap",
      },
    ],
  },
  {
    number: "02",
    title: "Design",
    description:
      "Create architecture and implementation strategy.",
    heading: "Architecture & Design",
    detail:
      "We create an infrastructure architecture aligned with your technical requirements, security needs, scalability goals and business priorities.",
    points: [
      {
        icon: Network,
        text: "Cloud architecture",
      },
      {
        icon: Shield,
        text: "Security planning",
      },
      {
        icon: TrendingUp,
        text: "Scalability strategy",
      },
    ],
  },
  {
    number: "03",
    title: "Build",
    description:
      "Implement infrastructure, automation and security.",
    heading: "Implementation & Automation",
    detail:
      "We implement the designed infrastructure with automation, security and DevOps practices to create a reliable operational foundation.",
    points: [
      {
        icon: Zap,
        text: "Infrastructure automation",
      },
      {
        icon: Shield,
        text: "Security implementation",
      },
      {
        icon: Network,
        text: "DevOps integration",
      },
    ],
  },
  {
    number: "04",
    title: "Scale",
    description:
      "Monitor, optimize and continuously improve.",
    heading: "Optimization & Growth",
    detail:
      "Once the infrastructure is running, we monitor, optimize and continuously improve the environment as your business and workloads evolve.",
    points: [
      {
        icon: TrendingUp,
        text: "Performance optimization",
      },
      {
        icon: CheckCircle2,
        text: "Continuous monitoring",
      },
      {
        icon: Zap,
        text: "Operational improvement",
      },
    ],
  },
];

const reasons = [
  {
    number: "01",
    title: "Engineering First",
    description:
      "Technology decisions driven by engineering principles.",
  },
  {
    number: "02",
    title: "Secure by Default",
    description:
      "Security considered throughout the infrastructure lifecycle.",
  },
  {
    number: "03",
    title: "Long-Term Partnership",
    description:
      "We work as an extension of your team, not a one-time vendor.",
  },
  {
    number: "04",
    title: "Automation Driven",
    description:
      "Reduce operational complexity through automation.",
  },
  {
    number: "05",
    title: "Scalable Architecture",
    description:
      "Build infrastructure that can grow with business needs.",
  },
  {
    number: "06",
    title: "Transparent Approach",
    description:
      "Clear communication, architecture and implementation processes.",
  },
];

const outcomes = [
  {
    number: "01",
    title: "Lower Operational Complexity",
    description:
      "Simplify infrastructure and reduce the operational effort required to manage growing environments.",
  },
  {
    number: "02",
    title: "Faster Delivery Cycles",
    description:
      "Automation and modern infrastructure practices help teams deliver changes more efficiently.",
  },
  {
    number: "03",
    title: "Stronger Security Posture",
    description:
      "Security is considered throughout the infrastructure lifecycle.",
  },
  {
    number: "04",
    title: "Infrastructure That Scales With You",
    description:
      "Build infrastructure that can evolve as business requirements and workloads grow.",
  },
  {
    number: "05",
    title: "Reduced Overhead",
    description:
      "Improve operational efficiency and reduce unnecessary infrastructure complexity.",
  },
];

function HowFexkodeCreatesValue() {
  const [activeTab, setActiveTab] = useState("process");
  const [activeStep, setActiveStep] = useState(0);
  const [activeReason, setActiveReason] = useState(0);
  const [activeOutcome, setActiveOutcome] = useState(0);

  const tabs = [
    {
      id: "process",
      label: "Our Process",
    },
    {
      id: "why",
      label: "Why Fexkode",
    },
    {
      id: "outcomes",
      label: "Outcomes",
    },
  ];

  const currentStep = processSteps[activeStep];

  return (
    <section
  id="how-fexkode-creates-value"
  className="relative overflow-hidden border-t border-slate-200 bg-white py-24 text-slate-900 sm:py-28"
  aria-labelledby="how-fexkode-title"
>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
            How Fexkode Creates Value
          </p>

          <h2
            id="how-fexkode-title"
            className="mt-6 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Infrastructure engineered around
            <span className="block text-slate-400">
              your business needs.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
            We combine cloud expertise, automation and security to build
            infrastructure that helps you move faster, operate efficiently
            and scale with confidence.
          </p>
        </div>

        {/* Main Tabs */}
        <div className="mx-auto mt-12 flex max-w-2xl rounded-full border border-slate-200 bg-slate-50 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onMouseEnter={() => setActiveTab(tab.id)}
                onFocus={() => setActiveTab(tab.id)}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* OUR PROCESS */}
        {/* ========================================================= */}

        {activeTab === "process" && (
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.75fr_1.15fr_0.9fr]">

            {/* LEFT - PROCESS LIST */}
            <div className="relative">
              <div className="absolute left-[23px] top-7 bottom-7 hidden w-px bg-slate-200 sm:block" />

              <div className="space-y-2">
                {processSteps.map((step, index) => {
                  const isActive = activeStep === index;

                  return (
                    <button
                      key={step.title}
                      type="button"
                      onMouseEnter={() => setActiveStep(index)}
                      onFocus={() => setActiveStep(index)}
                      onClick={() => setActiveStep(index)}
                      className={`group relative flex w-full items-start gap-5 rounded-xl p-4 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-slate-50"
                          : "hover:bg-slate-50/70"
                      }`}
                    >
                      {/* Number */}
                      <span
                        className={`relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-xs font-semibold tracking-[0.1em] transition-all duration-300 ${
                          isActive
                            ? "border-cyan bg-cyan text-white"
                            : "border-slate-200 bg-white text-slate-400 group-hover:border-cyan/50 group-hover:text-cyan"
                        }`}
                      >
                        {step.number}
                      </span>

                      {/* Text */}
                      <span className="pt-1">
                        <span
                          className={`block text-xl font-medium tracking-tight transition-colors duration-300 ${
                            isActive
                              ? "text-slate-900"
                              : "text-slate-500 group-hover:text-slate-900"
                          }`}
                        >
                          {step.title}
                        </span>

                        <span className="mt-2 block max-w-xs text-sm leading-6 text-slate-400">
                          {step.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MIDDLE - INFRASTRUCTURE STACK */}
            <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-6 sm:p-8">

              {/* Subtle background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.12),transparent_50%)]" />

              <div className="relative flex h-full min-h-[380px] items-center justify-center">
                <div className="w-full">
                  <InfrastructureStack />
                </div>
              </div>

              {/* Top Label */}
              <div className="absolute left-5 top-5 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-sm">
                <p className="text-xs text-slate-400">
                  Cloud Infrastructure
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {currentStep.title}
                </p>
              </div>

              {/* Bottom Status */}
              <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-lg border border-cyan/20 bg-black/40 px-4 py-3 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-cyan" />

                <span className="text-xs text-slate-300">
                  Fexkode Infrastructure
                </span>
              </div>
            </div>

            {/* RIGHT - DETAIL */}
            <div className="relative overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-9">

              <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full border border-cyan/10" />

              <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full border border-cyan/10" />

              <div className="relative flex h-full flex-col">

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium tracking-[0.2em] text-cyan">
                    {currentStep.number}
                  </span>

                  <span className="h-px w-8 bg-cyan/50" />
                </div>

                <h3 className="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">
                  {currentStep.heading}
                </h3>

                <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base">
                  {currentStep.detail}
                </p>

                <div className="mt-8 space-y-5">
                  {currentStep.points.map((point) => {
                    const Icon = point.icon;

                    return (
                      <div
                        key={point.text}
                        className="flex items-center gap-4"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-cyan">
                          <Icon
                            size={17}
                            strokeWidth={1.5}
                          />
                        </div>

                        <span className="text-sm text-slate-300">
                          {point.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-10">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-600">
                    Current stage
                  </span>

                  <p className="mt-2 text-lg font-medium text-white">
                    {currentStep.title}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* WHY FEXKODE */}
        {/* ========================================================= */}

        {activeTab === "why" && (
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.75fr_1.15fr_0.9fr]">

            {/* LEFT */}
            <div className="space-y-2">
              {reasons.map((reason, index) => {
                const isActive = activeReason === index;

                return (
                  <button
                    key={reason.title}
                    type="button"
                    onMouseEnter={() => setActiveReason(index)}
                    onFocus={() => setActiveReason(index)}
                    onClick={() => setActiveReason(index)}
                    className={`group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-slate-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border text-xs font-medium tracking-[0.1em] transition-all duration-300 ${
                        isActive
                          ? "border-cyan bg-cyan text-white"
                          : "border-slate-200 text-slate-400 group-hover:border-cyan/50 group-hover:text-cyan"
                      }`}
                    >
                      {reason.number}
                    </span>

                    <span
                      className={`text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-500 group-hover:text-slate-900"
                      }`}
                    >
                      {reason.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* MIDDLE */}
            <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-10">

              <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full border border-cyan/10" />

              <div className="absolute bottom-[-100px] left-[-80px] h-64 w-64 rounded-full border border-slate-200" />

              <div className="relative">
                <span className="text-7xl font-semibold tracking-tight text-slate-200">
                  0{activeReason + 1}
                </span>

                <h3 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {reasons[activeReason].title}
                </h3>

                <div className="mt-7 h-px w-16 bg-cyan" />

                <p className="mt-7 max-w-lg text-base leading-8 text-slate-500">
                  {reasons[activeReason].description}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-9">

              <div className="absolute -bottom-24 -right-24 h-60 w-60 rounded-full border border-cyan/10" />

              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                  Why Fexkode
                </p>

                <h3 className="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">
                  Engineering expertise
                  <span className="block text-slate-500">
                    with a business mindset.
                  </span>
                </h3>

                <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base">
                  We combine technical depth with practical thinking to build
                  cloud infrastructure that creates lasting value.
                </p>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
                    Principle
                  </p>

                  <p className="mt-3 text-lg text-slate-200">
                    {reasons[activeReason].title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* OUTCOMES */}
        {/* ========================================================= */}

        {activeTab === "outcomes" && (
          <div className="mt-16 grid gap-8 lg:grid-cols-[0.75fr_1.15fr_0.9fr]">

            {/* LEFT */}
            <div className="space-y-2">
              {outcomes.map((outcome, index) => {
                const isActive = activeOutcome === index;

                return (
                  <button
                    key={outcome.title}
                    type="button"
                    onMouseEnter={() => setActiveOutcome(index)}
                    onFocus={() => setActiveOutcome(index)}
                    onClick={() => setActiveOutcome(index)}
                    className={`group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-slate-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border text-xs font-medium tracking-[0.1em] transition-all duration-300 ${
                        isActive
                          ? "border-cyan bg-cyan text-white"
                          : "border-slate-200 text-slate-400 group-hover:border-cyan/50 group-hover:text-cyan"
                      }`}
                    >
                      {outcome.number}
                    </span>

                    <span
                      className={`text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-slate-900"
                          : "text-slate-500 group-hover:text-slate-900"
                      }`}
                    >
                      {outcome.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* MIDDLE */}
            <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-2xl bg-slate-950 p-10 text-white">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.12),transparent_55%)]" />

              <div className="relative w-full">
                <span className="text-8xl font-semibold tracking-tight text-white/[0.05]">
                  0{activeOutcome + 1}
                </span>

                <h3 className="mt-4 max-w-xl text-4xl font-medium tracking-tight sm:text-5xl">
                  {outcomes[activeOutcome].title}
                </h3>

                <div className="mt-8 h-px w-16 bg-cyan" />

                <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">
                  {outcomes[activeOutcome].description}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-9">

              <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full border border-cyan/10" />

              <div className="relative flex h-full flex-col">

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                  The Outcome
                </p>

                <h3 className="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">
                  What you gain
                  <span className="block text-slate-500">
                    by working with Fexkode.
                  </span>
                </h3>

                <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base">
                  Infrastructure improvements that translate into a more
                  reliable, efficient and scalable business.
                </p>

                <div className="mt-auto pt-10">
                  <div className="flex items-center gap-3 text-cyan">
                    <CheckCircle2
                      size={18}
                      strokeWidth={1.5}
                    />

                    <span className="text-sm">
                      Fexkode infrastructure advantage
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HowFexkodeCreatesValue;