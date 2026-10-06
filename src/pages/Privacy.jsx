import SEO from "../components/SEO";

function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Fexkode"
        description="Read Fexkode's Privacy Policy to understand how we collect, use, and protect information when you use our website."
        canonical="https://fexkode.com/privacy"
      />

      <main className="min-h-screen bg-ink pt-20 text-white">
        {/* Header */}
        <section className="border-b border-white/5">
          <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Legal
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400">
              This Privacy Policy explains how Fexkode collects, uses, and
              protects information when you visit or use our website.
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
                  1. Information We Collect
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  We may collect information that you voluntarily provide when
                  you contact us, request information, or otherwise interact
                  with our website.
                </p>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  This may include your name, email address, company details,
                  phone number, and information contained in your message or
                  inquiry.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  2. Automatically Collected Information
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  When you visit our website, certain technical information
                  may be collected automatically. This may include your IP
                  address, browser type, device information, pages visited,
                  referring pages, and general usage information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  3. How We Use Information
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Information we collect may be used to respond to inquiries,
                  provide requested information, improve our website and
                  services, maintain website security, and understand how our
                  website is used.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  4. Cookies
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Our website may use cookies and similar technologies to
                  support website functionality, understand website usage, and
                  improve the user experience.
                </p>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  For more information about cookies, please see our Cookie
                  Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  5. Sharing of Information
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Fexkode does not sell personal information. Information may
                  be shared with service providers or other parties where
                  necessary to operate our website, provide services, maintain
                  security, or comply with applicable legal requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  6. Data Security
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  We take reasonable measures to protect information against
                  unauthorized access, alteration, disclosure, or destruction.
                  However, no method of transmission or storage can be
                  guaranteed to be completely secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  7. Third-Party Services
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Our website may use third-party services for hosting,
                  analytics, communication, or other website functionality.
                  These services may process information in accordance with
                  their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  8. Your Rights
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  Depending on applicable law, you may have rights regarding
                  your personal information, including the right to request
                  access, correction, or deletion of information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  9. Changes to This Privacy Policy
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  We may update this Privacy Policy from time to time. Any
                  changes will be reflected on this page with an updated
                  revision date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold">
                  10. Contact Us
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-400">
                  If you have questions about this Privacy Policy or how your
                  information is handled, please contact Fexkode through our
                  Contact page.
                </p>
              </section>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Privacy;