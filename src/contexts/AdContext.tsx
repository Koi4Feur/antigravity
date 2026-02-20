import React, { createContext, useContext, useState, useCallback } from 'react';

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

// Internal modal rendered inside the provider
const AdModalInternal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Publicité</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors"
                        aria-label="Fermer la publicité"
                    >
                        Fermer <span className="font-bold text-slate-400">✕</span>
                    </button>
                </div>

                {/* Ad slot */}
                <div className="p-6">
                    <div className="w-full h-64 bg-slate-800 border border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center gap-3 text-slate-500">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Espace Publicitaire</span>
                        <span className="text-xs text-slate-600 text-center max-w-[200px]">
                            Votre annonce ici — Google AdSense ou partenaire direct
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-5 text-center">
                    <p className="text-xs text-slate-600">
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
