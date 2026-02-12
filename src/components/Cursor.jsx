import React, { useEffect, useContext } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { CursorContext } from "../context/CursorContext";

const Cursor = () => {
  const { cursorState, cursorText } = useContext(CursorContext);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 100, damping: 40 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "#2D2A26",
      opacity: 0.8,
    },
    hover: { width: 48, height: 48, backgroundColor: "#2D2A26", opacity: 0.1 },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "#FAF9F6",
      opacity: 0.9,
      border: "1px solid #2D2A26",
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden mix-blend-multiply"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        variants={variants}
        animate={cursorState}
        transition={{ type: "spring", stiffness: 150, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {cursorState === "view" && (
            <motion.div
              key="view"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[#2D2A26] text-[8px] font-medium tracking-widest flex flex-col items-center"
            >
              <span className="mb-1">{cursorText || "VIEW"}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
export default Cursor;
