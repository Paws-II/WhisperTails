import React from "react";
import { ArrowRight } from "lucide-react";
import card1 from "../../../assets/card/image-part-001.png";
import card2 from "../../../assets/card/image-part-002.png";
import card3 from "../../../assets/card/image-part-003.png";

const HeroNarrative = ({ titleRef }) => {
  return (
    <div className="space-y-6 border mt-17">
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

        <span className="jp-title ">ウィスパーテイル</span>
      </div>

      <div className="relative mt-5 h-[460px] border">
        <img
          src={card1}
          alt="card-left"
          className=" absolute
          top-16
          left-[20px]
          w-[260px]
          rounded-2xl
          shadow-2xl
          rotate-[-15deg]
          z-10
        "
          draggable={false}
        />

        <img
          src={card2}
          alt="card-right"
          className=" absolute
          top-16
          right-[20px]
          w-[260px]
          rounded-2xl
          shadow-2xl
          rotate-[15deg]
          z-10
        "
          draggable={false}
        />

        <img
          src={card3}
          alt="card-center"
          className=" absolute
          top-12
          left-1/2
          -translate-x-1/2
          w-[260px]
          rounded-2xl
          shadow-2xl
          z-20
              "
          draggable={false}
        />
      </div>
    </div>
  );
};

export default HeroNarrative;
