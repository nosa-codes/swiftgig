"use client";

import { FiArrowDownLeft, FiCreditCard } from "react-icons/fi";
import { useApp } from "./AppContext";
import { formatNaira, transactions, user } from "../lib/data";

export default function Earnings() {
  const { simulateWithdraw, setView } = useApp();
  const total = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white/95 border border-slate-200/80 rounded-xl shadow-xs p-5">
          <p className="text-sm text-slate-500">Available balance</p>
          <p className="text-3xl sm:text-4xl font-bold mt-1 tracking-tight">
            {formatNaira(145000)}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Ready for instant payout · sample figures
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={simulateWithdraw}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Withdraw (simulated)
            </button>
            <button
              type="button"
              onClick={() => setView("Tasks")}
              className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              View active gigs
            </button>
          </div>
        </div>

        <div className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs p-5 flex flex-col justify-between">
          <div>
            <p className="text-sm text-slate-500">Total earned</p>
            <p className="text-2xl font-bold mt-1">{formatNaira(total)}</p>
            <p className="text-xs text-slate-400 mt-1">
              Across {transactions.length} completed payouts
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center gap-2.5">
            <span className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <FiCreditCard className="text-slate-600" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-slate-500">Payout account</p>
              <p className="text-sm font-semibold">{user.payoutAccount}</p>
            </div>
          </div>
        </div>
      </div>

      <section
        aria-label="Transaction history"
        className="bg-white/95 border border-slate-200/80 rounded-xl shadow-xs overflow-hidden"
      >
        <div className="px-4 sm:px-5 py-4 border-b border-slate-200/80">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Transaction History</h2>
          <p className="text-sm text-slate-500">
            Sample payouts — not real financial records
          </p>
        </div>
        <ul className="divide-y divide-slate-200/80">
          {transactions.map((txn) => (
            <li
              key={txn.id}
              className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <FiArrowDownLeft className="text-green-600" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{txn.title}</p>
                  <p className="text-xs text-slate-400">
                    {txn.client} · {txn.date}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-green-600">+{formatNaira(txn.amount)}</p>
                <p className="text-[11px] text-slate-400">{txn.status}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
