import { AiOutlineThunderbolt } from "react-icons/ai";
import { FiBell, FiChevronDown, FiSearch } from "react-icons/fi";

export default function NavBar({ view, setView }) {
    return (
        <header className="bg-white/95 border-slate-200/80 sticky backdrop-blur-md flex w-full py-3 border-b items-center justify-between lg:px-50">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView("Dashboard")} className="bg-black rounded-xl py-2 px-2 flex w-fit items-center justify-center">
                        <AiOutlineThunderbolt className="text-sky-400 font-bold text-xl" />
                    </button>

                    <h1 className="relative text-lg font-bold tracking-tight">SwiftGig <small className="absolute text-xs text-slate-500 font-light border border-slate-400/50 py-0.4 inline-flex items-center px-1 rounded bottom-0 left-20">PARTNER</small></h1>
                </div>

                {/* Routes  */}
                <div className="flex items-center justify-center gap-4 ml-20">
                    <button onClick={() => setView("Dashboard")} className={`text-slate-950 tracking-tight ${ view === "Dashboard" ? "bg-slate-200/50 font-semibold" : ""} rounded-lg p-2 py-1.5 flex items-center justify-center transition-all duration-200`}>Dashboard</button>
                    <button onClick={() => setView("Gigs")} className={`text-slate-950 cursor-pointer tracking-tight ${ view === "Gigs" ? "bg-slate-200/50 font-semibold" : ""} rounded-lg p-2 py-1.5 flex items-center justify-center transition-all duration-200`}>Find Gigs</button>
                    <button onClick={() => setView("Tasks")} className={`text-slate-950 cursor-pointer tracking-tight ${ view === "Tasks" ? "bg-slate-200/50 font-semibold" : ""} rounded-lg p-2 py-1.5 flex items-center justify-center transition-all duration-200`}>My Tasks</button>
                    <button onClick={() => setView("Earnings")} className={`text-slate-950 cursor-pointer tracking-tight ${ view === "Earnings" ? "bg-slate-200/50 font-semibold" : ""} rounded-lg p-2 flex items-center justify-center transition-all duration-200`}>Earnings</button>
                    <button onClick={() => setView("Activity")} className={`text-slate-950 cursor-pointer tracking-tight ${ view === "Activity" ? "bg-slate-200/50 font-semibold" : ""} rounded-lg p-2 flex items-center justify-center transition-all duration-200`}>Activity</button>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <button className="bg-black text-white rounded-xl p-2 flex items-center justify-center gap-1.5 text-base"><FiSearch className="text-sky-400" /> Find a Gig</button>
                    <button className="flex relative items-center justify-center rounded-xl hover:bg-slate-200 h-10 w-10 transition-all cursor-pointer"><FiBell size={20} /><span className="h-2.5 w-2.5 rounded-full bg-sky-400 border-2 border-white absolute top-2 right-2 duration-200" /></button>

                    <div className="flex items-center gap-3 border hover:bg-slate-200/50 cursor-pointer border-slate-200/80 p-1 rounded-xl">
                        <span className="relative">
                            <img src="image.png" alt="avatar" className="h-10 w-10 rounded-xl border border-slate-200/80" />
                            <span className="absolute bg-green-500 h-3 w-3 rounded-full border-2 border-white -right-1 -bottom-1"/>
                        </span>
                        <p className="text-slate-600 font-semibold tracking-tight text-sm">Alex Morgan</p>
                        <FiChevronDown className="text-slate-500"/>
                    </div>
                </div>
            </div>
        </header>
    );
}