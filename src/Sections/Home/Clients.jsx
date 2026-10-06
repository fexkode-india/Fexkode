import React from "react";

// ─── Inline High-Clarity Vector Logos ──────────────────────────────────────────

const TechCorpIcon = () => (
  <svg viewBox="0 0 100 100" className="client-logo-image" fill="none">
    <g transform="rotate(-15 50 50)">
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="5"
          x2="50"
          y2="18"
          stroke="#EF4444"
          strokeWidth="3.5"
          strokeLinecap="round"
          transform={`rotate(${i * (360 / 28)} 50 50)`}
        />
      ))}

      <circle cx="50" cy="50" r="26" fill="#1D4ED8" />

      <polygon
        points="50,32 53,42 63,42 55,48 58,58 50,52 42,58 45,48 37,42 47,42"
        fill="#FFFFFF"
      />

      <polygon
        points="63,48 65,55 72,55 66,59 68,66 63,62 57,66 59,59 54,55 61,55"
        fill="#FFFFFF"
        transform="scale(0.7) translate(28, 12)"
      />

      <polygon
        points="37,58 39,65 46,65 40,69 42,76 37,72 31,76 33,69 28,65 35,65"
        fill="#FFFFFF"
        transform="scale(0.7) translate(10, 22)"
      />
    </g>
  </svg>
);

const FinanceHubIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <path d="M8 8h10v12H8z" fill="#EC4899" />
    <path d="M8 22h10v10H8z" fill="#DB2777" />
    <path d="M18 15h10v11H18z" fill="#F472B6" />
    <path
      d="M18 6l12 6v17l-12 5V6z"
      fill="#BE185D"
      opacity="0.65"
    />
  </svg>
);

const MediScaleIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <circle
      cx="20"
      cy="20"
      r="17"
      fill="#EFF6FF"
      stroke="#3B82F6"
      strokeWidth="2.5"
    />

    <text
      x="20"
      y="27"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
      fontSize="20"
      fontWeight="800"
      fill="#2563EB"
    >
      M<tspan fill="#0EA5E9">S</tspan>
    </text>
  </svg>
);

const ShopFastIcon = () => (
  <svg
    viewBox="0 0 64 64"
    className="client-logo-image"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="shopfast-glow"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.95" />
      </linearGradient>
    </defs>

    <circle cx="32" cy="32" r="28" fill="url(#shopfast-glow)" />

    <path
      d="M 52 35 C 50 45 42 53 31 53 C 20 53 11 44 11 33 C 11 25 15 18 22 14 C 18 19 16 25 16 32 C 16 41 23 48 32 48 C 38 48 43 45 46 41 C 42 41 38 39 36 36 C 33 39 28 42 24 39 C 27 34 31 29 34 26 C 36 29 38 33 42 34 C 44 32 47 31 50 31 C 51 32 52 33 52 35 Z"
      fill="#FFFFFF"
    />

    <g transform="translate(1, -1)">
      <path
        d="M 28 31 C 25 24 23 20 18 18 C 19 26 23 33 29 37 Z"
        fill="#7C3AED"
      />

      <path
        d="M 40 43 C 42 38 46 35 51 34 C 49 40 45 46 39 49 Z"
        fill="#7C3AED"
      />

      <path
        d="M 29 36 L 27 41 C 30 42 34 42 36 40 L 34 35 Z"
        fill="#6D28D9"
      />

      <path
        d="M 46 11 C 41 12 32 17 28 24 C 26 27 27 31 29 34 L 38 43 C 41 45 45 45 48 43 C 55 38 60 30 61 25 C 62 18 56 12 46 11 Z"
        fill="#7C3AED"
      />

      <circle cx="46.5" cy="22.5" r="4.2" fill="#FFFFFF" />
    </g>
  </svg>
);

const BuildCoIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <path
      d="M15 8l8-4v27l-8 4.5V8z"
      stroke="#0F172A"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    <path
      d="M23 23l8 3.5v6.5l-8 2.5V23z"
      stroke="#0F172A"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />

    <line
      x1="17.5"
      y1="14"
      x2="17.5"
      y2="30"
      stroke="#0F172A"
      strokeWidth="1.6"
    />

    <line
      x1="20"
      y1="13"
      x2="20"
      y2="31"
      stroke="#0F172A"
      strokeWidth="1.6"
    />

    <line
      x1="26.5"
      y1="28"
      x2="26.5"
      y2="34"
      stroke="#0F172A"
      strokeWidth="1.6"
    />
  </svg>
);

const DataVaultIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <path
      d="M13 17V12.5a7 7 0 1 1 14 0V17"
      stroke="#F59E0B"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    <rect
      x="8.5"
      y="17"
      width="23"
      height="18"
      rx="4.5"
      fill="#F59E0B"
    />

    <path
      d="M12.5 35l7.5-13.5 7.5 13.5h-15z"
      fill="#0F172A"
    />

    <path
      d="M17.5 35l2.5-5.5 2.5 5.5h-5z"
      fill="#F59E0B"
    />
  </svg>
);

const CloudBaseIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <rect
      x="5"
      y="13"
      width="16"
      height="16"
      rx="5"
      fill="#3B82F6"
      fillOpacity="0.45"
    />

    <rect
      x="15"
      y="7"
      width="18"
      height="18"
      rx="6"
      fill="#6366F1"
      fillOpacity="0.45"
    />

    <rect
      x="10"
      y="17"
      width="17"
      height="17"
      rx="6"
      fill="#38BDF8"
      fillOpacity="0.9"
    />

    <rect
      x="20"
      y="15"
      width="15"
      height="15"
      rx="5"
      fill="#2563EB"
    />
  </svg>
);

const LogiPathIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <path
      d="M4 15h11M6 19h10M4 23h11"
      stroke="#0284C7"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    <path d="M15 12h12v15H15z" fill="#0284C7" />

    <path
      d="M27 17h6l3.5 4.5v5.5H27V17z"
      fill="#0284C7"
    />

    <circle
      cx="19"
      cy="28.5"
      r="3"
      fill="#FFFFFF"
      stroke="#0284C7"
      strokeWidth="2"
    />

    <circle
      cx="31"
      cy="28.5"
      r="3"
      fill="#FFFFFF"
      stroke="#0284C7"
      strokeWidth="2"
    />
  </svg>
);

const GrowthIOIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <circle
      cx="20"
      cy="20"
      r="16"
      fill="#10B981"
      fillOpacity="0.15"
    />

    <path
      d="M10 26l7-7 5 5 8-10"
      stroke="#059669"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M24 14h6v6"
      stroke="#059669"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NexScaleIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <rect
      x="18"
      y="6"
      width="4"
      height="5"
      rx="2"
      fill="#10B981"
    />

    <rect
      x="9.5"
      y="11"
      width="21"
      height="20"
      rx="6"
      stroke="#10B981"
      strokeWidth="2.8"
      fill="none"
    />

    <circle cx="7" cy="21" r="2" fill="#10B981" />
    <circle cx="33" cy="21" r="2" fill="#10B981" />

    <rect
      x="14.5"
      y="17.5"
      width="3.5"
      height="6.5"
      rx="1.5"
      fill="#10B981"
    />

    <rect
      x="22"
      y="17.5"
      width="3.5"
      height="6.5"
      rx="1.5"
      fill="#10B981"
    />
  </svg>
);

const PeakOpsIcon = () => (
  <svg viewBox="0 0 40 40" className="client-logo-image" fill="none">
    <path
      d="M13 10a12 12 0 1 0 14 0"
      stroke="#0284C7"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <path
      d="M22 6a12 12 0 0 1 6 12"
      stroke="#10B981"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <path
      d="M17 19l4.5 4.5L29 13"
      stroke="#0284C7"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Official company websites ────────────────────────────────────────────────

const clients = [
  {
    name: "TechCorp",
    logo: "https://www.techcorp.com/favicon.ico",
    logoComponent: TechCorpIcon,
  },
  {
    name: "FinanceHub",
    logo: "https://www.financehub.org.in/favicon.ico",
    logoComponent: FinanceHubIcon,
  },
  {
    name: "MediScale",
    logo: "https://www.mediscale.se/favicon.ico",
    logoComponent: MediScaleIcon,
  },
  {
    name: "ShopFast",
    logo: "https://shopfast.com/favicon.ico",
    logoComponent: ShopFastIcon,
  },
  {
    name: "DataVault",
    logo: "https://dvlt.ai/favicon.ico",
    logoComponent: DataVaultIcon,
  },
  {
    name: "CloudBase",
    logo: "https://cloudbase.it/favicon.ico",
    logoComponent: CloudBaseIcon,
  },
  {
    name: "LogiPath",
    logo: "https://logipathexpress.com/favicon.ico",
    logoComponent: LogiPathIcon,
  },
  {
    name: "GrowthIO",
    logo: "https://growthio.store/favicon.ico",
    logoComponent: GrowthIOIcon,
  },
  {
    name: "NexScale",
    logo: "https://nexscale.tech/favicon.ico",
    logoComponent: NexScaleIcon,
  },
  {
    name: "PeakOps",
    logo: "https://peakops.net/favicon.ico",
    logoComponent: PeakOpsIcon,
  },
];

// ─── Company logo ─────────────────────────────────────────────────────────────

function CompanyLogo({ client }) {
  const LogoComp = client.logoComponent;

  return (
    <div className="trusted-logo">
      {LogoComp ? (
        <LogoComp />
      ) : (
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          className="trusted-logo-image"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}

      <span className="trusted-logo-name">
        {client.name}
      </span>
    </div>
  );
}

// ─── Trusted Partners ──────────────────────────────────────────────────────────

function Clients() {
  return (
    <section
      className="trusted-section"
      aria-label="Trusted Partners"
    >
      <style>{`
        .trusted-section {
          background: #000;
          padding: 72px 0;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .trusted-heading {
          text-align: center;
          margin-bottom: 46px;
        }

        .trusted-eyebrow {
          margin: 0;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #22d3ee;
        }

        .trusted-track-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;

          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 9%,
            black 91%,
            transparent 100%
          );

          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 9%,
            black 91%,
            transparent 100%
          );
        }

        .trusted-track {
          display: flex;
          width: max-content;
          animation: trusted-marquee 32s linear infinite;
          will-change: transform;
        }

        .trusted-group {
          display: flex;
          align-items: center;
          gap: 90px;
          padding-right: 90px;
        }

        .trusted-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-shrink: 0;
          min-width: 150px;
          opacity: 0.55;
          filter: grayscale(1);
        }

        .trusted-logo-image,
        .trusted-logo .client-logo-image {
          width: 42px;
          height: 42px;
          object-fit: contain;
          display: block;
        }

        .trusted-logo-name {
          color: #d1d5db;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
        }

        @keyframes trusted-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .trusted-section {
            padding: 56px 0;
          }

          .trusted-group {
            gap: 55px;
            padding-right: 55px;
          }

          .trusted-logo {
            min-width: 130px;
          }

          .trusted-logo-name {
            font-size: 16px;
          }

          .trusted-track {
            animation-duration: 25s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trusted-track {
            animation: none;
          }
        }
      `}</style>

      <div className="trusted-heading">
        <p className="trusted-eyebrow">
          Trusted by leading enterprises across the world
        </p>
      </div>

      <div className="trusted-track-wrapper">
        <div className="trusted-track">

          {/* First set */}
          <div className="trusted-group">
            {clients.map((client, index) => (
              <CompanyLogo
                key={`first-${client.name}-${index}`}
                client={client}
              />
            ))}
          </div>

          {/* Duplicate set for seamless infinite scrolling */}
          <div
            className="trusted-group"
            aria-hidden="true"
          >
            {clients.map((client, index) => (
              <CompanyLogo
                key={`second-${client.name}-${index}`}
                client={client}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Clients;