import { Link } from "react-router-dom";

import logo from "../assets/images/Fexkode-symbol.png";


function FexkodeWordmark({ className = "" }) {
  const stroke = {
    strokeWidth: 6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  };

  return (
    <svg
      viewBox="0 0 620 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Fexkode"
    >
      <g stroke="#FFFFFF" {...stroke}>
        <path d="M10 12H58" />
        <path d="M10 38H52" />
        <path d="M10 38V68" />
      </g>
      <g stroke="#FFFFFF" {...stroke}>
        <path d="M88 12H136" />
        <path d="M88 40H136" />
        <path d="M88 68H136" />
      </g>
      <g stroke="#FFFFFF" {...stroke}>
        <path d="M166 12L216 68" />
        <path d="M216 12L166 68" />
      </g>
      <g stroke="#FFFFFF" {...stroke}>
        <path d="M246 12V68" />
        <path d="M246 40L296 12" />
        <path d="M246 40L296 68" />
      </g>
      <g stroke="#FFFFFF" {...stroke}>
        <rect x="326" y="12" width="58" height="56" rx="14" />
      </g>
      <g stroke="#FFFFFF" {...stroke}>
        <path d="M414 12V68" />
        <path
          d="
            M414 12
            H436
            C458 12 470 23 470 40
            C470 57 458 68 436 68
            H414
          "
        />
      </g>
      <g stroke="#FFFFFF" {...stroke}>
        <path d="M506 12H554" />
        <path d="M506 40H554" />
        <path d="M506 68H554" />
      </g>
    </svg>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08090A] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-10 px-5 py-12 sm:grid-cols-2 sm:px-8 sm:py-14 lg:grid-cols-[1.45fr_1fr_1.25fr_0.8fr]">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt=""
                aria-hidden="true"
                width="28"
                height="28"
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-[2.8] object-contain"
              />
            </div>
            <FexkodeWordmark className="h-6 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Cloud Infrastructure for What&apos;s Next.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Explore</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <Link
              to="/solutions"
              className="block transition hover:text-white"
            >
              Solutions
            </Link>

            <Link
              to="/cloud-services"
              className="block transition hover:text-white"
            >
              Cloud Services
            </Link>

            <Link
              to="/industries"
              className="block transition hover:text-white"
            >
              Industries
            </Link>

            <Link
              to="/case-studies"
              className="block transition hover:text-white"
            >
              Case Studies
            </Link>

            <Link
              to="/blog"
              className="block transition hover:text-white"
            >
              Blog
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <Link
              to="/about"
              className="block transition hover:text-white"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="block transition hover:text-white"
            >
              Contact
            </Link>

            <Link
              to="/privacy"
              className="block transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="block transition hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/cookies"
              className="block transition hover:text-white"
            >
              Cookie Policy
            </Link>

            <Link
              to="/admin/login"
              className="block pt-2 text-slate-500 transition hover:text-cyan"
            >
              Admin Login
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Connect</h3>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-sm font-bold text-slate-300 transition hover:border-cyan/50 hover:text-white"
            >
              in
            </a>


            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-xs font-bold text-slate-300 transition hover:border-cyan/50 hover:text-white"
            >
              GH
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-slate-400 sm:px-8">
          © 2026 Fexkode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
