import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CheckCircle, ShieldCheck, Leaf } from "lucide-react";
import { TextReveal } from "../components/ui/Animations";

const FabricCertification = () => {
  const { scrollYProgress } = useScroll();
  const smoothY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const y = useTransform(smoothY, [0, 1], [50, -50]);

  return (
    <section className="py-40 bg-[#F4F2ED] px-6 md:px-20 overflow-hidden relative border-t border-[#2D2A26]/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <motion.div
            style={{ y }}
            className="aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-2xl relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1595150937617-64058d479109?q=80&w=1200&auto=format&fit=crop"
              alt="Pure Cotton"
              className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-[#2D2A26]/10 mix-blend-multiply" />

            <div className="absolute bottom-8 left-8 flex flex-col gap-4">
              <div className="bg-[#FAF9F6]/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 w-fit shadow-sm">
                <CheckCircle size={14} className="text-[#2D2A26]" />
                <span className="font-sans text-[10px] tracking-widest text-[#2D2A26]">
                  DERMA TESTED EXCELLENT
                </span>
              </div>
              <div className="bg-[#FAF9F6]/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 w-fit shadow-sm">
                <ShieldCheck size={14} className="text-[#2D2A26]" />
                <span className="font-sans text-[10px] tracking-widest text-[#2D2A26]">
                  0.00% HARMFUL SUBSTANCES
                </span>
              </div>
              <div className="bg-[#FAF9F6]/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 w-fit shadow-sm">
                <Leaf size={14} className="text-[#2D2A26]" />
                <span className="font-sans text-[10px] tracking-widest text-[#2D2A26]">
                  100% ORGANIC CERTIFIED
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-12">
          <div>
            <TextReveal>
              <span className="font-sans text-[10px] text-[#949188] tracking-[0.3em] block mb-6">
                THE PUREST SELECTION
              </span>
            </TextReveal>
            <TextReveal>
              <h2 className="text-4xl md:text-6xl font-serif text-[#2D2A26] leading-tight mb-8 font-light">
                "Only one out of
                <br />
                thousands."
              </h2>
            </TextReveal>
            <p className="text-base font-light text-[#2D2A26]/70 leading-loose">
              우리는 단순히 부드러운 원단을 찾지 않습니다. 전 세계 3,000여 종의
              원단 중, 피부 자극 테스트를 통과하고 화학 물질이 전혀 검출되지
              않은 단 0.1%의 원단만을 선별합니다.
              <br />
              <br />
              당신의 피부가 닿는 모든 곳에, 타협하지 않는 순수함만을 남깁니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-[#2D2A26]/10 pt-8">
            <div>
              <h4 className="font-serif text-2xl text-[#2D2A26] mb-1">0%</h4>
              <p className="font-sans text-[10px] text-[#949188]">
                CHEMICAL RESIDUE
              </p>
            </div>
            <div>
              <h4 className="font-serif text-2xl text-[#2D2A26] mb-1">
                PH 5.5
              </h4>
              <p className="font-sans text-[10px] text-[#949188]">
                SKIN BALANCE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricCertification;
