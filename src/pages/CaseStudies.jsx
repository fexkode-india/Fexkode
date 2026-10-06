import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

const caseStudies = [
  {
    number: "01",
    category: "Cloud Migration",
    title: "Modernizing a legacy infrastructure",
    description:
      "A structured approach to moving workloads toward a more scalable and reliable cloud environment.",
    result: "Scalable cloud foundation",
  },
  {
    number: "02",
    category: "DevOps",
    title: "Improving application delivery",
    description:
      "Automation and CI/CD practices designed to reduce manual processes and create a more consistent delivery workflow.",
    result: "Faster, repeatable releases",
  },
  {
    number: "03",
    category: "Cloud Security",
    title: "Strengthening cloud operations",
    description:
      "Security-focused infrastructure improvements covering access, architecture, monitoring, and operational controls.",
    result: "Stronger security posture",
  },
];

function CaseStudies() {
  return (
    <>
      <SEO
        title="Case Studies | Fexkode"
        description="Explore Fexkode case studies covering cloud migration, DevOps, cloud security, infrastructure modernization, and engineering solutions."
        canonical="/case-studies"
      />

      <main className="min-h-screen pt-20">

        {/* Hero — Dark */}
        <PageHero
          eyebrow="Case Studies"
          title="Engineering solutions that create measurable value."
          description="Explore examples of how engineering, cloud infrastructure, and automation can address real technology challenges."
          image="/src/assets/images/page-heros/case-studies.png"
        />

        {/* Case Studies Grid — Light */}
        <section className="border-t border-slate-200 bg-white py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="max-w-3xl mb-14">
              <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
                Case Studies
              </h1>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Real projects. Real outcomes.
              </h2>

              <h3 className="mt-6 text-sm font-normal leading-7 text-slate-600 sm:text-base">
                Examples of how structured engineering, cloud infrastructure,
                and automation address real technology challenges.
              </h3>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">

              {caseStudies.map((caseStudy) => (
                <article
                  key={caseStudy.number}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8 transition duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:bg-white hover:shadow-lg"
                >
                  <span className="text-xs font-semibold tracking-[0.15em] text-cyan">
                    {caseStudy.number}
                  </span>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {caseStudy.category}
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                    {caseStudy.title}
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {caseStudy.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="border-t border-slate-200 pt-5">
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
                        Outcome
                      </p>

                      <p className="mt-2 text-sm font-medium text-cyan">
                        {caseStudy.result}
                      </p>
                    </div>
                  </div>
                </article>
              ))}

            </div>

          </div>
        </section>

        {/* CTA — Dark */}
        <section className="border-t border-white/5 bg-ink py-24 text-white">
          <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

            <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
              Your Challenge
            </h1>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Let's solve your next infrastructure challenge.
            </h2>

            <h3 className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-7 text-slate-400 sm:text-base">
              Tell us where you are today and where you need to go.
            </h3>

            <a
              href="/contact"
              className="mt-9 inline-flex rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-electric/90"
            >
              Talk to an Expert
            </a>

          </div>
        </section>

      </main>
    </>
  );
}

export default CaseStudies;