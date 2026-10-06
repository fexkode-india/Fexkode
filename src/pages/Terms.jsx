import SEO from "../components/SEO";

function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions | Fexkode"
        description="Read Fexkode's Terms & Conditions governing the use of the Fexkode website and its content."
        canonical="https://fexkode.com/terms"
      />

      <main className="min-h-screen bg-ink pt-20 text-white">
        {/* Header */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Legal
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Terms & Conditions
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
              These Terms & Conditions govern your use of the Fexkode website
              and its content.
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
                  1. Acceptance of Terms
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  By accessing or using the Fexkode website, you agree to be
                  bound by these Terms & Conditions. If you do not agree with
                  these terms, please do not use the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  2. Website Use
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  You may use this website for lawful purposes and in
                  accordance with these terms. You must not use the website in
                  a way that could damage, disable, overburden, or interfere
                  with its operation or security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  3. Website Content
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  The content on this website is provided for general
                  informational purposes. Fexkode may update, modify, or remove
                  website content at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  4. Intellectual Property
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Unless otherwise stated, the website and its content,
                  including text, graphics, branding, logos, and other
                  materials, are owned by or licensed to Fexkode and are
                  protected by applicable intellectual property laws.
                </p>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  You may not reproduce, distribute, modify, or commercially
                  exploit website content without appropriate authorization.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  5. Third-Party Links
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  The website may contain links to third-party websites or
                  services. These links are provided for convenience, and
                  Fexkode is not responsible for the content, availability, or
                  practices of third-party websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  6. No Guarantee
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  While Fexkode aims to keep website information accurate and
                  current, we do not guarantee that all content will always be
                  complete, accurate, current, or free from errors.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  7. Limitation of Liability
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  To the extent permitted by applicable law, Fexkode shall not
                  be liable for any direct, indirect, incidental, consequential,
                  or other losses arising from your use of or inability to use
                  the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  8. Privacy
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Your use of the website may involve the collection and
                  processing of information as described in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  9. Changes to These Terms
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Fexkode may revise these Terms & Conditions from time to
                  time. Updated terms will be published on this page with a
                  revised date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  10. Governing Law
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  These terms shall be interpreted in accordance with the
                  applicable laws and regulations governing Fexkode and its
                  operations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  11. Contact Us
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  If you have questions regarding these Terms & Conditions,
                  please contact Fexkode through our Contact page.
                </p>
              </section>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Terms;