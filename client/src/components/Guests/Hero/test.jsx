<div className="space-y-10">
      <h1
        ref={titleRef}
        className="
          relative
          pb-6
          text-6xl md:text-7xl lg:text-8xl
          leading-[1.05]
          bg-clip-text text-transparent
          drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]
        "
        style={{
          fontFamily: "'Allura','Pacifico',cursive",
          fontWeight: 600,
          letterSpacing: "-0.015em",
          WebkitTextStroke: "0.6px rgba(255,255,255,0.12)",
          textShadow: "0 10px 28px rgba(0,0,0,0.35)",
        }}
      >
        WhisperTails
      </h1>

      <div
        className="pl-2 text-sm tracking-[0.35em] text-white/50"
        style={{
          fontFamily: "'Noto Serif JP','Cormorant Garamond',serif",
          fontWeight: 300,
        }}
      >
        ウィスパ テイル
      </div>



----------------------------------------------------------------------------

  const sectionRef = useRef(null);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);

  const tlRef = useRef(null);

  const isInView = useRef(false);
  const isAnimating = useRef(false);
  const isComplete = useRef(false);

  const targetProgress = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
      },
      { threshold: 0.6 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.set(leftRef.current, { rotate: -15, x: 0, y: 0, zIndex: 10 });
    gsap.set(rightRef.current, { rotate: 15, x: 0, y: 0, zIndex: 10 });
    gsap.set(centerRef.current, { x: 0, y: 0, zIndex: 20 });

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        isAnimating.current = true;
        document.body.style.overflow = "hidden";
      },
      onComplete: () => {
        isAnimating.current = false;
        isComplete.current = true;
        document.body.style.overflow = "";
      },
      onReverseComplete: () => {
        isAnimating.current = false;
        isComplete.current = false;
        document.body.style.overflow = "";
      },
    });

    tl.to(
      leftRef.current,
      {
        x: 140,
        rotate: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power3.out",
      },
      0
    );

    tl.to(
      rightRef.current,
      {
        x: -140,
        rotate: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power3.out",
      },
      0
    );

    tl.to([leftRef.current, rightRef.current, centerRef.current], {
      y: 30,
      duration: 0.35,
      ease: "power2.out",
    });

    tl.to([leftRef.current, rightRef.current, centerRef.current], {
      x: "+=670",
      duration: 2,
      ease: "power2.out",
    });

    tl.to([leftRef.current, rightRef.current, centerRef.current], {
      y: "+=380",
      duration: 2,
      ease: "power2.out",
    });

    tlRef.current = tl;

    const driveTimeline = (direction) => {
      const tl = tlRef.current;
      if (!tl) return;

      targetProgress.current = gsap.utils.clamp(
        0,
        1,
        targetProgress.current + (direction === "down" ? 0.08 : -0.08)
      );

      gsap.to(tl, {
        progress: targetProgress.current,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const onWheel = (e) => {
      if (!isInView.current) return;

      const progress = targetProgress.current;

      if (progress > 0 && progress < 1) {
        e.preventDefault();
      }

      if (e.deltaY > 0) {
        driveTimeline("down");
      } else if (e.deltaY < 0) {
        driveTimeline("up");
      }
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!isInView.current) return;

      const delta = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(delta) < 20) return;

      const progress = targetProgress.current;

      if (progress > 0 && progress < 1) {
        e.preventDefault();
      }

      if (delta > 0) {
        driveTimeline("down");
      } else {
        driveTimeline("up");
      }

      touchStartY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);


  return (
      <div ref={sectionRef} className="space-y-6 mt-20">
        <style>
          {` 
          .jp-title { 
          position: absolute; 
          top: 100%; 
          left: 16rem; 
          transform: translateY(-0.95em); 
          font-family: 'Noto Serif JP','Cormorant Garamond',serif; font-weight: 900; 
          font-size: clamp(1.4rem, 2vw, 1.8rem); 
          letter-spacing: 0.32em; 
          background: linear-gradient( 90deg, rgba(255,255,255,1), rgba(255,255,255,0.6) ); 
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
        <div className="relative inline-block">
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
        <div className="relative mt-5 h-[460px]">
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
            className="absolute top-14 left-1/2 -translate-x-1/2 w-[260px] rounded-2xl shadow-2xl"
            draggable={false}
          />
        </div>
      </div>
    );
  };
  
  export default HeroNarrative;
  

