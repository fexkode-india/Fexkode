import { useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
import { ArrowRight, CheckCircle } from "lucide-react";
import PageHero from "../components/PageHero";
import azureLogo from "../assets/images/logos/azure.svg";
import awsLogo from "../assets/images/logos/aws.svg";
import googleCloudLogo from "../assets/images/logos/google-cloud.svg";

// -- Cloud provider data (Order: Azure, AWS, Google Cloud) ---------------------
const providers = [
  {
    badge: "Azure",
    name: "Azure",
    fullName: "Microsoft Azure",
    logo: azureLogo,
    logoAlt: "Microsoft Azure Logo",
    logoClass: "h-16 w-auto object-contain",
    description:
      "Gold Partner with advanced certifications in Azure Cloud, infrastructure, identity, and enterprise security.",
    borderColor: "border-sky-500",
    badgeClass: "bg-sky-500/10 text-sky-600 border border-sky-500/20",
    services: [
      "Entra ID (Azure AD)",
      "Azure DevOps Pipelines",
      "Azure Functions",
      "AKS Kubernetes Service",
      "ARM Templates & Bicep",
      "Azure Monitor & Insights",
      "Key Vault",
      "Cosmos DB & Azure SQL",
      "Azure Policy & Blueprints",
    ],
  },
  {
    badge: "AWS",
    name: "AWS",
    fullName: "Amazon Web Services",
    logo: awsLogo,
    logoAlt: "Amazon Web Services Logo",
    logoClass: "h-14 w-auto object-contain",
    description:
      "Certified AWS Partner — Expertise in cloud migration, DevOps, architecture design, and security operations.",
    borderColor: "border-amber-500",
    badgeClass: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
    services: [
      "EC2 & Auto Scaling",
      "S3 & EBS",
      "RDS & DynamoDB",
      "VPC & Route 53",
      "CloudFormation / CDK",
      "CloudWatch & X-Ray",
      "IAM & Organizations",
      "Cost Explorer",
      "EKS & Fargate",
    ],
  },
  {
    badge: "Google Cloud",
    name: "Google Cloud",
    fullName: "Google Cloud Platform",
    logo: googleCloudLogo,
    logoAlt: "Google Cloud Logo",
    logoClass: "h-10 w-auto object-contain",
    description:
      "Specialized in Google Kubernetes Engine (GKE), Anthos, BigQuery solutions, and data platform engineering.",
    borderColor: "border-blue-500",
    badgeClass: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
    services: [
      "GKE Google Kubernetes",
      "BigQuery & Data Studio",
      "Cloud Run & Cloud Functions",
      "Pub/Sub Messaging",
      "Cloud Armor & WAF",
      "Anthos Multi-cloud",
      "Cloud Spanner",
      "Deployment Manager",
      "Vertex AI Platform",
    ],
  },
];

// -- DevOps data ---------------------------------------------------------------
const devopsServices = [
  {
    title: "CI/CD Pipelines",
    description: "Automated build, testing and deployment pipelines for faster, safer releases.",
  },
  {
    title: "Infrastructure as Code",
    description: "Terraform and Pulumi-based infrastructure automation for consistent environments.",
  },
  {
    title: "Containerization",
    description: "Docker and container-based deployments for portable, consistent workloads.",
  },
  {
    title: "Kubernetes",
    description: "Container orchestration and cloud-native infrastructure at scale.",
  },
  {
    title: "Observability",
    description: "Infrastructure and application monitoring, logging and alerting.",
  },
  {
    title: "Automation",
    description: "Reduce manual operations and increase reliability through systematic automation.",
  },
];

// -- Security data -------------------------------------------------------------
const securityServices = [
  "Identity & Access Management",
  "Network Security",
  "Secrets Management",
  "Infrastructure Security",
  "Monitoring & Alerting",
  "Compliance Support",
  "Backup & Disaster Recovery",
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

/* Provider card: brand-colour line draws across the top, capability tags ripple up */
function ProviderCard({ p, index }) {
  const [ref, style] = useReveal(index * 150, "up");

  return (
    <article
      ref={ref}
      style={style}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-xl"
    >
      <span
        className={`pointer-events-none absolute inset-x-0 top-0 origin-center scale-x-0 border-t-[3px] transition-transform duration-500 ease-out group-hover:scale-x-100 ${p.borderColor}`}
      />

      {/* Top: Company Logo */}
      <div className="flex h-24 items-center justify-center rounded-2xl bg-slate-50/60 p-4 transition-colors duration-300 group-hover:bg-slate-50">
        <img
          src={p.logo}
          alt={p.logoAlt}
          className={`${p.logoClass} transition-transform duration-300 group-hover:scale-105`}
        />
      </div>

      {/* Title & Subtitle */}
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {p.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-cyan">{p.fullName}</p>
      </div>

      {/* Description */}
      <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
        {p.description}
      </p>

      {/* Services Divider & List */}
      <div className="mt-6 border-t border-slate-100 pt-6">
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Key Capabilities
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {p.services.map((svc, i) => (
            <span
              key={svc}
              style={{
                transitionProperty: "transform, background-color, border-color",
                transitionDelay: `${i * 35}ms, 0ms, 0ms`,
              }}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 duration-300 group-hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-100"
            >
              {svc}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* DevOps row: number and text slide right, a cyan line draws down the left edge */
function DevopsRow({ svc, index }) {
  const [ref, style] = useReveal(index * 100, "up");

  return (
    <div
      ref={ref}
      style={style}
      className="group relative flex gap-5 py-6"
    >
      <span className="pointer-events-none absolute bottom-6 left-0 top-6 w-[2px] origin-top scale-y-0 bg-cyan transition-transform duration-500 ease-out group-hover:scale-y-100" />

      <span className="mt-0.5 shrink-0 text-xs font-semibold tracking-[0.15em] text-cyan/50 transition-all duration-300 group-hover:translate-x-3 group-hover:text-cyan">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="transition-transform duration-300 group-hover:translate-x-3">
        <h3 className="text-base font-semibold text-white transition-colors duration-200 group-hover:text-cyan">
          {svc.title}
        </h3>

        <p className="mt-1.5 text-sm leading-6 text-slate-400">
          {svc.description}
        </p>
      </div>
    </div>
  );
}

/* Security checklist item: icon pops and the label nudges right on hover */
function SecurityItem({ item, index }) {
  const [ref, style] = useReveal(250 + index * 80, "up");

  return (
    <li
      ref={ref}
      style={style}
      className="group flex items-center gap-4 py-4"
    >
      <CheckCircle
        size={16}
        className="shrink-0 text-cyan transition-transform duration-300 group-hover:scale-150"
        strokeWidth={2}
      />
      <span className="text-sm font-medium text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-900">
        {item}
      </span>
    </li>
  );
}

/* Security button: an arrow slides in on hover */
function ArrowButton({ href, delay = 0, children }) {
  const [ref, style] = useReveal(delay, "up");

  return (
    <a
      ref={ref}
      style={style}
      href={href}
      className="group mt-8 inline-flex items-center rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white transition hover:bg-electric/90"
    >
      {children}
      <ArrowRight
        size={16}
        strokeWidth={2}
        className="ml-0 w-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-4 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </a>
  );
}

/* CTA button: a soft ring expands around it on hover */
function RingButton({ href, delay = 0, children }) {
  const [ref, style] = useReveal(delay, "up");

  return (
    <a
      ref={ref}
      style={style}
      href={href}
      className="mt-9 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-electric/90 hover:shadow-[0_0_0_8px_rgba(0,200,255,0.18)]"
    >
      {children}
    </a>
  );
}

// -----------------------------------------------------------------------------

function CloudServices() {
  return (
    <>
      <SEO
        title="Cloud Services | Fexkode"
        description="Fexkode provides cloud services across AWS, Microsoft Azure, and Google Cloud, including migration, infrastructure, DevOps, security, monitoring, and optimization."
        canonical="https://fexkode.com/cloud-services"
      />

      <main className="min-h-screen pt-20">

       <PageHero
  eyebrow="Cloud Services"
  title="Cloud capabilities built for modern infrastructure."
  description="Design, migrate, optimize, and operate secure cloud environments across AWS, Microsoft Azure, and Google Cloud with a practical, engineering-first approach."
 image="/src/assets/images/page-heros/cloud-services.png"
/>

        {/* -- Cloud Platforms — Light */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl">
              <Reveal
                as="h1"
                variant="left"
                className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
              >
                Platform Coverage
              </Reveal>

              <Reveal
                as="h2"
                variant="left"
                delay={150}
                className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
              >
                Cloud services tailored to the right platform.
              </Reveal>

              <Reveal
                as="h3"
                delay={300}
                className="mt-6 text-sm font-normal leading-7 text-slate-600 sm:text-base"
              >
                We work across all major cloud platforms, bringing deep engineering
                expertise to whichever environment fits your business.
              </Reveal>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {providers.map((p, index) => (
                <ProviderCard key={p.badge} p={p} index={index} />
              ))}
            </div>

          </div>
        </section>

        {/* -- DevOps & Automation — Dark */}
        <section className="border-y border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">

              {/* Left: heading block */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <Reveal
                  as="h1"
                  variant="left"
                  className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
                >
                  DevOps & Automation
                </Reveal>

                <Reveal
                  as="h2"
                  variant="left"
                  delay={150}
                  className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  Automation and delivery systems that reduce friction.
                </Reveal>

                <Reveal
                  as="h3"
                  delay={300}
                  className="mt-6 text-sm font-normal leading-7 text-slate-400 sm:text-base"
                >
                  From CI/CD pipelines to infrastructure-as-code, we streamline
                  every part of your development and delivery workflow.
                </Reveal>
              </div>

              {/* Right: numbered service list */}
              <div className="divide-y divide-white/5">
                {devopsServices.map((svc, i) => (
                  <DevopsRow key={svc.title} svc={svc} index={i} />
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* -- Cloud Security — Light */}
        <section className="border-b border-slate-200 bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">

              {/* Left */}
              <div>
                <Reveal
                  as="h1"
                  variant="left"
                  className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
                >
                  Cloud Security
                </Reveal>

                <Reveal
                  as="h2"
                  variant="left"
                  delay={150}
                  className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Security controls designed for real-world cloud environments.
                </Reveal>

                <Reveal
                  as="h3"
                  delay={300}
                  className="mt-6 text-sm font-normal leading-7 text-slate-600 sm:text-base"
                >
                  Security built into every layer of your infrastructure — from
                  identity and network to compliance and disaster recovery.
                </Reveal>

                <ArrowButton href="/contact" delay={450}>
                  Discuss your security needs ?
                </ArrowButton>
              </div>

              {/* Right: checklist panel */}
              <Reveal
                delay={150}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-8 py-6 shadow-sm"
              >
                <ul className="divide-y divide-slate-200">
                  {securityServices.map((item, i) => (
                    <SecurityItem key={item} item={item} index={i} />
                  ))}
                </ul>
              </Reveal>

            </div>
          </div>
        </section>

        {/* -- CTA — Dark */}
        <section className="border-t border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
            <Reveal
              as="h1"
              variant="left"
              className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl"
            >
              Get Started
            </Reveal>

            <Reveal
              as="h2"
              variant="left"
              delay={150}
              className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              Ready to build a stronger cloud foundation?
            </Reveal>

            <Reveal
              as="h3"
              delay={300}
              className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base"
            >
              Let's discuss your cloud goals, delivery workflow, and the right
              platform strategy for your organization.
            </Reveal>

            <RingButton href="/contact" delay={450}>
              Talk to an Expert
            </RingButton>
          </div>
        </section>

      </main>
    </>
  );
}

export default CloudServices;
