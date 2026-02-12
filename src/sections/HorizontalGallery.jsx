import React, { useContext, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";
import { CursorContext } from "../context/CursorContext";
import { PRODUCTS } from "../data/constants";
import { TextReveal } from "../components/ui/Animations";

const HorizontalGallery = ({ onProductClick }) => {
  const targetRef = useRef(null);
  const { setCursorState, setCursorText } = useContext(CursorContext);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    mass: 1.2,
  });
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useTransform(scrollVelocity, [-50, 50], [1, -1]);
  const springSkew = useSpring(skewVelocity, { stiffness: 100, damping: 40 });

  return (
    <section ref={targetRef} className="relative h-[800vh] bg-[#FAF9F6]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x }}
          className="flex items-center gap-[4vw] pl-[10vw]"
        >
          <div className="w-[20vw] flex-shrink-0 space-y-8 pl-10">
            <TextReveal>
              <h2 className="text-6xl md:text-8xl font-serif text-[#2D2A26] leading-none opacity-20 tracking-tight font-light">
                The
                <br />
                Archive
              </h2>
            </TextReveal>
          </div>
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              className={`relative w-[50vw] md:w-[35vw] flex-shrink-0 group cursor-none ${i % 2 === 0 ? "translate-y-12" : "-translate-y-12"}`}
              onClick={() => onProductClick(product)}
              onMouseEnter={() => {
                setCursorState("view");
                setCursorText("OPEN");
              }}
              onMouseLeave={() => {
                setCursorState("default");
                setCursorText("");
              }}
            >
              <div className="absolute -top-6 left-0 font-sans text-[10px] text-[#949188] tracking-[0.2em]">
                {product.id} — {product.type}
              </div>
              <motion.div
                style={{ skewX: springSkew }}
                className="h-[60vh] w-full overflow-hidden bg-[#EAE8E4] relative shadow-lg transition-transform duration-1000 rounded-[20px]"
              >
                <video
                  src={product.vid}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default HorizontalGallery;
