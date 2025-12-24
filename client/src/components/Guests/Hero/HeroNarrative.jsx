import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import card1 from "../../../assets/card/image-part-001.png";
import card2 from "../../../assets/card/image-part-002.png";
import card3 from "../../../assets/card/image-part-003.png";

const HeroNarrative = ({ titleRef }) => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);

  const tlRef = useRef(null);
  const isStacked = useRef(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    // Initial state
    gsap.set(leftRef.current, { rotate: -15, x: 0, zIndex: 10 });
    gsap.set(rightRef.current, { rotate: 15, x: 0, zIndex: 10 });
    gsap.set(centerRef.current, { zIndex: 20 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.75, ease: "power3.inOut" },
      onStart: () => {
        isAnimating.current = true;
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        isAnimating.current = false;
        isStacked.current = true;
        document.body.style.overflow = "";
      },
      onReverseComplete: () => {
        isAnimating.current = false;
        isStacked.current = false;
        document.body.style.overflow = "";
      },
    });

    // STACK
    tl.to(
      leftRef.current,
      {
        x: 140,
        rotate: 0,
        scale: 0.95,
      },
      0
    );

    tl.to(
      rightRef.current,
      {
        x: -140,
        rotate: 0,
        scale: 0.95,
      },
      0
    );

    tlRef.current = tl;

    const onWheel = (e) => {
      if (isAnimating.current) return;

      // Scroll DOWN → stack
      if (e.deltaY > 0 && !isStacked.current) {
        e.preventDefault();
        tl.play();
      }

      // Scroll UP → unstack
      if (e.deltaY < 0 && isStacked.current) {
        e.preventDefault();
        tl.reverse();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="space-y-6 border mt-20">
      <style>
        {`
        .jp-title {
          position: absolute;
          top: 100%;
          left: 16rem;
          transform: translateY(-0.95em);
          font-family: 'Noto Serif JP','Cormorant Garamond',serif;
          font-weight: 900;
          font-size: clamp(1.4rem, 2vw, 1.8rem);
          letter-spacing: 0.32em;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,1),
            rgba(255,255,255,0.6)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-stroke: 0.6px rgba(255,255,255,0.25);
          opacity: 0.95;
          white-space: nowrap;
          pointer-events: none;
        }
        `}
      </style>

      <div className="relative inline-block border">
        <h1
          ref={titleRef}
          className="relative pb-6 text-6xl md:text-7xl lg:text-8xl leading-[1.05] bg-clip-text text-transparent"
          style={{
            fontFamily: "'Allura','Pacifico',cursive",
            fontWeight: 600,
            letterSpacing: "-0.015em",
            WebkitTextStroke: "0.6px rgba(255,255,255,0.12)",
          }}
        >
          WhisperTails
        </h1>
        <span className="jp-title">ウィスパーテイル</span>
      </div>

      <div className="relative mt-5 h-[460px] border">
        <img
          ref={leftRef}
          src={card1}
          className="absolute top-16 left-[20px] w-[260px] rounded-2xl shadow-2xl"
          draggable={false}
        />

        <img
          ref={rightRef}
          src={card2}
          className="absolute top-16 right-[20px] w-[260px] rounded-2xl shadow-2xl"
          draggable={false}
        />

        <img
          ref={centerRef}
          src={card3}
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[260px] rounded-2xl shadow-2xl"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default HeroNarrative;
