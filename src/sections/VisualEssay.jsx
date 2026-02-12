import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { TextReveal } from "../components/ui/Animations";

const VisualEssay = ({ onOpenStory }) => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });
  const y1 = useTransform(smoothProgress, [0, 1], [0, -150]);
  const y2 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const y3 = useTransform(smoothProgress, [0, 1], [50, -50]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section className="py-40 bg-[#FAF9F6] px-6 md:px-20 overflow-hidden relative">
      <div className="absolute top-1/4 left-[-10%] z-0 pointer-events-none opacity-[0.03]">
        <h2 className="text-[20vw] font-serif italic text-[#3E3C38] whitespace-nowrap leading-none">
          Morning
          <br />
          Ritual
        </h2>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-8 min-h-[150vh]">
          <motion.div
            style={{ y: y1 }}
            className="col-span-12 md:col-span-7 relative z-10"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[40px] shadow-2xl group">
              <motion.div style={{ scale }} className="w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=1200&auto=format&fit=crop"
                  alt="Morning Light"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
                />
              </motion.div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#FAF9F6] p-6 rounded-[20px] shadow-lg max-w-xs hidden md:block">
              <p className="font-serif italic text-xl text-[#2D2A26] mb-2 font-light">
                "Softness that breathes."
              </p>
              <span className="font-sans text-[10px] text-[#949188] tracking-widest">
                FIG. 01 — MORNING LIGHT
              </span>
            </div>
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="col-span-12 md:col-span-5 flex flex-col justify-center pt-20 md:pt-60 z-20 px-8"
          >
            <TextReveal>
              <h2 className="text-5xl md:text-7xl font-serif text-[#2D2A26] leading-tight mb-8 font-light">
                Visual
                <br />
                <span className="italic text-[#949188]">Poetry.</span>
              </h2>
            </TextReveal>
            <p className="text-lg font-light text-[#2D2A26]/70 leading-relaxed mb-12">
              고요한 아침의 빛과
              <br />
              피부에 닿는 첫 번째 감촉.
              <br />
              우리는 그 찰나의 순간을 디자인합니다.
              <br />
              단순한 잠옷이 아닌, 당신의 하루를 여는
              <br />
              가장 부드러운 의식(Ritual)입니다.
            </p>
            <button
              onClick={onOpenStory}
              className="flex items-center gap-4 group hover:opacity-70 transition-opacity"
            >
              <div className="w-12 h-[1px] bg-[#2D2A26]" />
              <span className="font-sans text-xs text-[#2D2A26] tracking-widest">
                READ THE STORY
              </span>
            </button>
          </motion.div>
          <motion.div
            style={{ y: y3 }}
            className="col-span-12 md:col-span-6 md:col-start-4 pt-20 relative z-0"
          >
            <div className="aspect-square w-full overflow-hidden rounded-[40px] shadow-xl border-8 border-[#FAF9F6] group">
              <img
                src="https://lh3.googleusercontent.com/gg/AMW1TPoK8bDG79aQo6JnSm_xqGWO-NHIxAluzcPCggVa0NFsuc_10IIV1j_WXi-IOhO6k2M3sD0ZaMAKBKzXGpYGntes9vqOaPQBUKOatL0tZ1wXBdAsyHI8AlXjhe4PnFsZuz1yJLuSZGVIOFeg__4FZyWrHLQ-DxN4AtPHHG_IhGlz6UpAFgL6ppflbpCrTJo-Y5taitVHWyrEB6zviGli5MLXL7kKAmKSx_pnX5XUB5Xl00qsX7vibaOQjRiYDEPzhjtBDNdIFaNY6s9SgvgPSEqQ4gDbQdeBh6xVGpN-doUiMxVxD5c1L39ggW5Gu02-FqpgMaq3wGGvSx6OcyOhgls7=s1024-rj"
                alt="Texture Detail"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
            </div>
            <p className="font-sans text-[10px] mt-4 text-[#949188] text-right tracking-widest">
              FIG. 02 — TEXTURE DETAIL
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisualEssay;
