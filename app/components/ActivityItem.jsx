import { FiArrowDownLeft, FiCheckCircle, FiClock, FiZap } from "react-icons/fi";
import { FaWallet } from "react-icons/fa6";
import { formatNaira } from "../lib/data";

const iconMap = {
  check: <FiCheckCircle className="text-green-600" />,
  zap: <FiZap className="text-purple-500" />,
  payment: <FaWallet className="text-sky-500" />,
  clock: <FiClock className="text-amber-500" />,
};

const toneStyles = {
  completed: "border-green-600/40 bg-green-50 text-green-700",
  paid: "border-sky-600/40 bg-sky-50 text-sky-700",
  match: "border-purple-600/40 bg-purple-50 text-purple-700",
  pending: "border-amber-600/40 bg-amber-50 text-amber-700",
  review: "border-indigo-600/40 bg-indigo-50 text-indigo-700",
};

const iconBg = {
  completed: "bg-green-100",
  paid: "bg-sky-100",
  match: "bg-purple-100",
  pending: "bg-amber-100",
  review: "bg-indigo-100",
};

export default function ActivityItem({ entry }) {
  const { title, desc, timestamp, author, status, tone, icon, amount } = entry;

  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-4 px-2 sm:px-4 rounded-xl hover:bg-slate-50 transition-colors">
      <div className="flex gap-3.5 min-w-0 flex-1">
        <span
          className={`h-9 w-9 shrink-0 flex items-center justify-center rounded-lg ${
            iconBg[tone] ?? "bg-slate-100"
          }`}
        >
          {iconMap[icon] ?? iconMap.clock}
        </span>

        <div className="min-w-0">
          <p className="font-bold text-sm sm:text-base tracking-tight">{title}</p>
          <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mt-1.5">
            <span>{timestamp}</span>
            <span aria-hidden="true">·</span>
            <span>{author}</span>
            <span
              className={`inline-flex items-center border px-2 py-0.5 rounded-full ${
                toneStyles[tone] ?? toneStyles.pending
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>

      {amount != null ? (
        <p className="text-green-600 font-bold sm:text-lg pl-12 sm:pl-0 shrink-0">
          +{formatNaira(amount)}
        </p>
      ) : null}
    </li>
  );
}
