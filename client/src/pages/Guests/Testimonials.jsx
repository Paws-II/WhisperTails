import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const testimonials = [
  {
    name: "Hinata Hyuga",
    role: "First-time Adopter",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=1000&fit=crop",
    quote:
      "I was nervous about making the wrong decision. The process encouraged patience, not pressure. That helped me trust myself — and them.",
    color: "#1a0f2e",
  },
  {
    name: "Itachi Uchiha",
    role: "Shelter Partner",
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&h=1000&fit=crop",
    quote:
      "Doing the right thing often means slowing down. WhisperTails respects that. It values long-term bonds over quick outcomes.",
    color: "#1a0a0a",
  },
  {
    name: "Tanjiro Kamado",
    role: "Adopter",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=1000&fit=crop",
    quote:
      "Every step felt thoughtful. It wasn't about choosing fast — it was about choosing responsibly. That made the journey meaningful.",
    color: "#0f2818",
  },
  {
    name: "Mikasa Ackerman",
    role: "Pet Parent",
    image:
      "https://images.unsplash.com/photo-1573865526739-10c1dd7d8f46?w=800&h=1000&fit=crop",
    quote:
      "What mattered most was the care after adoption. The follow-ups reminded us that commitment doesn't end once you take them home.",
    color: "#1a1a0a",
  },
  {
    name: "Kakashi Hatake",
    role: "Shelter Volunteer",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=1000&fit=crop",
    quote:
      "We've seen fewer returns and stronger bonds. When a platform prioritizes fit over speed, the results speak quietly for themselves.",
    color: "#0a1a1a",
  },
  {
    name: "Violet Evergarden",
    role: "Adopter",
    image:
      "https://images.unsplash.com/photo-1568572933382-74d440642117?w=800&h=1000&fit=crop",
    quote:
      "The experience helped me understand responsibility in a deeper way. It wasn't just about adoption — it was about readiness.",
    color: "#1a0a1a",
  },
];

const Testimonials = () => {
  const galleryRef = useRef(null);
  const contentSectionsRef = useRef([]);
  const photosRef = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const sections = contentSectionsRef.current.slice(1);
        const photos = photosRef.current.slice(1);
        const allPhotos = photosRef.current;

        gsap.set(allPhotos[0], {
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 1,
        });

        gsap.set(photos, {
          clipPath: "inset(100% 0% 0% 0%)",
          autoAlpha: 1,
        });

        ScrollTrigger.create({
          trigger: headingRef.current,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => {
            gsap.to(galleryRef.current, {
              backgroundColor: testimonials[0].color,
              duration: 0.8,
              ease: "power2.inOut",
            });
          },
        });

        sections.forEach((section, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              gsap.to(galleryRef.current, {
                backgroundColor: testimonials[i + 1].color,
                duration: 0.8,
                ease: "power2.inOut",
              });
            },
            onEnterBack: () => {
              gsap.to(galleryRef.current, {
                backgroundColor: testimonials[i + 1].color,
                duration: 0.8,
                ease: "power2.inOut",
              });
            },
          });
        });

        sections.forEach((section, i) => {
          const headline = section.querySelector(".reveal");

          const tl = gsap.timeline().to(photos[i], {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power2.out",
          });

          ScrollTrigger.create({
            trigger: headline,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6,
            animation: tl,
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        const sections = contentSectionsRef.current;

        sections.forEach((section, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              gsap.to(galleryRef.current, {
                backgroundColor: testimonials[i].color,
                duration: 0.8,
                ease: "power2.inOut",
              });
            },
            onEnterBack: () => {
              gsap.to(galleryRef.current, {
                backgroundColor: testimonials[i].color,
                duration: 0.8,
                ease: "power2.inOut",
              });
            },
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={galleryRef}
      style={{
        backgroundColor: testimonials[0].color,
        color: "#e8f0f8",
        transition: "background-color 0.8s ease",
      }}
    >
      <section
        ref={headingRef}
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "140px 24px 80px",
        }}
      >
        <div style={{ maxWidth: "820px" }}>
          <h2
            style={{
              fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            Stories That Stayed
          </h2>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              color: "#9fb4cf",
              lineHeight: 1.6,
            }}
          >
            Real bonds formed through patience not pressure. Voices from
            adopters and shelters who chose responsibility over speed.
          </p>
        </div>
      </section>

      <section
        style={{
          minHeight: "10vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 0",
        }}
      >
        <div
          className="testimonials-container"
          style={{
            width: "100%",
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            padding: "120px 40px",
          }}
        >
          <div className="content">
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => (contentSectionsRef.current[i] = el)}
                style={{
                  minHeight: "80vh",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="reveal">
                  <blockquote
                    style={{
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      maxWidth: "480px",
                      marginBottom: "32px",
                    }}
                  >
                    "{t.quote}"
                  </blockquote>

                  <p
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    {t.name}
                  </p>
                  <p style={{ color: "#9fb4cf" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="photos"
            style={{
              position: "sticky",
              top: "15vh",
              height: "70vh",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => (photosRef.current[i] = el)}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "40px",
                  overflow: "hidden",
                  background: "#000",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
                  zIndex: i,
                }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 767px) {
          .testimonials-container {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }

          .photos {
            position: relative !important;
            height: 60vh !important;
          }

          .photos > div {
            position: relative !important;
            margin-bottom: 40px;
          }

          .reveal {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
