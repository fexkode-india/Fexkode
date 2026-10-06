import { Cloud, Layers, Zap, Database, Cpu } from 'lucide-react';

const InfrastructureStack = () => {
  const layers = [
    { name: 'Cloud', icon: Cloud, delay: '0s' },
    { name: 'Application Layer', icon: Layers, delay: '0.12s' },
    { name: 'Services', icon: Zap, delay: '0.24s' },
    { name: 'Infrastructure', icon: Cpu, delay: '0.36s' },
    { name: 'Data', icon: Database, delay: '0.48s' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[420px]">

      <style>{`
        @keyframes riseIn {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulseNode {
          0%, 100% {
            box-shadow:
              0 0 0 rgba(34, 211, 238, 0),
              0 0 0 rgba(59, 130, 246, 0);

            border-color: rgba(103, 232, 249, 0.45);
          }

          50% {
            box-shadow:
              0 0 20px rgba(34, 211, 238, 0.18),
              0 0 28px rgba(59, 130, 246, 0.1);

            border-color: rgba(103, 232, 249, 0.9);
          }
        }

        @keyframes glowText {
          0%, 100% {
            color: rgba(255, 255, 255, 0.9);
            text-shadow: none;
          }

          50% {
            color: rgba(103, 232, 249, 0.98);
            text-shadow: 0 0 18px rgba(34, 211, 238, 0.35);
          }
        }

        @keyframes flowLine {
          0% {
            opacity: 0.25;
            box-shadow: 0 0 0 rgba(34, 211, 238, 0);
          }

          50% {
            opacity: 1;
            box-shadow: 0 0 16px rgba(34, 211, 238, 0.55);
          }

          100% {
            opacity: 0.25;
            box-shadow: 0 0 0 rgba(34, 211, 238, 0);
          }
        }

        .infrastructure-layer {
          animation: riseIn 0.7s ease-out forwards;
          opacity: 0;
        }

        .layer-node {
          animation: pulseNode 4s ease-in-out infinite;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease,
            background 0.35s ease;
        }

        .infrastructure-layer:hover .layer-node {
          transform: translateY(-3px) scale(1.06);

          box-shadow:
            0 0 22px rgba(34, 211, 238, 0.28),
            0 12px 28px rgba(59, 130, 246, 0.18);

          border-color: rgba(103, 232, 249, 1);

          background:
            linear-gradient(
              135deg,
              rgba(34, 211, 238, 0.22),
              rgba(59, 130, 246, 0.14)
            );
        }

        .layer-text {
          animation: glowText 5s ease-in-out infinite;

          transition:
            transform 0.35s ease,
            color 0.35s ease,
            text-shadow 0.35s ease;
        }

        .infrastructure-layer:hover .layer-text {
          transform: translateX(3px);
          color: #7dd3fc;

          text-shadow:
            0 0 18px rgba(34, 211, 238, 0.5);
        }

        .connector-line {
          width: 2px;
          height: 34px;

          background:
            linear-gradient(
              180deg,
              rgba(34, 211, 238, 0.12),
              rgba(103, 232, 249, 0.96),
              rgba(59, 130, 246, 0.2),
              rgba(34, 211, 238, 0.12)
            );

          animation: flowLine 1.6s ease-in-out infinite;

          border-radius: 999px;

          box-shadow:
            0 0 12px rgba(34, 211, 238, 0.3);
        }

        .connector-line::before,
        .connector-line::after {
          content: "";

          position: absolute;
          left: 50%;

          width: 6px;
          height: 6px;

          transform: translateX(-50%);

          border-radius: 999px;

          background: rgba(103, 232, 249, 0.6);

          box-shadow:
            0 0 8px rgba(34, 211, 238, 0.2);
        }

        .connector-line::before {
          top: -1px;
        }

        .connector-line::after {
          bottom: -1px;
        }
      `}</style>


      {/* Outer container - NO OUTLINE */}

      <div className="relative overflow-hidden">

        {/* Inner container - NO OUTLINE */}

        <div className="absolute inset-5">

          {/* Oval/capsule container - NO OUTLINE */}

          <div className="absolute inset-x-10 top-1/2 h-40 -translate-y-1/2">

          </div>

        </div>


        {/* Infrastructure layers */}

        <div className="relative z-10 flex flex-col items-center gap-2">

          {layers.map((layer, index) => {

            const LayerIcon = layer.icon;

            return (

              <div
                key={layer.name}
                className="relative w-full"
              >

                <div
                  className="infrastructure-layer flex items-start justify-center gap-4"
                  style={{
                    animationDelay: layer.delay
                  }}
                >

                  {/* Icon + connector */}

                  <div className="relative flex w-12 flex-col items-center">

                    <div className="layer-node relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/40 bg-gradient-to-br from-cyan/15 to-blue/10 text-cyan shadow-[0_0_16px_rgba(34,211,238,0.15)]">

                      <LayerIcon
                        size={22}
                        strokeWidth={1.8}
                      />

                    </div>


                    {index < layers.length - 1 && (

                      <div className="connector-line relative mt-2" />

                    )}

                  </div>


                  {/* Layer name */}

                  <div className="layer-text flex min-h-[48px] items-center text-left">

                    <span className="text-sm font-semibold tracking-[0.02em] text-white">

                      {layer.name}

                    </span>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default InfrastructureStack;