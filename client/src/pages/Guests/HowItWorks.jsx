import React, { useEffect, useRef } from "react";
import { Heart, Home, Video, Search, FileText, Dog } from "lucide-react";

const HowItWorks = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "Choose Your Pet",
      description: "Find the one that steals your heart",
      icon: Dog,

      gradient:
        "radial-gradient(circle at 30% 30%, #2e3a8c 0%, #141a3a 45%, #070b1f 100%)",
    },
    {
      id: 2,
      title: "Submit Your Application",
      description: "Tell us why you're the perfect match",
      icon: FileText,

      gradient:
        "radial-gradient(circle at 30% 30%, #4b2f6b 0%, #251533 55%, #0f0815 100%)",
    },
    {
      id: 3,
      title: "Application Review",
      description: "We verify details to ensure a safe home",
      icon: Search,

      gradient:
        "radial-gradient(circle at 30% 30%, #1f6b8f 0%, #0b2c3d 50%, #050f16 100%)",
    },
    {
      id: 4,
      title: "Video Verification",
      description: "A quick face-to-face to build trust",
      icon: Video,
      gradient:
        "radial-gradient(circle at 30% 30%, #1f5f4a 0%, #0f2f25 55%, #071611 100%)",
    },
    {
      id: 5,
      title: "Home Visit",
      description: "Because every pet deserves the right space",
      icon: Home,
      gradient:
        "radial-gradient(circle at 30% 30%, #2a2e35 0%, #14171c 55%, #080a0e 100%)",
    },
    {
      id: 6,
      title: "Welcome Them Home",
      description: "Done. Your forever companion is yours",
      icon: Heart,
      gradient:
        "radial-gradient(circle at 30% 30%, #6b1f2c 0%, #2f0f15 55%, #160709 100%)",
    },
  ];

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const cards = gsap.utils.toArray(".step-card");
    const heading = document.querySelector(".how-heading");

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;

      const cardContent = card.querySelector(".card-content");
      const nextCard = cards[index + 1];
      const cardsAfter = cards.length - 1 - index;
      const toScale = 1 - cardsAfter * 0.06;

      ScrollTrigger.create({
        trigger: nextCard,
        start: "top bottom",
        end: "top top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          gsap.to(cardContent, {
            scale: gsap.utils.interpolate(1, toScale, p),
            filter: `brightness(${gsap.utils.interpolate(1, 0.65, p)})`,
            duration: 0,
            overwrite: true,
          });
        },
      });
    });

    if (heading && cards.length) {
      ScrollTrigger.create({
        trigger: cards[0],
        start: "top bottom",
        end: "top top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          gsap.to(heading, {
            scale: gsap.utils.interpolate(1, 0.82, p),
            yPercent: gsap.utils.interpolate(-50, -80, p),
            filter: `brightness(${gsap.utils.interpolate(1, 0.6, p)})`,
            opacity: gsap.utils.interpolate(1, 0.35, p),
            duration: 0,
            overwrite: true,
          });
        },
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: "clamp(80px, 12vh, 140px)",
        paddingBottom: "clamp(80px, 12vh, 140px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        color: "white",
        background:
          "radial-gradient(circle at 50% 40%, #0f1f33 0%, #081423 40%, #03070c 75%, #000 100%)",
      }}
    >
      <div
        className="how-heading"
        style={{
          position: "sticky",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 5,
          maxWidth: "1000px",
          margin: "0 auto 140px",
          textAlign: "center",
          transformOrigin: "center center",
          willChange: "transform",
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
            fontWeight: 800,
            fontFamily: "'Space Grotesk', sans-serif",
            color: "white",
            marginBottom: "16px",
          }}
        >
          How WhisperTails Works
        </h2>
      </div>

      <div style={{ height: "240vh" }} />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const offsetTop = 20 + index * 30;

          return (
            <div
              key={step.id}
              className="step-card"
              style={{
                position: "sticky",
                top: "120px",
                paddingTop: `${offsetTop}px`,
                marginBottom: index === steps.length - 1 ? 0 : "40px",
              }}
            >
              <div
                className="card-content"
                style={{
                  width: "100%",
                  minHeight: "clamp(350px, 70vh, 550px)",
                  position: "relative",
                  background: step.gradient,
                  borderRadius: "32px",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.3)",
                  willChange: "transform",
                  transformOrigin: "center top",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.15,
                    pointerEvents: "none",
                    background:
                      "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.03,
                    pointerEvents: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: "overlay",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    height: "100%",
                    display: "flex",
                    flexDirection: window.innerWidth < 768 ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "clamp(2.5rem, 5vw, 4rem)",
                    gap: "32px",
                    minHeight: "inherit",
                  }}
                >
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div
                      style={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontWeight: 600,
                        marginBottom: "16px",
                        fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                        letterSpacing: "0.15em",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      STEP {step.id}
                    </div>
                    <h3
                      style={{
                        color: "white",
                        fontWeight: 700,
                        marginBottom: "20px",
                        fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                        lineHeight: 1.15,
                        fontFamily: "'Space Grotesk', sans-serif",
                        textShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "clamp(1.05rem, 2.3vw, 1.4rem)",
                        lineHeight: 1.6,
                        fontFamily: "'Inter', sans-serif",
                        maxWidth: "550px",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                  <div className="card-icon" style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: "clamp(90px, 16vw, 150px)",
                        height: "clamp(90px, 16vw, 150px)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(10px)",
                        boxShadow:
                          "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
                      }}
                    >
                      <Icon
                        size={window.innerWidth < 768 ? 44 : 64}
                        strokeWidth={1.5}
                        style={{ color: "white" }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.08,
                    pointerEvents: "none",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
