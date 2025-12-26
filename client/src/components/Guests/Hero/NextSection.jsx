import React from "react";
import basket from "./image-basket.png";

const NextSection = () => {
  return (
    <div
      className="relative min-h-screen bg-[radial-gradient(circle_at_50%_20%,_#ece9ea_0%,_#eae8e9_38%,_#eae8e8_62%,_#dbd9da_100%)]
  before:content-['']
  before:absolute
  before:inset-0
  before:bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0))]
  before:pointer-events-none overflow-hidden"
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_#ece9ea_0%,_#eae8e9_38%,_#eae8e8_62%,_#dbd9da_100%)]
  before:content-['']
  before:absolute
  before:inset-0
  before:bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0))]
  before:pointer-events-none "
      />
    </div>
  );
};

export default NextSection;
