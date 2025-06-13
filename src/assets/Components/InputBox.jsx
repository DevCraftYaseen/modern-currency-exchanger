import { useId, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  
  // Update dropdown position when button position changes or when dropdown opens
  useEffect(() => {
    if (buttonRef.current && isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(true);
    }
  };
  
  return (
    <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-400/30 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 rounded-xl sm:rounded-2xl animate-pulse"></div>
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/5 rounded-xl sm:rounded-2xl backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        {/* Header with icons */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <label
            htmlFor={inputId}
            className="text-emerald-400 text-xs font-bold tracking-wider uppercase flex items-center gap-1 sm:gap-2"
          >
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
            {label}
          </label>
          <div className="flex items-center gap-1 text-emerald-400/60">
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-[10px] sm:text-xs font-mono">LIVE</span>
          </div>
        </div>
        
        {/* Input fields - responsive grid for mobile */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3">
          {/* Amount input */}
          <div className="xs:col-span-2 space-y-0.5 sm:space-y-1">
            <label className="text-slate-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-80">
              Amount
            </label>
            <input
              id={inputId}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 sm:py-2.5 text-white text-sm sm:text-base font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200 backdrop-blur-sm hover:bg-slate-700/70"
              type="number"
              placeholder="0.00"
              disabled={amountDisabled}
              value={amount}
              onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
            />
          </div>
          
          {/* Custom Currency Dropdown */}
          <div className="space-y-0.5 sm:space-y-1">
            <label className="text-slate-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-80">
              Currency
            </label>
            <div className="relative">
              {/* Custom dropdown button */}
              <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className="w-full bg-gradient-to-r from-slate-700/70 to-slate-600/70 border border-slate-500/50 rounded-lg sm:rounded-xl px-1.5 sm:px-2 py-2 sm:py-2.5 text-white text-xs sm:text-sm font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200 hover:from-slate-600/70 hover:to-slate-500/70 backdrop-blur-sm flex justify-between items-center"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <span>{selectedCurrency.toUpperCase()}</span>
                <svg 
                  className={`w-4 h-4 fill-current text-emerald-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              
              {/* Hidden native select for form submission */}
              <select 
                className="sr-only" 
                value={selectedCurrency}
                onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                tabIndex="-1"
              >
                {currencyOptions.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="mt-2 sm:mt-3 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
      </div>
      
      {/* Portal for dropdown to ensure it's above everything */}
      {isOpen && typeof document !== 'undefined' && ReactDOM.createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto z-[9999]"
          role="listbox"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          {currencyOptions.map((currency) => (
            <div
              key={currency}
              className={`px-3 py-2 text-xs sm:text-sm cursor-pointer hover:bg-slate-700 ${
                currency === selectedCurrency ? 'bg-slate-700 text-emerald-400' : 'text-white'
              }`}
              onClick={() => {
                onCurrencyChange && onCurrencyChange(currency);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={currency === selectedCurrency}
            >
              {currency.toUpperCase()}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export default InputBox;