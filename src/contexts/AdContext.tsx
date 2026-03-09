import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AdContextType {
    trackCalculation: () => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

const COUNTER_KEY = 'betcalc_calc_count';

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showAd, setShowAd] = useState(false);

    const trackCalculation = useCallback(() => {
        const current = parseInt(localStorage.getItem(COUNTER_KEY) || '0', 10);
        const next = current + 1;
        localStorage.setItem(COUNTER_KEY, String(next));
        if (next % 5 === 0) {
            setShowAd(true);
        }
    }, []);

    return (
        <AdContext.Provider value={{ trackCalculation }}>
            {children}
            {showAd && <AdModalInternal onClose={() => setShowAd(false)} />}
        </AdContext.Provider>
    );
};

import { AdUnit } from '../components/AdUnit';

// Internal modal rendered inside the provider
const AdModalInternal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    // Basic effect to block body scroll when ad modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Publicité</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg text-sm font-medium transition-colors"
                        aria-label="Fermer la publicité"
                    >
                        Fermer <span className="font-bold text-slate-500 dark:text-slate-400">✕</span>
                    </button>
                </div>

                {/* Ad slot */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                    {/* Centered AdUnit container */}
                    <div className="w-full h-[250px] flex items-center justify-center">
                        <AdUnit
                            adSlot="MODAL_SLOT_ID"
                            adFormat="rectangle"
                            className="w-[300px] h-[250px]"
                            style={{ minWidth: 300, minHeight: 250 }}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-5 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-600">
                        La publicité nous permet de garder BetCalc France gratuit.
                    </p>
                    <button
                        onClick={onClose}
                        className="mt-3 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                        Continuer vers les calculateurs →
                    </button>
                </div>
            </div>
        </div>
    );
};

export const useAd = () => {
    const context = useContext(AdContext);
    if (context === undefined) {
        throw new Error('useAd must be used within an AdProvider');
    }
    return context;
};
