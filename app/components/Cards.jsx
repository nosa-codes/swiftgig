"use client";

import { AiOutlineCodeSandbox, AiOutlineWallet } from "react-icons/ai";
import { FiArrowUpRight, FiCheckCircle, FiStar } from "react-icons/fi";

const icons = {
  wallet: <AiOutlineWallet className="text-sky-600" />,
  check: <FiCheckCircle className="text-slate-900" />,
  sandbox: <AiOutlineCodeSandbox className="text-slate-900" />,
  star: <FiStar className="text-amber-500 fill-amber-400" />,
};

export default function Cards({ name, value, short_txt, link, star, icon, icon_bg, onClick }) {
  const isLinked = Boolean(link);
  const Wrapper = isLinked && onClick ? "button" : "div";

  return (
    <Wrapper
      type={isLinked && onClick ? "button" : undefined}
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-xl border border-slate-200/80 w-full bg-white/95 group text-left transition-all duration-200 shadow-xs ${
        isLinked && onClick
          ? "cursor-pointer hover:border-slate-300 hover:shadow-sm"
          : "cursor-default"
      }`}
    >
      <div className="items-center flex justify-between gap-2">
        <p className="text-slate-500 tracking-tight text-xs sm:text-sm">{name}</p>
        <span
          className={`h-8 w-8 shrink-0 ${icon_bg} transition-all duration-200 rounded-xl flex items-center justify-center`}
        >
          {icons[icon]}
        </span>
      </div>

      <div className="text-2xl sm:text-3xl font-bold py-2.5 border-b border-slate-200/80 flex items-center gap-1.5">
        {value}
        {star ? (
          <FiStar
            className="fill-amber-400 text-amber-400 text-sm self-center"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <div className="pt-1.5 flex items-center justify-between gap-2">
        <p className="text-xs text-slate-400">{short_txt}</p>
        {isLinked ? (
          <FiArrowUpRight
            className="text-xs shrink-0 group-hover:text-slate-500 text-slate-300 transition-all duration-200"
            aria-hidden="true"
          />
        ) : null}
      </div>
    </Wrapper>
  );
}
