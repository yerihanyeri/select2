import React, { useContext } from "react";
import { BookOpen } from "lucide-react";
import { CursorContext } from "../context/CursorContext";
import { JOURNAL_POSTS } from "../data/constants";
import { TextReveal } from "../components/ui/Animations";

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
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0"
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
              <h3 className="text-xl font-serif italic text-[#2D2A26] mb-2 group-hover:text-[#949188] transition-colors duration-300">
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
export default SleepJournal;
