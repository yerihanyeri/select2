import React from "react";
import { motion } from "framer-motion";

const Intro = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#FAF9F6] flex items-center justify-center"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 2.0, ease: [0.77, 0, 0.175, 1], delay: 2.0 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          className="text-[8vw] font-serif font-thin text-[#2D2A26] tracking-tighter leading-none italic"
        >
          select.
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="h-[1px] bg-[#2D2A26]/20 mt-8"
        />
      </div>
    </motion.div>
  );
};
export default Intro;
