import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Cloud,
  Building2,
  Server,
  GitBranch,
  Shield,
  Settings,
  Box,
  Database,
  CloudUpload,
  Info,
  BookOpen,
  Mail,
  Layers,
} from "lucide-react";

import logo from "../assets/images/Fexkode-symbol.png";

/* =========================================================
   FEXKODE WORDMARK
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
      {/* ================= F ================= */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M10 12H58" />
        <path d="M10 38H52" />
        <path d="M10 38V68" />
      </g>

      {/* ================= E ================= */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M88 12H136" />
        <path d="M88 40H136" />
        <path d="M88 68H136" />
      </g>

      {/* ================= X ================= */}

      <g stroke="#FFFFFF" {...stroke}>
        <path d="M166 12L216 68" />
        <path d="M216 12L166 68" />
      </g>

      {/* ================= K ================= */}

      <g stroke="#00C8FF" {...stroke}>
        <path d="M246 12V68" />
        <path d="M246 40L296 12" />
        <path d="M246 40L296 68" />
      </g>

      {/* ================= O ================= */}

      <g stroke="#00C8FF" {...stroke}>
        <rect
          x="326"
          y="12"
          width="58"
          height="56"
          rx="14"
        />
      </g>

      {/* ================= D ================= */}

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

      {/* ================= FINAL E ================= */}

      <g stroke="#00C8FF" {...stroke}>
        <path d="M506 12H554" />
        <path d="M506 40H554" />
        <path d="M506 68H554" />
      </g>
    </svg>
  );
}

/* =========================================================
   NAVBAR
   ========================================================= */

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);

  const servicesTimer = useRef(null);
  const solutionsTimer = useRef(null);
  const companyTimer = useRef(null);

  const closeAll = () => {
    setIsServicesOpen(false);
    setIsSolutionsOpen(false);
    setIsCompanyOpen(false);
    setIsOpen(false);
  };

  const openOnly = (setter, timers) => {
    timers.forEach(([timer, stateSetter]) => {
      clearTimeout(timer.current);
      stateSetter(false);
    });

    setter(true);
  };

  const startClose = (timer, setter) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setter(false);
    }, 200);
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
  ];

  const solutionLinks = [
    {
      name: "Cloud Migration",
      path: "/solutions/cloud-migration",
      icon: CloudUpload,
      desc: "Move to the cloud with a structured approach.",
    },
    {
      name: "DevOps & Automation",
      path: "/solutions/devops-automation",
      icon: GitBranch,
      desc: "Automate delivery and infrastructure workflows.",
    },
    {
      name: "Managed Cloud",
      path: "/solutions/managed-cloud",
      icon: Settings,
      desc: "Monitoring, maintenance and optimization.",
    },
    {
      name: "Cloud Security",
      path: "/solutions/cloud-security",
      icon: Shield,
      desc: "Protect environments, applications and data.",
    },
    {
      name: "Kubernetes & Containers",
      path: "/solutions/kubernetes-containers",
      icon: Box,
      desc: "Scalable container platforms for modern apps.",
    },
    {
      name: "Data & Cloud Platforms",
      path: "/solutions/data-cloud-platform",
      icon: Database,
      desc: "Dependable platforms for data and analytics.",
    },
  ];

  const companyLinks = [
    {
      name: "About",
      path: "/about",
      icon: Info,
      desc: "Who we are and what drives us.",
    },
    {
      name: "Case Studies",
      path: "/case-studies",
      icon: BookOpen,
      desc: "Projects, approaches and outcomes.",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
      desc: "Start a conversation with our team.",
    },
  ];

  const dropdownWrap =
    "fixed left-0 right-0 top-20 w-screen";

  const dropdownInner =
    "w-full overflow-hidden border-b border-white/10 bg-black shadow-2xl backdrop-blur-xl";

  const linkItem =
    "group flex items-start gap-3 rounded-xl p-4 transition duration-200 hover:bg-white/[0.04]";

  const iconBox =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition duration-200 group-hover:border-cyan/40 group-hover:bg-cyan/10";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black">

      {/* =====================================================
          DESKTOP HEADER
      ===================================================== */}

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* BRAND */}

        <Link
          to="/"
          onClick={closeAll}
          className="flex items-center gap-3 shrink-0"
        >
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Fexkode"
              className="h-full w-full scale-[1.9] object-contain"
            />
          </div>

          <FexkodeWordmark className="h-7 w-auto sm:h-8" />
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="hidden items-center gap-6 lg:flex">

          {/* HOME */}

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              {item.name}
            </NavLink>
          ))}

          {/* =================================================
              SOLUTIONS
          ================================================= */}

          <div
            className="relative"
            onMouseEnter={() =>
              openOnly(setIsSolutionsOpen, [
                [servicesTimer, setIsServicesOpen],
                [companyTimer, setIsCompanyOpen],
              ])
            }
            onMouseLeave={() =>
              startClose(
                solutionsTimer,
                setIsSolutionsOpen
              )
            }
          >
            <Link
              to="/solutions"
              className="flex items-center gap-1 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Solutions

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  isSolutionsOpen ? "rotate-180" : ""
                }`}
              />
            </Link>

            {isSolutionsOpen && (
              <div
                className={dropdownWrap}
                onMouseEnter={() => {
                  clearTimeout(solutionsTimer.current);
                  setIsSolutionsOpen(true);
                }}
                onMouseLeave={() =>
                  startClose(
                    solutionsTimer,
                    setIsSolutionsOpen
                  )
                }
              >
                <div className={dropdownInner}>

                  <div className="mx-auto grid max-w-7xl grid-cols-[1fr_320px] px-5 lg:px-8">

                    <div className="py-5 pr-6">

                      <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Our Solutions
                      </p>

                      <div className="grid grid-cols-2 gap-1">

                        {solutionLinks.map((sol) => (
                          <Link
                            key={sol.path}
                            to={sol.path}
                            onClick={closeAll}
                            className={linkItem}
                          >
                            <div className={iconBox}>
                              <sol.icon
                                size={15}
                                className="text-slate-400 transition-colors group-hover:text-cyan"
                              />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-white">
                                {sol.name}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-slate-400">
                                {sol.desc}
                              </p>
                            </div>
                          </Link>
                        ))}

                      </div>
                    </div>

                    <Link
                      to="/solutions"
                      onClick={closeAll}
                      className="relative flex flex-col justify-end overflow-hidden bg-black p-6"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Layers
                          size={90}
                          className="text-cyan opacity-10"
                          strokeWidth={1}
                        />
                      </div>

                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,255,0.10),transparent_70%)]" />

                      <p className="relative text-[10px] font-bold uppercase leading-[1.6] tracking-[0.14em] text-white/80">
                        <span className="text-cyan">
                          Cloud
                        </span>{" "}
                        Solutions.
                        <br />
                        Built for every stage.
                      </p>
                    </Link>

                  </div>

                </div>
              </div>
            )}
          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div
            className="relative"
            onMouseEnter={() =>
              openOnly(setIsServicesOpen, [
                [solutionsTimer, setIsSolutionsOpen],
                [companyTimer, setIsCompanyOpen],
              ])
            }
            onMouseLeave={() =>
              startClose(
                servicesTimer,
                setIsServicesOpen
              )
            }
          >
            <button
              type="button"
              onClick={() =>
                setIsServicesOpen(!isServicesOpen)
              }
              className="flex items-center gap-1 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Services

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  isServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isServicesOpen && (
              <div
                className={dropdownWrap}
                onMouseEnter={() => {
                  clearTimeout(servicesTimer.current);
                  setIsServicesOpen(true);
                }}
                onMouseLeave={() =>
                  startClose(
                    servicesTimer,
                    setIsServicesOpen
                  )
                }
              >
                <div className={dropdownInner}>

                  <div className="mx-auto grid max-w-7xl grid-cols-[1fr_320px] px-5 lg:px-8">

                    <div className="py-5 pr-6">

                      <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Services
                      </p>

                      <Link
                        to="/cloud-services"
                        onClick={closeAll}
                        className={linkItem}
                      >
                        <div className={iconBox}>
                          <Cloud
                            size={15}
                            className="text-slate-400 group-hover:text-cyan"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            Cloud Services
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            AWS, Azure and Google Cloud engineering.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/industries"
                        onClick={closeAll}
                        className={linkItem}
                      >
                        <div className={iconBox}>
                          <Building2
                            size={15}
                            className="text-slate-400 group-hover:text-cyan"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            Industries
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            Solutions for modern businesses.
                          </p>
                        </div>
                      </Link>

                    </div>

                    <Link
                      to="/cloud-services"
                      onClick={closeAll}
                      className="relative flex flex-col justify-end overflow-hidden bg-black p-6"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Server
                          size={90}
                          className="text-cyan opacity-10"
                          strokeWidth={1}
                        />
                      </div>

                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,255,0.10),transparent_70%)]" />

                      <p className="relative text-[10px] font-bold uppercase leading-[1.6] tracking-[0.14em] text-white/80">
                        <span className="text-cyan">
                          Cloud
                        </span>{" "}
                        Infrastructure.
                        <br />
                        Built for what&apos;s next.
                      </p>
                    </Link>

                  </div>

                </div>
              </div>
            )}
          </div>

          {/* =================================================
              COMPANY
          ================================================= */}

          <div
            className="relative"
            onMouseEnter={() =>
              openOnly(setIsCompanyOpen, [
                [solutionsTimer, setIsSolutionsOpen],
                [servicesTimer, setIsServicesOpen],
              ])
            }
            onMouseLeave={() =>
              startClose(
                companyTimer,
                setIsCompanyOpen
              )
            }
          >
            <button
              type="button"
              onClick={() =>
                setIsCompanyOpen(!isCompanyOpen)
              }
              className="flex items-center gap-1 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              Company

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  isCompanyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCompanyOpen && (
              <div
                className={dropdownWrap}
                onMouseEnter={() => {
                  clearTimeout(companyTimer.current);
                  setIsCompanyOpen(true);
                }}
                onMouseLeave={() =>
                  startClose(
                    companyTimer,
                    setIsCompanyOpen
                  )
                }
              >
                <div className={dropdownInner}>

                  <div className="mx-auto grid max-w-7xl grid-cols-[1fr_320px] px-5 lg:px-8">

                    <div className="py-5 pr-6">

                      <p className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Company
                      </p>

                      {companyLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeAll}
                          className={linkItem}
                        >
                          <div className={iconBox}>
                            <item.icon
                              size={15}
                              className="text-slate-400 group-hover:text-cyan"
                            />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-white">
                              {item.name}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      ))}

                    </div>

                    <Link
                      to="/about"
                      onClick={closeAll}
                      className="relative flex flex-col justify-end overflow-hidden bg-black p-6"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building2
                          size={90}
                          className="text-cyan opacity-10"
                          strokeWidth={1}
                        />
                      </div>

                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,255,0.10),transparent_70%)]" />

                      <p className="relative text-[10px] font-bold uppercase leading-[1.6] tracking-[0.14em] text-white/80">
                        <span className="text-cyan">
                          Fexkode.
                        </span>{" "}
                        Built on
                        <br />
                        trust and expertise.
                      </p>
                    </Link>

                  </div>

                </div>
              </div>
            )}
          </div>

          {/* CONTACT */}

          <Link
            to="/contact"
            onClick={closeAll}
            className="group flex items-center gap-2 rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-electric/90"
          >
            Contact

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </nav>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-slate-200 transition hover:border-cyan/40 hover:text-white lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {isOpen && (
        <div className="border-t border-white/10 bg-black lg:hidden">

          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-5">

            {/* HOME */}

            <NavLink
              to="/"
              onClick={closeAll}
              className="border-b border-white/10 py-4 text-sm font-medium text-slate-300 hover:text-white"
            >
              Home
            </NavLink>

            {/* SOLUTIONS */}

            <div className="border-b border-white/10">

              <div className="flex items-center justify-between py-4">

                <Link
                  to="/solutions"
                  onClick={closeAll}
                  className="text-sm font-medium text-slate-300 hover:text-white"
                >
                  Solutions
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setIsSolutionsOpen(!isSolutionsOpen)
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-slate-400"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      isSolutionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

              </div>

              {isSolutionsOpen && (
                <div className="pb-4 pl-2">

                  {solutionLinks.map((sol) => (
                    <Link
                      key={sol.path}
                      to={sol.path}
                      onClick={closeAll}
                      className="flex items-center gap-3 py-2.5 text-sm text-slate-400 hover:text-white"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                        <sol.icon
                          size={13}
                          className="text-cyan"
                        />
                      </div>

                      {sol.name}
                    </Link>
                  ))}

                </div>
              )}

            </div>

            {/* SERVICES */}

            <div className="border-b border-white/10">

              <button
                type="button"
                onClick={() =>
                  setIsServicesOpen(!isServicesOpen)
                }
                className="flex w-full items-center justify-between py-4 text-sm font-medium text-slate-300"
              >
                Services

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isServicesOpen && (
                <div className="pb-4 pl-2">

                  <Link
                    to="/cloud-services"
                    onClick={closeAll}
                    className="flex items-center gap-3 py-2.5 text-sm text-slate-400 hover:text-white"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <Cloud
                        size={13}
                        className="text-cyan"
                      />
                    </div>

                    Cloud Services
                  </Link>

                  <Link
                    to="/industries"
                    onClick={closeAll}
                    className="flex items-center gap-3 py-2.5 text-sm text-slate-400 hover:text-white"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                      <Building2
                        size={13}
                        className="text-cyan"
                      />
                    </div>

                    Industries
                  </Link>

                </div>
              )}

            </div>

            {/* COMPANY */}

            <div className="border-b border-white/10">

              <button
                type="button"
                onClick={() =>
                  setIsCompanyOpen(!isCompanyOpen)
                }
                className="flex w-full items-center justify-between py-4 text-sm font-medium text-slate-300"
              >
                Company

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    isCompanyOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCompanyOpen && (
                <div className="pb-4 pl-2">

                  {companyLinks.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeAll}
                      className="flex items-center gap-3 py-2.5 text-sm text-slate-400 hover:text-white"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                        <item.icon
                          size={13}
                          className="text-cyan"
                        />
                      </div>

                      {item.name}
                    </Link>
                  ))}

                </div>
              )}

            </div>

            {/* CONTACT */}

            <Link
              to="/contact"
              onClick={closeAll}
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-electric px-5 py-3 text-sm font-semibold text-white"
            >
              Contact
              <ArrowRight size={16} />
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
}

export default Navbar;