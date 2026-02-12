import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useVelocity,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
} from "framer-motion";
import {
  X,
  ArrowUpRight,
  Sparkles,
  Wind,
  Thermometer,
  Feather,
  BrainCircuit,
  BookOpen,
  FlaskConical,
  Scissors,
  Droplet,
  Sun,
  Upload,
  CheckCircle,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import Hero from "./sections/Hero";

// --- [FONTS LOAD] ---
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@200;300;400&display=swap');
    
    body { font-family: 'Inter', sans-serif; font-weight: 300; background-color: #FAF9F6; color: #2D2A26; }
    h1, h2, h3, h4, .font-serif { font-family: 'Playfair Display', serif; }
    
    ::-webkit-scrollbar { width: 0px; background: transparent; }
    body { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

// --- [GEMINI API CONFIGURATION] ---
const apiKey = "";

const callGeminiAPI = async (userUnput) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userUnput }] }],
          systemInstruction: {
            parts: [
              {
                text: `
                You are the Head Researcher at 'select.', a premium sleepwear brand.
                Tone: Scientific, Poetic, Comforting.
                Recommend ONE product (N.01~N.05) based on user input.
                Response JSON: { "recommendedId": "N.01", "reason": "Korean explanation", "ritual": "Korean ritual" }
              `,
              },
            ],
          },
          generationConfig: { responseMimeType: "application/json" },
        }),
      },
    );
    if (!response.ok) throw new Error("API Call Failed");
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error(error);
    return null;
  }
};

// --- [DATA] ---
const HERO_VIDEO = "/public/Images/Hero_section_video_1080p_202602091105.mp4";
const COLLECTION_VIDEOS = [
  "https://videos.pexels.com/video-files/4936696/4936696-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/6603347/6603347-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/7653698/7653698-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/5309395/5309395-uhd_2560_1440_25fps.mp4",
];

const PRODUCTS = [
  {
    id: "N.01",
    name: "The Silence",
    type: "SILK",
    price: "₩245,000",
    vid: "/public/Images/silk_detail.mp4",
    desc: "Noise-canceling texture.",
    stats: { softness: 98, breathability: 85, thermal: 60 },
    detail:
      "최고급 멀버리 실크 100%. 피부 마찰 계수를 0에 가깝게 줄여 수면 중 뒤척임 소음까지 차단합니다.",
    images: {
      main: "/public/Images/Gemini_Generated_Image_xl8rbixl8rbixl8r.png",
      fabric: "/public/Images/silk_detail.png",
    },
  },
  {
    id: "N.02",
    name: "Cloud Walker",
    type: "COTTON",
    price: "₩189,000",
    vid: "",
    desc: "Zero gravity structure.",
    stats: { softness: 90, breathability: 95, thermal: 70 },
    detail:
      "무중력 방적 기술로 공기층을 극대화한 코튼. 구름 위를 걷는 듯한 가벼움을 선사합니다.",
    images: {
      main: "/public/Images/fabric.png",
      fabric: "/public/Images/fabric.png",
    },
  },
  {
    id: "N.03",
    name: "Midnight Flow",
    type: "MODAL",
    price: "₩198,000",
    vid: "/public/Images/modal.mp4",
    desc: "Fluid dynamics fabric.",
    stats: { softness: 96, breathability: 88, thermal: 65 },
    detail:
      "너도밤나무에서 추출한 모달 섬유. 유체 역학을 적용한 드레이프성으로 몸의 곡선을 따라 흐릅니다.",
    images: {
      main: "/public/Images/modal.png",
      fabric: "/public/Images/modal_detail.png",
    },
  },
  {
    id: "N.04",
    name: "Raw Earth",
    type: "LINEN",
    price: "₩210,000",
    vid: "/public/Images/Linnen.mp4",
    desc: "Organic ventilation.",
    stats: { softness: 75, breathability: 99, thermal: 40 },
    detail:
      "자연 그대로의 통기성을 가진 린넨. 피부의 열을 즉각적으로 배출하는 천연 쿨링 시스템입니다.",
    images: {
      main: "/public/Images/Gemini_Generated_Image_381kff381kff381k.png",
      fabric: "/public/Images/linnen_detail.png",
    },
  },
  {
    id: "N.05",
    name: "Deep Dive",
    type: "VELVET",
    price: "₩280,000",
    vid: COLLECTION_VIDEOS[1],
    desc: "Thermal regulation.",
    stats: { softness: 92, breathability: 70, thermal: 95 },
    detail:
      "체온을 가두는 마이크로 벨벳. 깊은 심해처럼 고요하고 따뜻한 수면 환경을 조성합니다.",
    images: {
      main: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      fabric:
        "https://images.unsplash.com/photo-1612459992383-7c70c0c804b1?q=80&w=1000&auto=format&fit=crop",
    },
  },
];

const JOURNAL_POSTS = [
  {
    id: 1,
    title: "The Science of 22°C",
    desc: "Why we obsess over the perfect sleep temperature.",
    img: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Beyond Cotton",
    desc: "Exploring the next generation of organic fibers.",
    img: "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Morning Rituals",
    desc: "How to wake up feeling weightless.",
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1000&auto=format&fit=crop",
  },
];

// --- [GLOBAL STATE] ---
const CursorContext = createContext();

// --- [UTILS] ---
const RoundedMotionValue = ({ value }) => {
  const ref = useRef(null);
  useEffect(() => {
    return value.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest);
      }
    });
  }, [value]);
  return <span ref={ref} />;
};

const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref}>
      <RoundedMotionValue value={springValue} />
    </span>
  );
};

// Text Reveal Animation
const TextReveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
        transition={{ duration: 1.0, ease: "easeOut", delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Interactive Hero Text
const InteractiveText = ({ text, subText }) => {
  return (
    <div className="flex flex-col items-center group cursor-default">
      <div className="flex overflow-hidden">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-[14vw] font-serif font-thin leading-[0.9] tracking-tighter text-[#2D2A26] inline-block mix-blend-difference"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: index * 0.05,
            }}
            whileHover={{
              y: -10,
              color: "#949188",
              transition: { duration: 0.3, ease: "easeOut" },
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
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        {subText}
      </motion.p>
    </div>
  );
};

// --- [COMPONENTS] ---
const Cursor = () => {
  const { cursorState, cursorText } = useContext(CursorContext);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 800, damping: 35 };
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
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {cursorState === "view" && (
            <motion.div
              key="view"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
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

const SmartNav = ({ onMenuClick, onAiClick }) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useAnimationFrame(() => {
    const current = scrollY.get();
    if (current > lastScrollY + 5 && current > 50) {
      setVisible(false);
    } else if (current < lastScrollY - 5) {
      setVisible(true);
    }
    setIsScrolled(current > 50);
    setLastScrollY(current);
  });

  return (
    <motion.nav
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 transition-colors duration-300 ${isScrolled ? "bg-[#FAF9F6]/80 backdrop-blur-sm text-[#2D2A26]" : "text-[#2D2A26]"}`}
    >
      <div className="text-xl font-serif font-medium tracking-tight cursor-pointer">
        select.
      </div>
      <div className="flex gap-8 font-light text-[10px] tracking-widest items-center">
        <button
          onClick={onAiClick}
          className="flex items-center gap-1 hover:text-[#949188] transition-colors border border-[#2D2A26]/10 px-4 py-2 rounded-full bg-[#FAF9F6]/50"
        >
          <BrainCircuit size={12} /> AI LAB
        </button>
        <button className="hover:text-[#949188] transition-colors hidden md:block">
          SHOP
        </button>
        <button className="hover:text-[#949188] transition-colors hidden md:block">
          ARCHIVE
        </button>
        <button
          onClick={onMenuClick}
          className="hover:text-[#949188] transition-colors"
        >
          MENU
        </button>
      </div>
    </motion.nav>
  );
};

const Intro = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-[#FAF9F6] flex items-center justify-center"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1], delay: 1.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="text-[8vw] font-serif font-thin text-[#2D2A26] tracking-tighter leading-none italic"
        >
          select.
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-[1px] bg-[#2D2A26]/20 mt-8"
        />
      </div>
    </motion.div>
  );
};

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
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
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
              질을 결정한다고 믿기 때문입니다. 'select.'는 단순한 잠옷 브랜드가
              아닙니다. 우리는 수면 중 일어나는 신체의 미세한 변화를 관찰하고,
              가장 완벽한 휴식 상태를 유지할 수 있는 환경(Environment)을
              설계합니다.
            </p>
            <p>
              피부에 닿는 마찰을 0.01까지 줄인 실크, 체온에 따라 호흡하는 지능형
              린넨, 구름처럼 가벼운 무중력 코튼까지. 우리의 모든 소재는 수천
              번의 실험과 데이터 분석을 통해 탄생했습니다.
            </p>
          </div>
          <div className="h-[400px] bg-[#EAE8E4] rounded-[20px] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
            />
          </div>
        </div>

        <div className="text-center">
          <p className="font-serif text-2xl text-[#2D2A26] italic mb-4">
            "Sleep is not just a pause, but a reset."
          </p>
          <p className="font-sans text-xs text-[#949188] tracking-widest">
            EST. 2026 SEOUL
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
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
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
            />
          ) : (
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={product.images.main}
              alt={product.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
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

          <div className="space-y-12">
            <div className="group relative w-full h-[80vh] overflow-hidden rounded-[24px]">
              <img
                src={product.images.main}
                alt="Wearing"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
              <div className="absolute bottom-6 left-6 bg-[#FAF9F6]/90 backdrop-blur px-4 py-2 rounded-full font-sans text-[10px] tracking-widest text-[#2D2A26]">
                FIGURE 01. FIT
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 p-8">
                <h4 className="font-sans text-[10px] text-[#949188] mb-4 tracking-widest flex items-center gap-2">
                  TEXTURE ZOOM
                </h4>
                <p className="text-lg font-light leading-relaxed text-[#2D2A26]">
                  피부에 닿는 면적을 최소화한
                  <br />
                  <span className="font-serif italic text-2xl">
                    Micro-Air Structure
                  </span>
                </p>
              </div>
              <div className="order-1 md:order-2 h-[500px] overflow-hidden rounded-[24px] border border-[#2D2A26]/10 relative group cursor-zoom-in">
                <img
                  src={product.images.fabric}
                  alt="Fabric"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150 grayscale group-hover:grayscale-0 ease-in-out"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#FAF9F6]/30 backdrop-blur-[2px]">
                  <div className="bg-[#FAF9F6] text-[10px] px-4 py-2 rounded-full font-sans shadow-sm text-[#2D2A26]">
                    10x ZOOM
                  </div>
                </div>
              </div>
            </div>
          </div>

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

const AIConsultationModal = ({ onClose, onRecommend }) => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    const data = await callGeminiAPI(input);
    setIsAnalyzing(false);
    if (data) setResult(data);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9500] bg-[#FAF9F6]/60 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FAF9F6] w-full max-w-2xl rounded-[32px] shadow-xl overflow-hidden border border-[#2D2A26]/5"
      >
        <div className="p-8 border-b border-[#2D2A26]/5 flex justify-between items-center bg-[#F4F2ED]/50">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-[#2D2A26]" size={18} />
            <div>
              <h3 className="font-serif text-lg text-[#2D2A26]">
                AI Sleep Lab.
              </h3>
            </div>
          </div>
          <button onClick={onClose}>
            <X
              size={18}
              className="text-[#949188] hover:text-[#2D2A26] transition-colors"
            />
          </button>
        </div>
        <div className="p-12 md:p-12">
          {!result ? (
            <>
              <p className="text-base font-light text-[#949188] mb-8">
                당신의 수면 고민을 알려주세요.
              </p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-[#F4F2ED] p-4 outline-none mb-8 font-light rounded-xl text-sm"
                placeholder="예: 잠귀가 밝고 더위를 많이 타요."
              />
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !input.trim()}
                className="w-full py-4 bg-[#2D2A26] text-[#FAF9F6] font-sans text-xs tracking-widest rounded-full hover:bg-[#4A4742] transition-colors"
              >
                {isAnalyzing ? "ANALYZING..." : "START ANALYSIS"}
              </button>
            </>
          ) : (
            <div className="space-y-8">
              <h3 className="font-serif text-3xl text-[#2D2A26] italic">
                Recommended: {result.recommendedId}
              </h3>
              <div className="bg-[#F4F2ED] p-6 border-l-2 border-[#2D2A26] rounded-r-xl">
                <p className="text-sm font-light text-[#949188]">
                  {result.reason}
                </p>
              </div>
              <div className="bg-[#F4F2ED] p-6 border-l-2 border-[#949188] rounded-r-xl">
                <h4 className="font-sans text-[10px] text-[#949188] mb-2 font-bold tracking-widest">
                  SLEEP RITUAL
                </h4>
                <p className="text-sm font-light text-[#949188]">
                  {result.ritual}
                </p>
              </div>
              <button
                onClick={() => onRecommend(result.recommendedId)}
                className="w-full py-4 bg-[#2D2A26] text-[#FAF9F6] font-sans text-xs tracking-widest rounded-full hover:bg-[#4A4742] transition-colors"
              >
                VIEW PRODUCT
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- [SECTIONS] ---

const HorizontalGallery = ({ onProductClick }) => {
  const targetRef = useRef(null);
  const { setCursorState, setCursorText } = useContext(CursorContext);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useTransform(scrollVelocity, [-50, 50], [1, -1]);
  const springSkew = useSpring(skewVelocity, { stiffness: 200, damping: 50 });

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
                className="h-[60vh] w-full overflow-hidden bg-[#EAE8E4] relative shadow-lg transition-transform duration-700 rounded-[20px]"
              >
                <video
                  src={product.vid}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#FAF9F6]/0 group-hover:bg-[#FAF9F6]/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-[#FAF9F6]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex justify-between items-end">
                    <h3 className="font-serif italic text-3xl text-[#2D2A26]">
                      {product.name}
                    </h3>
                    <span className="font-sans text-xs text-[#949188]">
                      {product.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
          <div className="w-[30vw] flex-shrink-0 flex flex-col justify-center items-center text-center px-10">
            <TextReveal>
              <p className="text-5xl font-serif text-[#2D2A26] mb-8 italic font-light">
                "Fin."
              </p>
            </TextReveal>
            <div className="w-full h-[1px] bg-[#2D2A26]/20 max-w-[100px] mb-8" />
            <span className="font-sans text-[10px] tracking-widest mt-4 text-[#949188] hover:text-[#2D2A26] cursor-pointer transition-colors">
              VIEW ALL COLLECTION
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

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

const FabricCertification = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

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
              className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
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

const VisualEssay = ({ onOpenStory }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

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
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
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
                src="https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?q=80&w=1000&auto=format&fit=crop"
                alt="Texture Detail"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
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

const TheProcess = () => {
  return (
    <section className="py-32 bg-[#F4F2ED]/50 text-[#2D2A26] px-6 md:px-20 border-t border-[#FDFCF8]/10">
      <div className="mb-20 text-center">
        <TextReveal>
          <h2 className="text-3xl font-serif mb-4 font-light">The Process</h2>
        </TextReveal>
        <p className="font-sans text-[10px] text-[#949188] tracking-widest">
          FROM RAW TO REFINED
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {[
          {
            step: "01",
            title: "Selection",
            desc: "Selecting only the finest organic fibers from sustainable sources.",
            icon: Feather,
          },
          {
            step: "02",
            title: "Spinning",
            desc: "Applying micro-air technology to create breathable threads.",
            icon: Wind,
          },
          {
            step: "03",
            title: "Crafting",
            desc: "Hand-finished by master artisans for zero-friction seams.",
            icon: Scissors,
          },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-6 group">
            <div className="w-16 h-16 rounded-full border border-[#2D2A26]/10 flex items-center justify-center text-[#949188] group-hover:bg-[#FAF9F6] group-hover:text-[#2D2A26] group-hover:shadow-sm transition-all duration-500">
              <item.icon size={24} />
            </div>
            <TextReveal delay={i * 0.2}>
              <h3 className="font-serif text-xl mb-2 italic text-[#2D2A26]">
                {item.step}. {item.title}
              </h3>
              <p className="text-xs font-light text-[#949188] max-w-xs mx-auto leading-relaxed">
                {item.desc}
              </p>
            </TextReveal>
          </div>
        ))}
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section className="py-40 bg-[#FAF9F6] text-[#2D2A26] min-h-screen relative overflow-hidden flex items-center">
      <div className="max-w-[1920px] mx-auto px-6 md:px-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center">
          <div className="md:col-span-7">
            <TextReveal>
              <h2 className="text-5xl md:text-8xl font-serif leading-[0.95] mb-12 opacity-90 font-thin">
                Data Driven
                <br />
                <span className="text-[#949188] italic">Comfort.</span>
              </h2>
            </TextReveal>
          </div>
          <div className="md:col-span-5 space-y-16 border-l border-[#2D2A26]/5 pl-12">
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-serif text-[#2D2A26] font-light">
                  <AnimatedCounter value={0} />
                  .01
                </span>
                <span className="font-sans text-xs text-[#949188]">μm</span>
              </div>
              <p className="font-sans text-[10px] tracking-widest text-[#949188]">
                FIBER THICKNESS
              </p>
            </div>
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-serif text-[#2D2A26] font-light">
                  <AnimatedCounter value={36} />
                  .5
                </span>
                <span className="font-sans text-xs text-[#949188]">°C</span>
              </div>
              <p className="font-sans text-[10px] tracking-widest text-[#949188]">
                OPTIMAL TEMP
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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

const SleepJournal = () => {
  const { setCursorState, setCursorText } = useContext(CursorContext);

  const JournalImage = ({ src, alt }) => {
    return (
      <div className="relative overflow-hidden rounded-[16px] mb-6 aspect-[4/5] group bg-[#EAE8E4]">
        <div className="w-full h-full p-2 bg-white shadow-sm transition-transform duration-500 group-hover:-translate-y-2">
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-125 grayscale group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-40 bg-[#EAE8E4]/30 px-6 md:px-20 border-t border-[#2D2A26]/5">
      <div className="flex items-center gap-4 mb-16 pb-8">
        <BookOpen size={20} className="text-[#949188]" />
        <h2 className="text-3xl font-serif text-[#2D2A26] font-light">
          The Sleep Journal
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {JOURNAL_POSTS.map((post) => (
          <div
            key={post.id}
            className="group cursor-none"
            onMouseEnter={() => {
              setCursorState("view");
              setCursorText("READ");
            }}
            onMouseLeave={() => {
              setCursorState("default");
              setCursorText("");
            }}
          >
            <JournalImage src={post.img} alt={post.title} />
            <TextReveal>
              <span className="font-sans text-[10px] text-[#949188] mb-2 block tracking-widest group-hover:text-[#2D2A26] transition-colors duration-300">
                ISSUE 0{post.id}
              </span>
              <h3 className="text-xl font-serif italic text-[#2D2A26] mb-2 group-hover:text-[#949188] transition-colors duration-300 transform group-hover:translate-x-1">
                {post.title}
              </h3>
              <p className="text-xs font-light text-[#949188] leading-relaxed">
                {post.desc}
              </p>
            </TextReveal>
          </div>
        ))}
      </div>
    </section>
  );
};

const FabricCare = () => {
  return (
    <section className="py-24 bg-[#FAF9F6] px-6 md:px-20 border-t border-[#2D2A26]/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="max-w-md">
          <h3 className="font-serif text-2xl text-[#2D2A26] mb-4 font-light">
            Fabric Care Guide
          </h3>
          <p className="text-xs text-[#949188] leading-loose">
            우리의 잠옷은 섬세한 소재로 만들어졌습니다.
            <br />
            오랫동안 최상의 상태를 유지하기 위해 권장 세탁법을 따라주세요.
          </p>
        </div>
        <div className="flex gap-12">
          <div className="text-center">
            <Droplet className="mx-auto mb-2 text-[#949188]" size={20} />
            <span className="font-sans text-[10px] text-[#949188] tracking-widest">
              COLD WASH
            </span>
          </div>
          <div className="text-center">
            <Wind className="mx-auto mb-2 text-[#949188]" size={20} />
            <span className="font-sans text-[10px] text-[#949188] tracking-widest">
              AIR DRY
            </span>
          </div>
          <div className="text-center">
            <Sun className="mx-auto mb-2 text-[#949188]" size={20} />
            <span className="font-sans text-[10px] text-[#949188] tracking-widest">
              NO BLEACH
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- [APP ROOT] ---
export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [heroVideo, setHeroVideo] = useState(HERO_VIDEO);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. 화면의 스크롤을 X좌표 0, Y좌표 0 (가장 맨 위쪽 끝)으로 이동시킵니다.
    window.scrollTo(0, 0);
  }, []);

  const handleRecommend = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setIsAIModalOpen(false);
      setSelectedProduct(product);
    }
  };

  return (
    <CursorContext.Provider
      value={{
        cursorState: "default",
        setCursorState: () => {},
        cursorText: "",
        setCursorText: () => {},
      }}
    >
      <FontLoader />
      <div className="bg-[#FAF9F6] min-h-screen font-sans selection:bg-[#EAE8E4] selection:text-[#2D2A26] cursor-none">
        <Cursor />
        <AnimatePresence>
          {loading && <Intro onComplete={() => setLoading(false)} />}
          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
          {isAIModalOpen && (
            <AIConsultationModal
              onClose={() => setIsAIModalOpen(false)}
              onRecommend={handleRecommend}
            />
          )}
          {isStoryModalOpen && (
            <StoryModal onClose={() => setIsStoryModalOpen(false)} />
          )}
        </AnimatePresence>

        <div
          className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-1000`}
        >
          <SmartNav
            onMenuClick={() => {}}
            onAiClick={() => setIsAIModalOpen(true)}
          />
          <Hero videoUrl={heroVideo} onVideoUpdate={setHeroVideo} />
          <HorizontalGallery onProductClick={setSelectedProduct} />
          <MarqueeReviews />
          <FabricCertification />
          <VisualEssay onOpenStory={() => setIsStoryModalOpen(true)} />
          <TheProcess />
          <Philosophy />
          <MaterialLab />
          <SleepJournal />
          <FabricCare />
          <footer className="py-20 px-8 bg-[#FAF9F6] text-[#2D2A26] border-t border-[#2D2A26]/5">
            <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
              <h2 className="text-[18vw] leading-[0.8] font-serif tracking-tighter text-[#EAE8E4]">
                select.
              </h2>
              <div className="text-right font-sans text-[10px] space-y-4 text-[#949188] w-full md:w-auto tracking-widest">
                <div className="grid grid-cols-2 gap-12 text-left md:text-right">
                  <div className="space-y-2">
                    <p className="text-[#2D2A26] font-bold">EXPLORE</p>
                    <p className="hover:text-[#2D2A26] cursor-pointer">
                      Shop All
                    </p>
                    <p className="hover:text-[#2D2A26] cursor-pointer">
                      Our Story
                    </p>
                    <p className="hover:text-[#2D2A26] cursor-pointer">
                      Journal
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#2D2A26] font-bold">LEGAL</p>
                    <p className="hover:text-[#2D2A26] cursor-pointer">
                      Privacy
                    </p>
                    <p className="hover:text-[#2D2A26] cursor-pointer">Terms</p>
                  </div>
                </div>
                <p className="pt-8 opacity-50">
                  EST. 2026 SEOUL &copy; SELECT LAB RESEARCH.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </CursorContext.Provider>
  );
}
