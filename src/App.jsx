import { useState } from "react";
import useCurrencyInfo from "./assets/Hooks/useCurrencyInfo";
import InputBox from "./assets/Components/InputBox";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [to, setTo] = useState("usd");
  const [from, setFrom] = useState("pkr");

  const currencyInfo = useCurrencyInfo({ base: from });
  const options = currencyInfo.rates;
  const optionsKeys = Object.keys(options);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount((amount * options[to]).toFixed(4));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating financial icons */}
        <div className="absolute top-20 left-10 text-emerald-400/20 animate-bounce">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-20 text-blue-400/20 animate-pulse">
          <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 left-20 text-purple-400/20 animate-bounce delay-300">
          <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        
        <div className="absolute bottom-40 right-10 text-emerald-400/20 animate-pulse delay-500">
          <svg className="w-18 h-18" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Currency Exchange
          </h1>
          <p className="text-slate-400 text-base font-medium">
            Real-time currency conversion at your fingertips
          </p>
          <div className="flex items-center justify-center gap-2 mt-1 text-emerald-400/60">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono">Live Rates</span>
          </div>
        </div>
        
        {/* Exchange Form */}
        <div className="w-full max-w-md mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
            className="space-y-4"
          >
            {/* From Currency */}
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={optionsKeys}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectedCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            
            {/* Swap Button */}
            <div className="relative flex justify-center py-2">
              <button
                type="button"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white p-2.5 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm group"
                onClick={swap}
              >
                <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>
            
            {/* To Currency */}
            <div className="transform hover:scale-[1.02] transition-all duration-300">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={optionsKeys}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled={true}
              />
            </div>
            
            {/* Convert Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
              <span className="text-base">Convert {from.toUpperCase()} to {to.toUpperCase()}</span>
            </button>
          </form>
          
          {/* Exchange rate info */}
          {options[to] && (
            <div className="mt-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-slate-400 text-xs mb-1">Current Exchange Rate</p>
                <p className="text-emerald-400 font-bold text-base">
                  1 {from.toUpperCase()} = {options[to].toFixed(4)} {to.toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;