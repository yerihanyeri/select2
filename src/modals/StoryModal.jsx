import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const StoryModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9500] bg-[#FAF9F6] flex items-center justify-center p-6 md:p-20 overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-50 p-3 rounded-full hover:bg-[#EAE8E4] transition-colors"
      >
        <X size={24} className="text-[#2D2A26]" />
      </button>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl w-full"
      >
        <div className="mb-12 text-center">
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#949188] block mb-4">
            BRAND STORY
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-[#2D2A26] italic mb-8">
            The Science of Silence
          </h2>
          <div className="w-[1px] h-20 bg-[#2D2A26]/20 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-[#2D2A26]/80 font-light leading-loose">
            <p>
              우리는 밤을 연구합니다. 하루의 3분의 1을 차지하는 수면 시간이 삶의
              질을 결정한다고 믿기 때문입니다...
            </p>
          </div>
          <div className="h-[400px] bg-[#EAE8E4] rounded-[20px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default StoryModal;
