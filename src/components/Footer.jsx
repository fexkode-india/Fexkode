import { Link } from "react-router-dom";

import logo from "../assets/images/Fexkode-symbol.png";


/* =========================================================
   FEXKODE FOOTER WORDMARK
   SAME STYLE AS NAVBAR
   FEX = WHITE
   KODE = CYAN
   ========================================================= */

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
      {/* F */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M10 12H58" />
        <path d="M10 38H52" />
        <path d="M10 38V68" />
      </g>

      {/* E */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M88 12H136" />
        <path d="M88 40H136" />
        <path d="M88 68H136" />
      </g>

      {/* X */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M166 12L216 68" />
        <path d="M216 12L166 68" />
      </g>

      {/* K */}

      <g stroke="#00C8FF" {...stroke}>
        <path d="M246 12V68" />
        <path d="M246 40L296 12" />
        <path d="M246 40L296 68" />
      </g>

      {/* O */}

      <g stroke="#00C8FF" {...stroke}>
        <rect
          x="326"
          y="12"
          width="58"
          height="56"
          rx="14"
        />
      </g>

      {/* D */}

      <g stroke="#00C8FF" {...stroke}>
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

      {/* FINAL E */}

      <g stroke="#00C8FF" {...stroke}>
        <path d="M506 12H554" />
        <path d="M506 40H554" />
        <path d="M506 68H554" />
      </g>
    </svg>
  );
}


/* =========================================================
   ORIGINAL LARGE WATERMARK
   DO NOT CHANGE THIS STYLE
   ========================================================= */

function FexkodeWatermark({ className = "" }) {
  const stroke = {
    strokeWidth: 7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
  };

  return (
    <svg
      viewBox="0 0 500 70"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Fexkode"
    >

      {/* F */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M10 12H58" />
        <path d="M10 12V58" />
        <path d="M10 35H49" />
      </g>


      {/* E */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M82 12V58" />
        <path d="M82 12H130" />
        <path d="M82 35H124" />
        <path d="M82 58H130" />
      </g>


      {/* X */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M153 12L198 58" />
        <path d="M198 12L153 58" />
      </g>


      {/* K */}

      <g stroke="#00C8FF" {...stroke}>
        <path d="M222 12V58" />
        <path d="M222 35L264 12" />
        <path d="M222 35L264 58" />
      </g>


      {/* O */}

      <g stroke="#00C8FF" {...stroke}>
        <rect
          x="286"
          y="12"
          width="49"
          height="46"
          rx="13"
        />
      </g>


      {/* D */}

      <g stroke="#00C8FF" {...stroke}>
        <path d="M357 12V58" />
        <path d="M357 12H374C391 12 401 22 401 35C401 48 391 58 374 58H357" />
      </g>


      {/* FINAL E */}

      <g stroke="#00C8FF" {...stroke}>
        <path d="M425 12V58" />
        <path d="M425 12H473" />
        <path d="M425 35H467" />
        <path d="M425 58H473" />
      </g>

    </svg>
  );
}


/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">

      {/* =====================================================
          MAIN FOOTER
          ===================================================== */}

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">


        {/* =================================================
            BRAND
            ================================================= */}

        <div>

          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center overflow-hidden">

              <img
                src={logo}
                alt="Fexkode"
                className="h-full w-full scale-[1.65] object-contain"
              />

            </div>


            {/* NAVBAR-STYLE FEXKODE */}

            <FexkodeWordmark className="h-7 w-auto sm:h-8" />

          </Link>


          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
            Cloud Infrastructure for What&apos;s Next.
          </p>

        </div>


        {/* =================================================
            EXPLORE
            ================================================= */}

        <div>

          <h3 className="mb-4 font-semibold text-white">
            Explore
          </h3>

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


        {/* =================================================
            COMPANY
            ================================================= */}

        <div>

          <h3 className="mb-4 font-semibold text-white">
            Company
          </h3>

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


        {/* =================================================
            CONNECT
            ================================================= */}

        <div>

          <h3 className="mb-4 font-semibold text-white">
            Connect
          </h3>

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


      {/* =====================================================
          COPYRIGHT
          ===================================================== */}

      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © 2026 Fexkode. All rights reserved.
      </div>


      {/* =====================================================
          LARGE CROPPED BRAND WATERMARK
          ORIGINAL STYLE PRESERVED
          ===================================================== */}

      <div className="pointer-events-none relative h-[130px] w-full select-none overflow-hidden">

        <div
          className="
            absolute
            left-1/2
            top-0
            flex
            -translate-x-1/2
            items-center
            gap-6
            opacity-[0.16]
            sm:gap-8
            md:gap-10
          "
        >

          {/* FEXKODE SYMBOL */}

          <div className="h-[230px] w-[230px] shrink-0">

            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-contain"
            />

          </div>


          {/* ORIGINAL WATERMARK WORDMARK */}

          <FexkodeWatermark
            className="h-[190px] w-[1050px] shrink-0"
          />

        </div>

      </div>

    </footer>
  );
}

export default Footer;