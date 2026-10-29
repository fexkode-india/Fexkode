import ScrollReveal from "../components/ScrollReveal";

function WebDevelopment() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-black">
      <div className="mx-auto max-w-[1500px] px-6 py-28 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <ScrollReveal>
            <h2 className="flex items-center gap-3 text-2xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-3xl">
              <span className="h-px w-9 bg-cyan" />
              Web Development
            </h2>
          </ScrollReveal>

          <ScrollReveal className="delay-100">
            <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white lg:text-6xl">
              Fast, modern websites
              <br />
              <span className="text-slate-400">built to scale.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal className="delay-200">
            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              We design and build responsive websites and web applications
              that are fast, secure and easy to grow.
            </p>
          </ScrollReveal>

          <ScrollReveal className="delay-300">
            <a
              href="/contact"
              className="mt-9 inline-block rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
            >
              Talk to an Expert
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default WebDevelopment;