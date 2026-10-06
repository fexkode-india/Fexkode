import SEO from "../components/SEO";

function Cookies() {
  return (
    <>
      <SEO
        title="Cookie Policy | Fexkode"
        description="Read Fexkode's Cookie Policy to understand how cookies and similar technologies may be used on the Fexkode website."
        canonical="https://fexkode.com/cookies"
      />

      <main className="min-h-screen bg-ink pt-20 text-white">
        {/* Header */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Legal
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Cookie Policy
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
              This Cookie Policy explains how Fexkode may use cookies and
              similar technologies when you visit our website.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Last updated: August 31, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <div className="space-y-12">

              <section>
                <h2 className="text-2xl font-semibold">
                  1. What Are Cookies?
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Cookies are small text files that may be stored on your
                  device when you visit a website. They can help websites
                  remember information, provide functionality, and understand
                  how visitors use the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  2. How We May Use Cookies
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Fexkode may use cookies and similar technologies to support
                  website functionality, improve performance, understand
                  website usage, and improve the user experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  3. Types of Cookies
                </h2>

                <div className="mt-6 space-y-6">

                  <div>
                    <h3 className="text-lg font-semibold">
                      Essential Cookies
                    </h3>

                    <p className="mt-2 text-base leading-8 text-slate-400">
                      These cookies may be necessary for certain website
                      functions to operate correctly.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      Analytics Cookies
                    </h3>

                    <p className="mt-2 text-base leading-8 text-slate-400">
                      These cookies may help us understand how visitors use the
                      website, such as which pages are visited and how users
                      interact with the site.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      Functional Cookies
                    </h3>

                    <p className="mt-2 text-base leading-8 text-slate-400">
                      These cookies may support preferences and functionality
                      that improve the website experience.
                    </p>
                  </div>

                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  4. Third-Party Cookies
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Some third-party services used by the website may place their
                  own cookies or similar technologies on your device. These
                  third parties are responsible for their own privacy and
                  cookie practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  5. Managing Cookies
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Most web browsers allow you to manage or disable cookies
                  through their settings. Disabling certain cookies may affect
                  the functionality or experience of some websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  6. Changes to This Cookie Policy
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  We may update this Cookie Policy from time to time. Any
                  changes will be published on this page with an updated
                  revision date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  7. Contact Us
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  If you have questions about this Cookie Policy, please
                  contact Fexkode through our Contact page.
                </p>
              </section>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Cookies;