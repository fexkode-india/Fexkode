import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import awsLogo from "../../assets/images/logos/aws.svg";
import azureLogo from "../../assets/images/logos/azure.svg";
import googleCloudLogo from "../../assets/images/logos/google-cloud.svg";

/*
  Logo row — same idea as the reference: one line, equal heights,
  spread edge to edge, no boxes or borders.

  AWS + Google Cloud use your existing wordmark SVGs.
  Azure's SVG is icon-only, so "Microsoft Azure" text is added next to it.
  Anthropic + OpenAI have no files in /assets/images/logos yet, so they
  render as styled text wordmarks. To use the official logos later, drop
  anthropic.svg / openai.svg in that folder, import them here, and set
  `src` on those two entries (the component uses `src` when present).
*/

const partners = [
  { name: "AWS", src: awsLogo, imgClass: "h-9" },
  { name: "Microsoft Azure", src: azureLogo, imgClass: "h-8", label: "Microsoft Azure" },
  { name: "Google Cloud", src: googleCloudLogo, imgClass: "h-6" },
  { name: "Anthropic", wordmark: "ANTHROPIC", wordmarkClass: "text-[22px] font-bold uppercase tracking-[0.12em] text-slate-800" },
  { name: "OpenAI", wordmark: "OpenAI", wordmarkClass: "text-[26px] font-semibold tracking-tight text-slate-900" },
];

function Partnerships() {
  return (
    <section
      className="border-t border-slate-200 bg-white py-8 sm:py-10"
      aria-labelledby="partnerships-title"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading + button */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
              Technology Partners
            </p>
            <h2
              id="partnerships-title"
              className="mt-4 text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]"
            >
              Built on the platforms and models we work with.
            </h2>
          </div>
        </div>

        {/* Logo row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:justify-between">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center gap-2.5" title={p.name}>
              {p.src ? (
                <>
                  <img
                    src={p.src}
                    alt={p.name}
                    className={`${p.imgClass} w-auto object-contain`}
                  />
                  {p.label && (
                    <span className="text-xl font-semibold tracking-tight text-slate-700">
                      {p.label}
                    </span>
                  )}
                </>
              ) : (
                <span className={p.wordmarkClass} aria-label={p.name}>
                  {p.wordmark}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Partnerships;
