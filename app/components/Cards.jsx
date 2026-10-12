import { useState } from "react";
import { AiOutlineWallet } from "react-icons/ai";
import { FiArrowUpRight, FiStar } from "react-icons/fi";

export default function Cards({ name, value, short_txt, link, star, icon, icon_bg  }) {
    const linked = link;
    const stared = star;
    return (
        <div className="p-5 rounded-xl border border-slate-200/80 cursor-pointer w-full bg-white/95 group hover:border-slate-300 shadow-xs transition-all duration-200">
            <div className="items-center flex justify-between">
                <p className="text-slate-500 tracking-tight text-sm">{name}</p>
                <span className={`h-8 w-8 ${icon_bg} transition-all duration-200 rounded-xl flex items-center justify-center`}>{icon}</span>
            </div>

            <div className="text-3xl font-bold py-2.5 border-b border-slate-200/80 relative">{value} { stared === true ? <span className="absolute bottom-4 right-41"><FiStar className="fill-slate-300 text-slate-300 text-xs"/></span> : "" }</div>
            <div className="py-1.5 flex items-center justify-between">
                <p className="text-xs text-slate-400">{short_txt}</p>
                { linked === true ? <FiArrowUpRight className="text-xs group-hover:text-slate-500 text-slate-300 transition-all duration-200"/> : "" }
            </div>
        </div>
    );
}