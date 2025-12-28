import React, { useState } from "react";
import {
  XCircle,
  CheckCircle,
  PawPrint,
  HeartOff,
  EyeOff,
  TimerOff,
  HeartHandshake,
  ShieldCheck,
  Search,
  Clock,
  HandHelping,
  Sparkles,
  Home,
} from "lucide-react";

const DONT_ITEMS = [
  {
    title: "Impulse Adoption",
    description:
      "Adopting pets without understanding their needs often leads to neglect or abandonment.",
    icon: HeartOff,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #fca5a5 0%,
        #dc2626 50%,
        #450a0a 100%)
    `,
  },
  {
    title: "Ignoring Health Checks",
    description:
      "Skipping vaccinations, deworming, or vet visits puts animals at serious risk.",
    icon: ShieldCheck,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #fdba74 0%,
        #ea580c 50%,
        #431407 100%)
    `,
  },
  {
    title: "Poor Living Conditions",
    description:
      "Inadequate space, hygiene, or enrichment harms both physical and mental health.",
    icon: Home,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #a3a3a3 0%,
        #525252 50%,
        #0a0a0a 100%)
    `,
  },
  {
    title: "Lack of Commitment",
    description:
      "Pets require long-term time, care, and emotional responsibility.",
    icon: TimerOff,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #f9a8d4 0%,
        #db2777 50%,
        #500724 100%)
    `,
  },
  {
    title: "Unverified Rehoming",
    description:
      "Handing over animals without proper screening can place them in unsafe homes.",
    icon: EyeOff,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #c4b5fd 0%,
        #7c3aed 50%,
        #2e1065 100%)
    `,
  },
  {
    title: "Delaying Medical Care",
    description:
      "Postponing treatment or emotional support can worsen trauma and recovery.",
    icon: HandHelping,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #fcd34d 0%,
        #d97706 50%,
        #451a03 100%)
    `,
  },
];

const DO_ITEMS = [
  {
    title: "Responsible Adoption",
    description:
      "Match pets with families that suit their temperament, energy, and needs.",
    icon: HeartHandshake,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #86efac 0%,
        #16a34a 50%,
        #052e16 100%)
    `,
  },
  {
    title: "Prioritize Health & Safety",
    description:
      "Ensure vaccinations, sterilization, and regular vet care are completed.",
    icon: ShieldCheck,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #7dd3fc 0%,
        #0284c7 50%,
        #082f49 100%)
    `,
  },
  {
    title: "Create Safe Environments",
    description:
      "Provide clean, enriched spaces that support comfort and emotional well-being.",
    icon: PawPrint,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #5eead4 0%,
        #0d9488 50%,
        #042f2e 100%)
    `,
  },
  {
    title: "Educate Adopters",
    description:
      "Clear guidance helps new pet parents prepare and avoid common mistakes.",
    icon: Sparkles,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #c4b5fd 0%,
        #8b5cf6 50%,
        #2e1065 100%)
    `,
  },
  {
    title: "Increase Visibility",
    description:
      "Better exposure helps animals find homes faster and reduces shelter stress.",
    icon: Search,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #fbbf24 0%,
        #f59e0b 50%,
        #78350f 100%)
    `,
  },
  {
    title: "Offer Ongoing Support",
    description:
      "Post-adoption help ensures long-term success for both pets and adopters.",
    icon: Clock,
    gradient: `
      radial-gradient(circle at 30% 30%,
        #fb923c 0%,
        #ea580c 50%,
        #431407 100%)
    `,
  },
];

const DoDont = () => {
  const [isDo, setIsDo] = useState(true);
  const items = isDo ? DO_ITEMS : DONT_ITEMS;

  return (
    <section
      className="relative"
      style={{
        minHeight: "100vh",
        padding: "clamp(100px,14vh,160px) 24px",
        background:
          "radial-gradient(circle at 50% 40%, #0f1f33 0%, #081423 40%, #03070c 75%, #000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="text-center">
          <div className="inline-block relative">
            <h1
              className="text-[clamp(3rem,6vw,5rem)] font-black tracking-tight leading-[1.1] mb-4"
              style={{
                background:
                  "linear-gradient(90deg, #e5e7eb 0%, #c7d2fe 40%, #93c5fd 70%, #e5e7eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 60px rgba(147,197,253,0.25)",
              }}
            >
              A Moment of Awareness
            </h1>

            <div
              className="absolute -inset-4 -z-10 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(96,165,250,0.4) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>
          <p className="text-white/60 text-[clamp(1rem,2vw,1.3rem)] font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
            Every action shapes a life. Learn what helps animals thrive and what
            puts them at risk.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold tracking-tight text-white leading-[1.15]">
            When people{" "}
            <span
              className="inline-block align-baseline text-center mx-1"
              style={{ lineHeight: 1 }}
            >
              <span
                className={`block transition-all duration-500 ${
                  isDo
                    ? "text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500"
                    : "text-transparent bg-clip-text bg-linear-to-r from-red-400 via-rose-400 to-red-500"
                }`}
                style={{
                  textShadow: isDo
                    ? "0 0 30px rgba(59,130,246,0.4)"
                    : "0 0 30px rgba(239,68,68,0.4)",
                }}
              >
                {isDo ? "do" : "don't"}
              </span>

              <div
                onClick={() => setIsDo(!isDo)}
                className={`w-20 h-10 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
                  isDo ? "bg-blue-500" : "bg-red-600"
                }`}
              >
                <div
                  className={`w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    isDo ? "translate-x-10" : "translate-x-1"
                  }`}
                />
              </div>
            </span>{" "}
            care for animals.
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer"
              style={{
                background: item.gradient,
                boxShadow:
                  "0 10px 40px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
                }}
              />

              <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-white/30 transition-all duration-500" />

              <div className="relative p-8">
                <div className="mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-full
               bg-white/15 border border-white/25
               shadow-[inset_0_1px_4px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.35)]
               transition-transform duration-300
               group-hover:scale-105"
                  >
                    <Icon
                      size={26}
                      strokeWidth={2.4}
                      className={`${isDo ? "text-white" : "text-red-100"}`}
                    />
                  </div>
                </div>

                <h3 className="text-[22px] font-semibold text-white mb-3 tracking-tight leading-[1.3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)] transition-all duration-300">
                  {item.title}
                </h3>

                <p
                  className="text-white/70 leading-[1.75] text-[15px] font-normal tracking-wide group-hover:text-white/85 transition-all duration-300"
                  style={{
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DoDont;
