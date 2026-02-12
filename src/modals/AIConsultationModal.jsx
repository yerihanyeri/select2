import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, X } from "lucide-react";
import { callGeminiAPI } from "../utils/api";

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
        {/* ... 내부 내용은 이전 코드와 동일 ... */}
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
            // ... 결과 표시 부분 ...
            <div className="space-y-8">
              <h3 className="font-serif text-3xl text-[#2D2A26] italic">
                Recommended: {result.recommendedId}
              </h3>
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
export default AIConsultationModal;
