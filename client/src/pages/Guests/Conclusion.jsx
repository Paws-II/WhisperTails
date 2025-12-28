import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import image from "../../assets/expansion/001.png";

const Conclusion = () => {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const textBgRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.config({ markers: false });

    const ctx = gsap.context(() => {
      const expansionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      expansionTimeline
        .fromTo(
          cardRef.current,
          {
            width: "60vw",
            height: "55vh",
            borderRadius: "48px",
          },
          {
            width: "100%",
            height: "100vh",
            borderRadius: "0em",
            duration: 0.6,
            ease: "power2.inOut",
          }
        )
        .to(
          cardRef.current,
          {
            scale: 1.05,
            duration: 0.4,
            ease: "power3.inOut",
          },
          "<0.2"
        )

        .fromTo(
          textBgRef.current,
          {
            opacity: 0,
            scale: 0.92,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          "<0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="animate_container column_container"
      style={{
        height: "400vh",
        position: "relative",
      }}
    >
      <div
        ref={stickyRef}
        className="sticky_cont"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 50% 40%, #0f1f33 0%, #081423 40%, #03070c 75%, #000 100%)",
          zIndex: 1000,
        }}
      >
        <div
          ref={cardRef}
          className="animate_box"
          style={{
            width: "60vw",
            height: "55vh",
            borderRadius: "48px",
            overflow: "hidden",
            boxShadow: "0 50px 120px rgba(0, 0, 0, 0.4)",
            transformOrigin: "center center",
            willChange: "width, height, border-radius, transform",
            position: "relative",
          }}
        >
          <img
            src={image}
            alt="expansion"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(15,31,51,0.55), rgba(3,7,12,0.65))",
              zIndex: 1,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)",
              zIndex: 2,
            }}
          />

          <div
            ref={textRef}
            style={{
              position: "relative",
              zIndex: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
              padding: "clamp(32px, 6vw, 80px)",
              textAlign: "center",
              color: "white",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2.8rem, 6vw, 4.6rem)",
                fontWeight: 700,
                margin: 0,
                maxWidth: "900px",
                lineHeight: 1.2,
                paddingBottom: "0.15em",
                background: "linear-gradient(135deg, #ffffff 0%, #9fb4cf 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.015em",
                transform: "translateY(0.02em)",
              }}
            >
              Not Every Story Is Loud
            </h2>

            <div
              ref={textBgRef}
              style={{
                position: "relative",
                maxWidth: "820px",
                padding: "clamp(28px, 5vw, 56px)",
                borderRadius: "28px",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  margin: "0 auto 32px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
              />

              <p
                style={{
                  fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                  lineHeight: 1.9,
                  color: "rgba(255,255,255,0.78)",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Bonds like these aren't built through control or urgency.
                <br />
                They form when someone stays gentle long enough
                <br />
                for fear to soften into trust.
              </p>

              <div
                style={{
                  marginTop: "48px",
                  fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Trust doesn't rush.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conclusion;
