import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Fexkode</title>
        <meta
          name="description"
          content="The page you're looking for could not be found."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="min-h-screen bg-ink text-white">
        <section className="flex min-h-screen items-center justify-center px-5 py-24">
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              404
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">
              Page Not Found
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              The page you're looking for doesn't exist or may have been
              moved. Let's get you back to Fexkode.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Back to Home
              </Link>

              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Explore Blog
              </Link>

            </div>

          </div>
        </section>
      </main>
    </>
  );
}

export default NotFound;