import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
function PageHero({
  eyebrow,
  title,
  description,
  image,
  buttonText,
  buttonLink,
  viewportHeight = false,
}) {
  return (
    <section
      className={`relative overflow-hidden border-b border-white/10 bg-[#050505] text-white ${
        viewportHeight
          ? "h-screen"
          : "min-h-[calc(100vh_-_90px)]"
      }`}
    >
      {/* Full Hero Image */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover object-[right_center] grayscale-[10%]"
          />

          {/* Light overall image treatment */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Soft dark gradient behind the text only */}
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#050505]/90 via-[#050505]/55 to-transparent lg:w-[65%]" />

          {/* Subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 mx-auto flex max-w-7xl items-end px-6 pb-16 pt-24 sm:px-10 sm:pb-20 lg:px-12 ${
          viewportHeight
            ? "h-full"
            : "min-h-[calc(100vh_-_90px)]"
        }`}
      >
        <div className="max-w-3xl">
          <ScrollReveal>
            {eyebrow && (
              <p className="mb-7 text-xs font-medium uppercase tracking-[0.28em] text-cyan">
                {eyebrow}
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal className="delay-100">
            {title && (
              <h1 className="max-w-3xl text-5xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                {title}
              </h1>
            )}
          </ScrollReveal>

          <ScrollReveal className="delay-200">
            {description && (
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                {description}
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal className="delay-300">
            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className="group mt-9 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-sm font-medium text-white transition-colors duration-300 hover:border-cyan hover:text-cyan"
              >
                {buttonText}

                <ArrowRight
                  size={17}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            )}
          </ScrollReveal>
        </div>
      </div>

      {/* Editorial corner details */}
      <div className="pointer-events-none absolute left-6 top-6 z-10 h-16 w-16 border-l border-t border-white/20 sm:left-10 sm:top-10" />

      <div className="pointer-events-none absolute bottom-6 right-6 z-10 h-16 w-16 border-b border-r border-cyan/40 sm:bottom-10 sm:right-10" />
    </section>
  );
}

export default PageHero;