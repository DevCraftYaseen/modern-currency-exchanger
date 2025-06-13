import { useState, useId } from "react";

const InputBox = ({
  label,
  currencyOptions = [],
  selectedCurrency = "usd",
  onCurrencyChange,
  amount,
  onAmountChange,
  amountDisabled = false,
}) => {
  const inputId = useId();
  
  return (
    <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-4 rounded-2xl border border-emerald-400/30 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-2xl animate-pulse"></div>
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        {/* Header with icons */}
        <div className="flex items-center justify-between mb-3">
          <label htmlFor={inputId} className="text-emerald-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            {label}
          </label>
          <div className="flex items-center gap-1 text-emerald-400/60">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs font-mono">LIVE</span>
          </div>
        </div>
        
        {/* Input fields */}
        <div className="grid grid-cols-3 gap-3">
          {/* Amount input */}
          <div className="col-span-2 space-y-1">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider opacity-80">
              Amount
            </label>
            <input
              id={inputId}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2.5 text-white text-base font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200 backdrop-blur-sm hover:bg-slate-700/70"
              type="number"
              placeholder="0.00"
              disabled={amountDisabled}
              value={amount}
              onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
            />
          </div>
          
          {/* Currency selector */}
          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider opacity-80">
              Currency
            </label>
            <select
              className="w-full bg-gradient-to-r from-slate-700/70 to-slate-600/70 border border-slate-500/50 rounded-xl px-2 py-2.5 text-white text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200 hover:from-slate-600/70 hover:to-slate-500/70 backdrop-blur-sm"
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            >
              {currencyOptions.map((currency) => (
                <option key={currency} value={currency} className="bg-slate-800 text-white font-semibold">
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default InputBox;