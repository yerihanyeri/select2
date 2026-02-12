import React from "react";
import { motion } from "framer-motion";

const MarqueeReviews = () => {
  return (
    <section className="py-20 bg-[#FAF9F6] overflow-hidden border-y border-[#2D2A26]/5">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="flex whitespace-nowrap gap-32"
      >
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="flex gap-32 items-center text-[#949188]/30 text-3xl font-serif italic font-light"
          >
            <span>"The most comfortable sleepwear I've ever owned."</span>
            <span>"Science you can feel."</span>
            <span>"It's like wearing a cloud."</span>
            <span>"Perfect temperature regulation."</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeReviews;
