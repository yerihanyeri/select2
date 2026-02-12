import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";

// 숫자 카운팅용 컴포넌트
export const RoundedMotionValue = ({ value }) => {
  const ref = useRef(null);
  useEffect(
    () =>
      value.on("change", (latest) => {
        if (ref.current) ref.current.textContent = Math.round(latest);
      }),
    [value],
  );
  return <span ref={ref} />;
};

export const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      <RoundedMotionValue value={springValue} />
    </span>
  );
};

// 텍스트 등장 효과
export const TextReveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// 인터랙티브 텍스트 (히어로용)
export const InteractiveText = ({ text, subText }) => {
  return (
    <div className="flex flex-col items-center group cursor-default">
      <div className="flex overflow-hidden">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-[14vw] font-serif font-thin leading-[0.9] tracking-tighter text-[#2D2A26] inline-block mix-blend-difference"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.1,
            }}
            whileHover={{
              y: -5,
              color: "#949188",
              transition: { duration: 0.8, ease: "easeOut" },
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <motion.p
        className="font-sans text-[10px] tracking-[0.4em] mt-8 text-[#949188] font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        {subText}
      </motion.p>
    </div>
  );
};
