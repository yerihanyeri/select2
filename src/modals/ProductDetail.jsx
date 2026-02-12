import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  ArrowUpRight,
  Sparkles,
  Wind,
  Thermometer,
  Feather,
} from "lucide-react";
import { TextReveal, AnimatedCounter } from "../components/ui/Animations";

const ProductDetail = ({ product, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  const StatRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center gap-6 py-4 border-b border-[#2D2A26]/5 group">
      <div className="w-8 h-8 rounded-full bg-[#EAE8E4] flex items-center justify-center text-[#949188] group-hover:scale-105 transition-transform">
        <Icon size={12} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-end mb-2">
          <span className="font-sans text-[10px] tracking-widest text-[#949188]">
            {label}
          </span>
          <span className="font-serif text-lg italic text-[#2D2A26]">
            <AnimatedCounter value={value} duration={1} />
          </span>
        </div>
        <div className="w-full h-[1px] bg-[#EAE8E4] overflow-hidden rounded-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${value}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-full bg-[#949188]"
          />
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9000] bg-[#FAF9F6]/80 backdrop-blur-md flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 40, mass: 1.2 }}
        className="w-full md:w-[60vw] h-full bg-[#FAF9F6] relative flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.03)] overflow-y-auto rounded-l-[40px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="fixed top-8 right-8 z-50 p-3 rounded-full bg-[#FAF9F6] hover:bg-[#EAE8E4] text-[#2D2A26] transition-all shadow-sm border border-[#2D2A26]/5 group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="h-[60vh] relative flex-shrink-0 bg-[#EAE8E4] overflow-hidden rounded-tl-[40px] group">
          {product.vid ? (
            <video
              src={product.vid}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
            />
          ) : (
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              src={product.images.main}
              alt={product.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 p-12 md:p-20 w-full">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.2}
              className="font-sans text-[10px] text-[#949188] tracking-[0.2em] block mb-4 border border-[#2D2A26]/10 w-fit px-3 py-1 rounded-full bg-[#FAF9F6]/50 backdrop-blur"
            >
              {product.type} SERIES
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.3}
              className="text-5xl md:text-7xl font-serif font-light italic text-[#2D2A26] tracking-tight"
            >
              {product.name}
            </motion.h2>
          </div>
        </div>

        <div className="p-12 md:p-20 space-y-20 bg-[#FAF9F6]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <TextReveal>
                <h3 className="font-serif text-3xl md:text-4xl text-[#2D2A26] leading-tight mb-8 font-light">
                  "Engineered for
                  <br />
                  <span className="text-[#949188] italic">
                    perfect silence.
                  </span>
                  "
                </h3>
              </TextReveal>
              <p className="text-sm font-light leading-loose text-[#949188]">
                {product.detail}
              </p>
            </div>
            <div className="space-y-2 bg-[#F4F2ED]/50 p-8 rounded-[24px] border border-[#2D2A26]/5">
              <h4 className="font-sans text-[10px] text-[#2D2A26] mb-6 tracking-widest flex items-center gap-2 border-b border-[#2D2A26]/10 pb-4">
                <Sparkles size={12} /> LAB REPORT
              </h4>
              <StatRow
                label="SOFTNESS"
                value={product.stats.softness}
                icon={Feather}
              />
              <StatRow
                label="BREATHABILITY"
                value={product.stats.breathability}
                icon={Wind}
              />
              <StatRow
                label="THERMAL"
                value={product.stats.thermal}
                icon={Thermometer}
              />
            </div>
          </div>
          {/* ... (생략된 갤러리 부분은 필요 시 추가) ... */}
          <div className="sticky bottom-8 z-20 pointer-events-none flex justify-center">
            <button className="pointer-events-auto w-full md:w-auto px-16 py-5 bg-[#2D2A26] text-[#FAF9F6] font-sans text-xs tracking-widest hover:bg-[#4A4742] transition-all rounded-full flex justify-between items-center gap-8 group shadow-xl">
              <span>ADD TO CART &mdash; {product.price}</span>
              <ArrowUpRight
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                size={16}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default ProductDetail;
