import React from "react";
import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import { TextReveal } from "../components/ui/Animations";

const MaterialLab = () => {
  return (
    <section className="py-40 bg-[#FAF9F6] px-6 md:px-20 overflow-hidden relative border-t border-[#2D2A26]/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FlaskConical className="text-[#949188]" size={16} />
            <span className="font-sans text-[10px] tracking-widest text-[#949188]">
              MATERIAL LAB
            </span>
          </div>
          <TextReveal>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2D2A26] mb-10 leading-tight font-light">
              Fabric <br />
              <span className="italic text-[#949188]">Intelligence.</span>
            </h2>
          </TextReveal>
          <p className="text-base font-light text-[#949188] leading-loose mb-12">
            우리는 원단을 단순한 천으로 보지 않습니다.
            <br />
            그것은 공기, 온도, 그리고 피부가 만나는
            <br />
            가장 정교한 인터페이스입니다.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="border-l border-[#2D2A26]/5 pl-6">
              <h4 className="font-serif text-xl text-[#2D2A26] mb-2">
                Micro-Vent
              </h4>
              <p className="font-sans text-[10px] text-[#949188]">
                AUTO-COOLING SYSTEM
              </p>
            </div>
            <div className="border-l border-[#2D2A26]/5 pl-6">
              <h4 className="font-serif text-xl text-[#2D2A26] mb-2">
                Silk-Touch
              </h4>
              <p className="font-sans text-[10px] text-[#949188]">
                ZERO FRICTION
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-[500px] flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-[400px] h-[400px] border border-[#2D2A26]/5 rounded-full absolute"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="w-[300px] h-[300px] border border-[#2D2A26]/5 rounded-full absolute flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-[#EAE8E4] rounded-full absolute top-0" />
          </motion.div>
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden relative group cursor-crosshair shadow-lg bg-[#EAE8E4]">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-150 opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FAF9F6]/30 backdrop-blur">
              <span className="font-sans text-[10px] text-[#2D2A26] bg-[#FAF9F6]/80 px-3 py-1 rounded-full">
                ANALYZING...
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialLab;
