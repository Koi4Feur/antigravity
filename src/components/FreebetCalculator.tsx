import React, { useState } from 'react';
import { calculateFreebet, FreebetResult } from '../services/maths';
import { Gift, TrendingUp, Calculator } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAd } from '../contexts/AdContext';

export const FreebetCalculator: React.FC = () => {
    const [amount, setAmount] = useState<string>('10');
    const [backOdd, setBackOdd] = useState<string>('');
    const [layOdd, setLayOdd] = useState<string>('');
    const [result, setResult] = useState<FreebetResult | null>(null);
    const { trackCalculation } = useAd();

    const handleCalculate = () => {
        const a = parseFloat(amount);
        const b = parseFloat(backOdd);
        const l = parseFloat(layOdd);

        if (a > 0 && b > 1 && l > 1) {
            setResult(calculateFreebet(a, b, l));
        } else {
            setResult(null);
        }
        trackCalculation();
    };

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl">
            <Helmet>
                <title>Optimiseur de Freebet & Paris Gratuits | BetCalc France</title>
                <meta name="description" content="Convertissez vos freebets en cash. Calculez la couverture idéale entre bookmaker et exchange pour maximiser votre rétention." />
            </Helmet>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                    <Gift className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">Optimiseur Freebet</h1>
                    <p className="text-slate-400 text-sm">Conversion Matched Betting</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Montant Freebet</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="10"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cote Back (Book)</label>
                    <input
                        type="number"
                        value={backOdd}
                        onChange={(e) => setBackOdd(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="ex: 4.00"
                        step="0.01"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cote Lay (Exchange)</label>
                    <input
                        type="number"
                        value={layOdd}
                        onChange={(e) => setLayOdd(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="ex: 4.10"
                        step="0.01"
                    />
                </div>
            </div>

            <button
                onClick={handleCalculate}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-purple-900/30 mb-8"
            >
                <Calculator className="w-4 h-4" />
                Optimiser
            </button>

            {result && (
                <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${result.retentionPercent >= 70 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="text-slate-400 text-sm block">Taux de rétention</span>
                                <span className={`text-xl font-bold ${result.retentionPercent >= 70 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                    {result.retentionPercent.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-slate-400 text-sm block">Profit Net Garanti</span>
                            <span className="text-2xl font-bold text-white">{result.profit.toFixed(2)} €</span>
                        </div>
                    </div>

                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${result.retentionPercent >= 70 ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                            style={{ width: `${Math.min(result.retentionPercent, 100)}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-500 mt-2 text-right">Objectif &gt; 70%</p>
                </div>
            )}
        </div>
    );
};
