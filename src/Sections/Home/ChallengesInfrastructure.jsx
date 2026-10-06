import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

const cards = [
  {
    id: "challenges",
    title: "Common Challenges",
    eyebrow: "Common Challenges",
    heading: "Growth creates",
    headingMuted: "complexity.",
    intro:
      "As infrastructure grows, so does complexity, cost, and risk — until it starts slowing the business down.",
    items: [
      {
        number: "01",
        title: "Rising Infrastructure Costs",
        description:
          "Cloud spend grows faster than the business, with little visibility into where it's going.",
      },
      {
        number: "02",
        title: "Slower Delivery",
        description:
          "Manual processes and complex environments slow down new features and releases.",
      },
      {
        number: "03",
        title: "Security & Compliance Risk",
        description:
          "Legacy setups make it harder to meet the security bar customers and regulators expect.",
      },
      {
        number: "04",
        title: "Systems That Can't Scale",
        description:
          "Infrastructure built for yesterday's traffic breaks under tomorrow's growth.",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "Built for Modern Infrastructure",
    eyebrow: "Built for Modern Infrastructure",
    heading: "Infrastructure",
    headingMuted: "designed around what matters.",
    intro:
      "Secure, scalable and automated cloud foundations built to support modern businesses.",
    items: [
      {
        number: "01",
        title: "Secure by Design",
        description:
          "Security integrated into infrastructure from the beginning.",
      },
      {
        number: "02",
        title: "Built to Scale",
        description:
          "Infrastructure designed to grow with business requirements.",
      },
      {
        number: "03",
        title: "Automation First",
        description:
          "Reduce manual operations through automation and DevOps.",
      },
      {
        number: "04",
        title: "Cloud Native",
        description:
          "Modern architectures built around cloud-native principles.",
      },
    ],
  },
];

function ChallengesInfrastructure() {
  // The highlighted (dark) card. Hover / tap / focus a card to switch.
  const [active, setActive] = useState("challenges");
  const current = cards.find((c) => c.id === active);

  // Lets other sections (e.g. the Technology tab) highlight the Infrastructure card
  useEffect(() => {
    const showInfrastructure = () => setActive("infrastructure");
    window.addEventListener("show-infrastructure-tab", showInfrastructure);
    return () =>
      window.removeEventListener("show-infrastructure-tab", showInfrastructure);
  }, []);

  return (
    <section
      id="challenges-infrastructure"
      className="relative scroll-mt-20 overflow-hidden border-t border-slate-200 bg-white py-24 text-slate-900 sm:py-28"
      aria-labelledby="challenges-infrastructure-title"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-24 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header (follows the highlighted card) */}
        <div className="max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
            {current.eyebrow}
          </p>

          <h2
            id="challenges-infrastructure-title"
            className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl"
          >
            {current.heading}
            <span className="block text-slate-400">
              {current.headingMuted}
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            {current.intro}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row">
          {cards.map((card) => {
            const isActive = active === card.id;

            return (
              <article
                key={card.id}
                tabIndex={0}
                onMouseEnter={() => setActive(card.id)}
                onFocus={() => setActive(card.id)}
                onClick={() => setActive(card.id)}
                className={`relative flex min-w-0 flex-col rounded-2xl border p-6 outline-none transition-[flex-grow,background-color,border-color,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-8 ${
                  isActive
                    ? "border-[#0a0a0a] bg-[#0a0a0a] text-white md:flex-[1.6_1_0%]"
                    : "border-slate-200 bg-white text-slate-900 md:flex-[1_1_0%]"
                }`}
              >
                {/* Title + arrow */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold uppercase leading-tight tracking-tight text-cyan sm:text-xl">
                    {card.title}
                  </h3>

                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                      isActive
                        ? "border-white/15 text-white"
                        : "border-slate-200 text-slate-900"
                    }`}
                    aria-hidden="true"
                  >
                   
                  </span>
                </div>

                {/* Items */}
                <ul className="mt-6 flex flex-col">
                  {card.items.map((item) => (
                    <li
                      key={item.title}
                      className={`flex gap-4 border-t py-4 transition-colors duration-500 ${
                        isActive ? "border-white/10" : "border-slate-200"
                      }`}
                    >
                      <span
                        className={`pt-0.5 text-[11px] font-medium tracking-[0.2em] ${
                          isActive ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {item.number}
                      </span>

                      <div>
                        <h4 className="text-base font-medium tracking-tight">
                          {item.title}
                        </h4>
                        <p
                          className={`mt-1 text-[13px] leading-6 ${
                            isActive ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ChallengesInfrastructure;
