import React, { useState } from 'react';
import { calculateBoostDutching, DutchingResult } from '../services/maths';
import { Zap, AlertOctagon, Calculator } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAd } from '../contexts/AdContext';

export const BoostCalculator: React.FC = () => {
    const [stake, setStake] = useState<string>('50');
    const [odd1, setOdd1] = useState<string>('');
    const [odd2, setOdd2] = useState<string>('');
    const [odd3, setOdd3] = useState<string>('');
    const [result, setResult] = useState<DutchingResult | null>(null);
    const { trackCalculation } = useAd();

    const handleCalculate = () => {
        const s = parseFloat(stake);
        const o1 = parseFloat(odd1);
        const o2 = parseFloat(odd2);
        const o3 = parseFloat(odd3);

        if (s > 0 && o1 > 1 && o2 > 1 && o3 > 1) {
            setResult(calculateBoostDutching(o1, o2, o3, s));
        } else {
            setResult(null);
        }
        trackCalculation();
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-xl">
            <Helmet>
                <title>Calculateur de Cotes Boostées & Dutching | BetCalc France</title>
                <meta name="description" content="Répartissez vos mises sur 3 issues pour sécuriser des gains grâce aux cotes boostées des bookmakers." />
            </Helmet>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                    <Zap className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Calculateur Boost / Dutching</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Répartition sur 3 issues</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-2 col-span-2 md:col-span-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-500">Mise Totale</label>
                    <input
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="50"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-500">Cote 1</label>
                    <input type="number" value={odd1} onChange={(e) => setOdd1(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCalculate()} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Ex: 2.50" step="0.01" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-500">Cote 2</label>
                    <input type="number" value={odd2} onChange={(e) => setOdd2(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCalculate()} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Ex: 3.20" step="0.01" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-500">Cote 3</label>
                    <input type="number" value={odd3} onChange={(e) => setOdd3(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCalculate()} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none" placeholder="Ex: 2.90" step="0.01" />
                </div>
            </div>

            <button
                onClick={handleCalculate}
                className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-orange-900/30 mb-8"
            >
                <Calculator className="w-4 h-4" />
                Calculer le Dutching
            </button>

            {result && (
                <div className="space-y-4">
                    {result.totalProfit > 10 && (
                        <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-4 flex items-center gap-3 animate-pulse">
                            <AlertOctagon className="text-yellow-500 w-6 h-6" />
                            <div>
                                <h4 className="font-bold text-yellow-400">Gros Gain Détecté !</h4>
                                <p className="text-xs text-yellow-200/70">Ce dutching offre un rendement exceptionnel.</p>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded border border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Mise {i + 1}</span>
                                <span className="font-mono font-bold text-slate-900 dark:text-white">{result.stakes[i].toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>

                    <div className={`p-4 rounded-lg flex justify-between items-center border ${result.isProfitable ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Profit Total</span>
                        <span className={`text-xl font-bold ${result.isProfitable ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {result.isProfitable ? '+' : ''}{result.totalProfit.toFixed(2)} €
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
