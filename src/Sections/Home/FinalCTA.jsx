import Button from "../../components/Button";

function FinalCTA() {
  return (
    <section
      className="border-t border-slate-200 bg-slate-50 py-24"
      aria-labelledby="final-cta-title"
    >
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">

        <h1 className="text-3xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-4xl">
          Let's Build
        </h1>

        <h2
          id="final-cta-title"
          className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
        >
          Ready to build what's next?
        </h2>

        <h3 className="mx-auto mt-6 max-w-2xl text-sm font-normal leading-6 text-slate-600 sm:text-base">
          Talk to our team about your cloud infrastructure,
          modernization, and engineering needs.
        </h3>

        <div className="mt-9 flex justify-center">
          <Button to="/contact">
            Talk to an Expert
          </Button>
        </div>

      </div>
    </section>
  );
}

export default FinalCTA;