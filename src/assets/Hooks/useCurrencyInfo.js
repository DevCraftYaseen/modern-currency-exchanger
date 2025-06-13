import { useState, useEffect } from 'react';

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1';
const FALLBACK_BASE = 'https://latest.currency-api.pages.dev/v1';

function useCurrencyInfo({ base = 'usd' } = {}) {
    console.log(base);
  const [data, setData] = useState({ rates: {}});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRates() {
      const endpoint = `currencies/${base.toLowerCase()}.json`;
      const url = `${CDN_BASE}/${endpoint}`;
      const fallback = `${FALLBACK_BASE}/${endpoint}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('CDN failed, switching to fallback');
        const json = await res.json();
        setData({ rates: json[base.toLowerCase()] });
      } catch (cdnError) {
        try {
          const res2 = await fetch(fallback);
          if (!res2.ok) throw new Error('Fallback fetch failed');
          const json2 = await res2.json();
          setData({ rates: json2[base.toLowerCase()] });
        } catch (fallbackError) {
          setError(fallbackError);
        }
      }
    }

    fetchRates();
  }, [base]);

  return {rates: data.rates, error };
}

export default useCurrencyInfo;
