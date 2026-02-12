import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { InteractiveText } from "../components/ui/Animations";

const Hero = ({ videoUrl }) => {
  // 마우스 위치를 추적하기 위한 도구입니다.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 마우스가 움직일 때마다 위치 값을 계산해서 업데이트합니다.
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set((clientX - centerX) * 0.05);
    mouseY.set((clientY - centerY) * 0.05);
  };

  // 배경의 빛이 마우스를 부드럽게 따라다니도록 탄성과 저항을 설정합니다.
  const lightX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const lightY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  // 마우스 위치에 따라 배경에 은은한 빛(그라데이션 효과)을 그려주는 기능입니다.
  const background = useMotionTemplate`radial-gradient(circle at ${lightX}px ${lightY}px, rgba(253, 252, 248, 0.15) 0%, rgba(62, 60, 56, 0) 50%)`;

  return (
    <section
      className="relative h-screen bg-[#3E3C38] overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{ scale: 1.05 }}
        className="absolute inset-0 z-0 opacity-80"
      >
        {/* 이곳에 전달받은 영상 주소가 고정으로 들어갑니다. */}
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light"
        style={{ background: background }}
      />

      {/* 기존에 있던 업로드 버튼 관련 코드들은 모두 삭제되었습니다. */}

      <div className="relative z-20 text-center mix-blend-screen flex flex-col items-center">
        <InteractiveText text="select." subText="SCIENTIFIC COMFORT" />
      </div>
    </section>
  );
};

export default Hero;
