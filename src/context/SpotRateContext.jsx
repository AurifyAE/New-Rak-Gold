// SpotRateContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const SpotRateContext = createContext();

export const SpotRateProvider = ({ children }) => {
    const [goldData, setGoldData] = useState({ bid: null, ask: null, low: null, high: null });
    const [silverData, setSilverData] = useState({ bid: null, ask: null, low: null, high: null });

    const calculateValues = (bid = 0, bidSpread = 0, askSpread = 0, offset = 0, precision = 2) => {
        const bidValue = Number(bid) + Number(bidSpread);
        const askValue = bidValue + Number(askSpread) + Number(offset);
        return {
            bid: bidValue.toFixed(precision),
            ask: askValue.toFixed(precision),
        };
    };

    const updateMarketData = (marketData, goldBidSpread, goldAskSpread, silverBidSpread, silverAskSpread) => {
        if (marketData) {
            if (marketData.Gold && Number(marketData.Gold.bid) > 0) {
                const goldValues = calculateValues(marketData.Gold.bid, goldBidSpread, goldAskSpread, 0.5);
                setGoldData({
                    bid: goldValues?.bid,
                    ask: goldValues?.ask,
                    low: marketData.Gold?.low,
                    high: marketData.Gold?.high,
                });
            }

            if (marketData.Silver && Number(marketData.Silver.bid) > 0) {
                const silverValues = calculateValues(marketData.Silver.bid, silverBidSpread, silverAskSpread, 0.05, 3);
                setSilverData({
                    bid: silverValues?.bid,
                    ask: silverValues?.ask,
                    low: marketData.Silver?.low,
                    high: marketData.Silver?.high,
                });
            }
        }
    };

    return (
        <SpotRateContext.Provider value={{ goldData, silverData, updateMarketData }}>
            {children}
        </SpotRateContext.Provider>
    );
};

export const useSpotRate = () => useContext(SpotRateContext);
