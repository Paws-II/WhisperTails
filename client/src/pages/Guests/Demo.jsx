import React, { useEffect, useState } from "react";

const Demo = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-[220vh] bg-[radial-gradient(circle_at_top,#60519b_0%,#31323e_45%,#1e202c_100%)] text-[#e8e6f2]">
      {/* Hero */}
      <section
        className="h-screen flex flex-col justify-center px-[10vw]"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: 1 - scrollY / 600,
        }}
      >
        <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold tracking-tight">
          Scroll Demo
        </h1>
        <p className="mt-3 text-lg text-[#bfc0d1]">Testing motion & depth</p>
      </section>

      {/* Spacer */}
      <div className="h-[80vh]" />

      {/* Card */}
      <section
        className="mx-auto w-[min(90%,520px)] rounded-2xl p-12 shadow-[0_30px_80px_rgba(0,0,0,0.45)]
                   bg-gradient-to-b from-[#60519b] to-[#31323e]"
        style={{
          transform: `translateY(${Math.max(0, 300 - scrollY) * 0.2}px)`,
        }}
      >
        <h2 className="text-2xl font-semibold mb-2">Scroll Section</h2>
        <p className="text-[#d1d2e8] leading-relaxed">
          This block reacts to scroll position to help test parallax, spacing,
          and visual weight.
        </p>
      </section>

      <div className="h-[80vh]" />
    </div>
  );
};

export default Demo;
