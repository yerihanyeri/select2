import React from "react";
import { Feather, Wind, Scissors } from "lucide-react";
import { TextReveal } from "../components/ui/Animations";

const TheProcess = () => {
  return (
    <section className="py-32 bg-[#F4F2ED]/50 text-[#2D2A26] px-6 md:px-20 border-t border-[#FDFCF8]/10">
      <div className="mb-20 text-center">
        <TextReveal>
          <h2 className="text-3xl font-serif mb-4 font-light">The Process</h2>
        </TextReveal>
        <p className="font-sans text-[10px] text-[#949188] tracking-widest">
          FROM RAW TO REFINED
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {[
          {
            step: "01",
            title: "Selection",
            desc: "Selecting only the finest organic fibers from sustainable sources.",
            icon: Feather,
          },
          {
            step: "02",
            title: "Spinning",
            desc: "Applying micro-air technology to create breathable threads.",
            icon: Wind,
          },
          {
            step: "03",
            title: "Crafting",
            desc: "Hand-finished by master artisans for zero-friction seams.",
            icon: Scissors,
          },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-6 group">
            <div className="w-16 h-16 rounded-full border border-[#2D2A26]/10 flex items-center justify-center text-[#949188] group-hover:bg-[#FAF9F6] group-hover:text-[#2D2A26] group-hover:shadow-sm transition-all duration-500">
              <item.icon size={24} />
            </div>
            <TextReveal delay={i * 0.2}>
              <h3 className="font-serif text-xl mb-2 italic text-[#2D2A26]">
                {item.step}. {item.title}
              </h3>
              <p className="text-xs font-light text-[#949188] max-w-xs mx-auto leading-relaxed">
                {item.desc}
              </p>
            </TextReveal>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TheProcess;
