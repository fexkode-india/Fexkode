import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "../../components/SEO";
import PageHero from "../../components/PageHero";
import ScrollReveal from "../../components/ScrollReveal";

const capabilities = [
  "CI/CD pipeline implementation",
  "Infrastructure as Code",
  "Deployment automation",
  "Development environment automation",
  "Monitoring and observability",
  "Release process optimization",
];

const processSteps = [
  [
    "01",
    "Understand",
    "Review the existing development and deployment workflow.",
  ],
  [
    "02",
    "Design",
    "Define automation and infrastructure patterns around the team's needs.",
  ],
  [
    "03",
    "Automate",
    "Implement repeatable pipelines, infrastructure, and operational workflows.",
  ],
  [
    "04",
    "Improve",
    "Measure the workflow and continuously improve reliability and efficiency.",
  ],
];

/* Distinct Interactive 3D Subtle Tilt Card for Capabilities */
function InteractiveTiltCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransformStyle(
      `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: "transform 0.2s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      className={`group relative will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

function DevOpsAutomation() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <SEO
        title="DevOps & Automation | Fexkode"
        description="Fexkode helps engineering teams automate software delivery, infrastructure, CI/CD pipelines, deployment workflows, monitoring, and operational processes."
        canonical="/solutions/devops"
      />

      <main className="min-h-screen pt-20">
        {/* Hero */}
        <PageHero
          eyebrow="DevOps & Automation"
          title="Automate the path from code to production."
          description="Build repeatable delivery processes and automated infrastructure that help engineering teams release software with greater consistency and confidence."
          image="/src/assets/images/page-heros/devops.png"
          buttonText="Discuss Your Requirements"
          buttonLink="/contact"
        />

        {/* Overview */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <ScrollReveal>
                <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                  DevOps Engineering
                </h1>
              </ScrollReveal>

              <ScrollReveal className="delay-100">
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Replace repetitive processes with reliable automation.
                </h2>
              </ScrollReveal>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <ScrollReveal className="delay-150">
                <p>
                  Manual deployment and infrastructure processes can create
                  inconsistency and slow down engineering teams.
                </p>
              </ScrollReveal>

              <ScrollReveal className="delay-200">
                <p>
                  A well-designed DevOps environment brings development,
                  infrastructure, security, and operations closer together through
                  automation and repeatable workflows.
                </p>
              </ScrollReveal>

              <ScrollReveal className="delay-300">
                <p>
                  We focus on creating practical automation that teams can
                  understand, maintain, and improve over time.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Capabilities — 3D Micro-tilt interactive grid */}
        <section className="bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <ScrollReveal>
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Capabilities
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Build a more efficient delivery workflow.
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <ScrollReveal
                  key={capability}
                  className={`delay-${((index % 3) + 1) * 100}`}
                >
                  <InteractiveTiltCard className="h-full rounded-2xl border border-white/10 bg-deepBlue/30 p-6 hover:border-cyan/50 hover:shadow-xl hover:shadow-cyan/10">
                    <span className="text-xs font-semibold tracking-[0.15em] text-cyan transition-colors duration-300">
                      0{index + 1}
                    </span>

                    <h3 className="mt-5 text-lg font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                      {capability}
                    </h3>
                  </InteractiveTiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process — Interactive Pipeline Stages */}
        <section className="border-b border-slate-200 bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <ScrollReveal>
                <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                  Our Approach
                </h1>
              </ScrollReveal>

              <ScrollReveal className="delay-100">
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Automation that supports the entire delivery lifecycle.
                </h2>
              </ScrollReveal>
            </div>

            {/* Pipeline Step Grid */}
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(([number, title, description], index) => {
                const isSelected = activeStep === index;
                const isPassed = index <= activeStep;

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
                      className={`relative h-full cursor-pointer overflow-hidden rounded-2xl border bg-white p-7 shadow-sm transition-all duration-300 hover:border-cyan/50 hover:shadow-md ${
                        isSelected
                          ? "-translate-y-2 border-cyan shadow-lg shadow-cyan/10 ring-1 ring-cyan/40"
                          : "border-slate-200"
                      }`}
                    >
                      {/* Top pipeline progress bar */}
                      <span
                        className={`absolute left-0 top-0 h-[3px] transition-all duration-500 ${
                          isPassed ? "w-full bg-cyan" : "w-0 bg-transparent"
                        }`}
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-[0.15em] text-cyan">
                          {number}
                        </span>
                        <div
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            isSelected ? "bg-cyan scale-125" : "bg-slate-300"
                          }`}
                        />
                      </div>

                      <h3
                        className={`mt-6 text-xl font-semibold text-slate-900 transition-transform duration-300 ${
                          isSelected ? "translate-x-1" : ""
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
                Ready to automate your delivery?
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h3 className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base">
                Let's discuss your current workflow and where automation can make
                the biggest difference.
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

export default DevOpsAutomation;