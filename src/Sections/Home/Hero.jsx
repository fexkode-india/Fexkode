
import { useEffect, useRef } from "react";
import InfrastructureStack from "./InfrastructureStack";
import ScrollReveal from "../../components/ScrollReveal";

function TopographicBackground() {
  const canvasRef = useRef(null);

  const mouseRef = useRef({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });

    if (!ctx) return;

    let animationFrame = null;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let isVisible = true;

    const mouse = mouseRef.current;

    /*
     * ---------------------------------------------------------
     * CONFIGURATION
     * ---------------------------------------------------------
     *
     * These values intentionally reduce canvas workload while
     * preserving the same overall topographic appearance.
     */

    const SURFACE_1_LINES = 60;
    const SURFACE_2_LINES = 45;
    const SURFACE_3_LINES = 40;

    const SURFACE_STEP = 11;
    const RIDGE_STEP = 9;

    /*
     * Limit device pixel ratio.
     *
     * High-DPI displays can make canvas rendering extremely
     * expensive. A maximum of 1.5 keeps the visual quality
     * sharp while reducing GPU/CPU workload.
     */
    const MAX_DPR = 1.5;

    /*
     * ---------------------------------------------------------
     * RESIZE
     * ---------------------------------------------------------
     */

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /*
     * ---------------------------------------------------------
     * SURFACE CALCULATION
     * ---------------------------------------------------------
     */

    const getSurfaceY = (x, line, time, surface) => {
      const normalizedX = x / width;

      let y;

      if (surface === 0) {
        /*
         * Main large folded surface.
         */

        const centerWave = Math.sin(
          normalizedX * 5.0 +
            time * 0.00018 +
            line * 0.010
        );

        const secondWave = Math.sin(
          normalizedX * 11.0 -
            time * 0.00012 +
            line * 0.018
        );

        const fold = Math.sin(
          normalizedX * 2.2 -
            time * 0.00008
        );

        y =
          height * 0.28 +
          line * 3.2 +
          centerWave * 95 +
          secondWave * 24 +
          fold * 70;
      } else if (surface === 1) {
        /*
         * Upper-right folded surface.
         */

        const wave = Math.sin(
          normalizedX * 4.2 -
            time * 0.00016 +
            line * 0.011
        );

        const fold = Math.sin(
          normalizedX * 8.0 +
            time * 0.00011 +
            line * 0.021
        );

        y =
          height * 0.05 +
          line * 2.9 +
          wave * 115 +
          fold * 28;
      } else {
        /*
         * Lower flowing surface.
         */

        const wave = Math.sin(
          normalizedX * 3.6 +
            time * 0.00013 +
            line * 0.014
        );

        const fold = Math.sin(
          normalizedX * 9.5 -
            time * 0.00010 +
            line * 0.019
        );

        y =
          height * 0.68 +
          line * 3.0 +
          wave * 105 +
          fold * 22;
      }

      /*
       * -------------------------------------------------------
       * MOUSE DEFORMATION
       * -------------------------------------------------------
       */

      const mouseX = mouse.x * width;
      const mouseY = mouse.y * height;

      const distanceX = x - mouseX;
      const distanceY = y - mouseY;

      const distance = Math.sqrt(
        distanceX * distanceX +
          distanceY * distanceY
      );

      const radius = 180;

      const influence = Math.max(
        0,
        1 - distance / radius
      );

      const smoothInfluence =
        influence * influence;

      y +=
        (mouseY - y) *
        smoothInfluence *
        0.35;

      return y;
    };

    /*
     * ---------------------------------------------------------
     * DRAW SURFACE
     * ---------------------------------------------------------
     */

    const drawSurface = (
      time,
      surface,
      lineCount
    ) => {
      const startX = -80;
      const endX = width + 80;

      for (
        let line = 0;
        line < lineCount;
        line++
      ) {
        ctx.beginPath();

        let firstPoint = true;

        for (
          let x = startX;
          x <= endX;
          x += SURFACE_STEP
        ) {
          const y = getSurfaceY(
            x,
            line,
            time,
            surface
          );

          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        /*
         * Fine blue contour lines.
         */

        const alpha =
          0.10 +
          (line % 7) * 0.018;

        ctx.strokeStyle =
          `rgba(19, 126, 153, ${alpha})`;

        ctx.lineWidth = 0.65;

        ctx.stroke();
      }
    };

    /*
     * ---------------------------------------------------------
     * DRAW RIDGE
     * ---------------------------------------------------------
     */

    const drawRidge = (
      time,
      surface,
      offset,
      intensity
    ) => {
      ctx.beginPath();

      const startX = -80;
      const endX = width + 80;

      let firstPoint = true;

      for (
        let x = startX;
        x <= endX;
        x += RIDGE_STEP
      ) {
        let y = getSurfaceY(
          x,
          offset,
          time,
          surface
        );

        const nx = x / width;

        const fold = Math.exp(
          -Math.pow(
            (nx - 0.52) / 0.20,
            2
          )
        );

        y +=
          Math.sin(
            nx * 7 -
              time * 0.00013
          ) *
          fold *
          18;

        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }

      /*
       * Cyan edge.
       */

      const gradient =
        ctx.createLinearGradient(
          0,
          0,
          width,
          height
        );

      gradient.addColorStop(
        0,
        `rgba(15, 117, 145, ${
          intensity * 0.20
        })`
      );

      gradient.addColorStop(
        0.35,
        `rgba(0, 221, 244, ${intensity})`
      );

      gradient.addColorStop(
        0.55,
        `rgba(0, 151, 177, ${
          intensity * 0.55
        })`
      );

      gradient.addColorStop(
        1,
        `rgba(12, 94, 119, ${
          intensity * 0.18
        })`
      );

      ctx.strokeStyle = gradient;

      ctx.lineWidth = 1.05;

      /*
       * Reduced shadow blur.
       *
       * This is considerably cheaper than the previous
       * shadowBlur: 9 while still producing a subtle glow.
       */

      ctx.shadowColor =
        `rgba(0, 214, 238, ${
          intensity * 0.4
        })`;

      ctx.shadowBlur = 4;

      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    /*
     * ---------------------------------------------------------
     * MAIN DRAW LOOP
     * ---------------------------------------------------------
     */

    const draw = (time) => {
      /*
       * Don't render when the Hero isn't visible.
       */

      if (!isVisible) {
        animationFrame =
          requestAnimationFrame(draw);

        return;
      }

      /*
       * Background.
       */

      ctx.fillStyle = "#000000";

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
       * Smooth mouse movement.
       */

      mouse.x +=
        (mouse.targetX - mouse.x) *
        0.035;

      mouse.y +=
        (mouse.targetY - mouse.y) *
        0.035;

      /*
       * Reduced-density contour surfaces.
       */

      drawSurface(
        time,
        0,
        SURFACE_1_LINES
      );

      drawSurface(
        time,
        1,
        SURFACE_2_LINES
      );

      drawSurface(
        time,
        2,
        SURFACE_3_LINES
      );

      /*
       * Bright folded edges.
       */

      drawRidge(
        time,
        0,
        25,
        0.72
      );

      drawRidge(
        time,
        0,
        52,
        0.38
      );

      drawRidge(
        time,
        1,
        20,
        0.45
      );

      drawRidge(
        time,
        2,
        28,
        0.34
      );

      animationFrame =
        requestAnimationFrame(draw);
    };

    /*
     * ---------------------------------------------------------
     * MOUSE
     * ---------------------------------------------------------
     */

    const handleMouseMove = (event) => {
      const rect =
        canvas.getBoundingClientRect();

      mouse.targetX =
        (event.clientX - rect.left) /
        rect.width;

      mouse.targetY =
        (event.clientY - rect.top) /
        rect.height;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0.5;
      mouse.targetY = 0.5;
    };

    /*
     * ---------------------------------------------------------
     * VISIBILITY
     * ---------------------------------------------------------
     */

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        {
          threshold: 0,
        }
      );

    observer.observe(canvas);

    /*
     * ---------------------------------------------------------
     * INITIALIZE
     * ---------------------------------------------------------
     */

    resize();

    window.addEventListener(
      "resize",
      resize,
      { passive: true }
    );

    canvas.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    canvas.addEventListener(
      "mouseleave",
      handleMouseLeave,
      { passive: true }
    );

    animationFrame =
      requestAnimationFrame(draw);

    /*
     * ---------------------------------------------------------
     * CLEANUP
     * ---------------------------------------------------------
     */

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      observer.disconnect();

      window.removeEventListener(
        "resize",
        resize
      );

      canvas.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      canvas.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-topographic-canvas"
      aria-hidden="true"
    />
  );
}

function Hero() {
  return (
    <section className="hero-section relative overflow-hidden border-b border-white/5">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <TopographicBackground />

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-20 sm:px-8 lg:px-10 lg:py-24">

        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT */}

          <div className="max-w-2xl">

            <ScrollReveal>
              <h2 className="flex items-center gap-3 text-2xl font-semibold uppercase tracking-[0.22em] text-cyan sm:text-3xl">
                <span className="h-px w-9 bg-cyan" />
                Cloud Infrastructure
              </h2>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Cloud
                <br />
                Infrastructure
                <br />
                <span className="text-slate-400">
                  for What's Next.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-200">
              <h3 className="mt-7 max-w-xl text-sm font-normal leading-7 text-slate-400 sm:text-base">
                Fexkode helps growing businesses modernize, secure, and scale their cloud
                infrastructure — so technology drives growth instead of slowing it down.
              </h3>
            </ScrollReveal>

            <ScrollReveal className="delay-300">
              <div className="mt-9 flex flex-wrap gap-4">

                <a
                  href="/contact"
                  className="rounded-full bg-electric px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-electric/90 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:scale-95"
                >
                  Talk to an Expert
                </a>

                <a
                  href="/solutions"
                  className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan/40 hover:bg-white/5 hover:-translate-y-1 active:scale-95"
                >
                  Explore Solutions
                </a>

              </div>
            </ScrollReveal>

          </div>

          {/* RIGHT */}

          <div className="relative flex min-h-[480px] items-center justify-center lg:min-h-[560px]">

            <div className="w-full">
              <InfrastructureStack />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
