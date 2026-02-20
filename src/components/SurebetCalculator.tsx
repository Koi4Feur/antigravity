import React, { useState } from 'react';
import { calculateSurebet, SurebetResult } from '../services/maths';
import { CircleDollarSign, AlertTriangle, CheckCircle2, Calculator } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAd } from '../contexts/AdContext';

export const SurebetCalculator: React.FC = () => {
    const [odd1, setOdd1] = useState<string>('');
    const [odd2, setOdd2] = useState<string>('');
    const [stake, setStake] = useState<string>('100');
    const [result, setResult] = useState<SurebetResult | null>(null);
    const { trackCalculation } = useAd();

    const handleCalculate = () => {
        const o1 = parseFloat(odd1);
        const o2 = parseFloat(odd2);
        const s = parseFloat(stake);

        if (o1 > 1 && o2 > 1 && s > 0) {
            setResult(calculateSurebet(o1, o2, s));
        } else {
            setResult(null);
        }
        trackCalculation();
    };

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-xl">
            <Helmet>
                <title>Calculateur de Surebet & Arbitrage | BetCalc France</title>
                <meta name="description" content="Détectez instantanément les surebets et calculez la répartition de vos mises pour un profit garanti sur les paris sportifs." />
            </Helmet>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <CircleDollarSign className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white">Calculateur Surebet</h1>
                    <p className="text-slate-400 text-sm">Arbitrage 2 issues</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cote 1</label>
                    <input
                        type="number"
                        value={odd1}
                        onChange={(e) => setOdd1(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        placeholder="Ex: 1.80"
                        step="0.01"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cote 2</label>
                    <input
                        type="number"
                        value={odd2}
                        onChange={(e) => setOdd2(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        placeholder="Ex: 2.30"
                        step="0.01"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mise Totale (€)</label>
                    <input
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        placeholder="100"
                    />
                </div>
            </div>

            <button
                onClick={handleCalculate}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-emerald-900/30 mb-8"
            >
                <Calculator className="w-4 h-4" />
                Calculer
            </button>

            {result && (
                <div className={`rounded-lg p-6 animate-in fade-in slide-in-from-bottom-2 duration-300 ${result.isArb ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'
                    }`}>
                    <div className="flex items-center justify-between mb-4 border-b border-dashed border-slate-600/30 pb-4">
                        <div className="flex items-center gap-2">
                            {result.isArb ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            )}
                            <span className={`font-bold ${result.isArb ? 'text-emerald-400' : 'text-red-400'}`}>
                                {result.isArb ? 'Opportunité Détectée !' : 'Pas de Surebet'}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-sm text-slate-400 block">Profit estimé</span>
                            <span className={`text-xl font-bold ${result.isArb ? 'text-emerald-400' : 'text-red-400'}`}>
                                {result.profitPercent.toFixed(2)}%
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                            <span className="text-xs text-slate-500 block mb-1">Mise sur Cote 1</span>
                            <span className="font-mono text-lg font-bold">{result.stake1.toFixed(2)} €</span>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50">
                            <span className="text-xs text-slate-500 block mb-1">Mise sur Cote 2</span>
                            <span className="font-mono text-lg font-bold">{result.stake2.toFixed(2)} €</span>
                        </div>
                    </div>

                    <div className="mt-4 text-center">
                        <span className="text-sm text-slate-400">Gain Total : </span>
                        <span className={`font-bold ${result.totalProfit > 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                            {result.totalProfit > 0 ? '+' : ''}{result.totalProfit.toFixed(2)} €
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
