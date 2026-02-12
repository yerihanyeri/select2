import React from "react";
import { Droplet, Wind, Sun } from "lucide-react";

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

export default FabricCare;
