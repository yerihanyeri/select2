import React from "react";
import { TextReveal, AnimatedCounter } from "../components/ui/Animations";

const Philosophy = () => {
  return (
    <section className="py-40 bg-[#FAF9F6] text-[#2D2A26] min-h-screen relative overflow-hidden flex items-center">
      <div className="max-w-[1920px] mx-auto px-6 md:px-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
          <div className="md:col-span-7">
            <TextReveal>
              <h2 className="text-5xl md:text-8xl font-serif leading-[0.95] mb-12 opacity-90 font-thin">
                Data Driven
                <br />
                <span className="text-[#949188] italic">Comfort.</span>
              </h2>
            </TextReveal>
          </div>
          <div className="md:col-span-5 space-y-16 border-l border-[#2D2A26]/5 pl-12">
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-serif text-[#2D2A26] font-light">
                  <AnimatedCounter value={0} />
                  .01
                </span>
                <span className="font-sans text-xs text-[#949188]">μm</span>
              </div>
              <p className="font-sans text-[10px] tracking-widest text-[#949188]">
                FIBER THICKNESS
              </p>
            </div>
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-serif text-[#2D2A26] font-light">
                  <AnimatedCounter value={36} />
                  .5
                </span>
                <span className="font-sans text-xs text-[#949188]">°C</span>
              </div>
              <p className="font-sans text-[10px] tracking-widest text-[#949188]">
                OPTIMAL TEMP
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
