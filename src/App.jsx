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
      {/* Animated background elements - responsive positioning */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating financial icons with responsive sizes */}
        <div className="absolute top-[5%] left-[5%] text-emerald-400/20 animate-bounce">
          <svg className="w-[8vw] h-[8vw] max-w-16 max-h-16 min-w-8 min-h-8" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
          </svg>
        </div>
        
        <div className="absolute top-[15%] right-[10%] text-blue-400/20 animate-pulse">
          <svg
            className="w-[10vw] h-[10vw] max-w-20 max-h-20 min-w-10 min-h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        
        <div className="absolute bottom-[15%] left-[10%] text-purple-400/20 animate-bounce delay-300">
          <svg
            className="w-[7vw] h-[7vw] max-w-14 max-h-14 min-w-8 min-h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        
        <div className="absolute bottom-[20%] right-[5%] text-emerald-400/20 animate-pulse delay-500">
          <svg className="w-[9vw] h-[9vw] max-w-18 max-h-18 min-w-10 min-h-10" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        {/* Responsive gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] max-w-80 max-h-80 min-w-40 min-h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] max-w-96 max-h-96 min-w-48 min-h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-[25vw] h-[25vw] max-w-64 max-h-64 min-w-32 min-h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Main content - responsive container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        {/* Header - responsive text sizes */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 w-full max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Currency Exchange
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-medium">
            Real-time currency conversion at your fingertips
          </p>
          <div className="flex items-center justify-center gap-2 mt-1 text-emerald-400/60">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-mono">Live Rates</span>
          </div>
        </div>
        
        {/* Exchange Form - responsive width */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
            className="space-y-4 md:space-y-6"
          >
            {/* Input boxes container - horizontal on md+ screens, vertical on smaller screens */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
              {/* From Currency */}
              <div className="transform hover:scale-[1.02] transition-all duration-300 w-full">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={optionsKeys}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectedCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              
              {/* Swap Button - positioned differently based on screen size */}
              <div className="flex justify-center md:block">
                <button
                  type="button"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white p-2 sm:p-2.5 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm group md:rotate-90"
                  onClick={swap}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              </div>
              
              {/* To Currency */}
              <div className="transform hover:scale-[1.02] transition-all duration-300 w-full">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={optionsKeys}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectedCurrency={to}
                  amountDisabled={true}
                />
              </div>
            </div>
            
            {/* Convert Button - responsive padding and text */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-white/20 backdrop-blur-sm"
            >
              <span className="text-sm sm:text-base">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </span>
            </button>
          </form>
          
          {/* Exchange rate info - responsive padding */}
          {options[to] && (
            <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-slate-400 text-xs mb-0.5 sm:mb-1">Current Exchange Rate</p>
                <p className="text-emerald-400 font-bold text-sm sm:text-base">
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