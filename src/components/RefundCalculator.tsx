import React, { useState } from 'react';
import { calculateRefundBet, RefundResult } from '../services/maths';
import { ShieldCheck, Info, Calculator } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAd } from '../contexts/AdContext';

export const RefundCalculator: React.FC = () => {
    const [stake, setStake] = useState<string>('20');
    const [backOdd, setBackOdd] = useState<string>('');
    const [layOdd, setLayOdd] = useState<string>('');
    const [result, setResult] = useState<RefundResult | null>(null);
    const { trackCalculation } = useAd();

    const handleCalculate = () => {
        const s = parseFloat(stake);
        const b = parseFloat(backOdd);
        const l = parseFloat(layOdd);

        if (s > 0 && b > 1 && l > 1) {
            setResult(calculateRefundBet(s, b, l));
        } else {
            setResult(null);
        }
        trackCalculation();
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-xl">
            <Helmet>
                <title>Calculateur Pari Remboursé si Perdant | BetCalc France</title>
                <meta name="description" content="Sécurisez vos offres de bienvenue et paris remboursés en calculant la mise inverse parfaite." />
            </Helmet>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">Remboursé si Perdant</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Sécurisation de bonus (Freebet)</p>
                </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-200">
                    Ce calculateur suppose un remboursement en <strong>Freebet</strong> (valeur réelle ~80%) si le pari est perdant. Il égalise le profit/perte dans les deux cas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-500">Mise Reale (€)</label>
                    <input
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="20"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-500">Cote Back</label>
                    <input
                        type="number"
                        value={backOdd}
                        onChange={(e) => setBackOdd(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="ex: 2.00"
                        step="0.01"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-500">Cote Lay</label>
                    <input
                        type="number"
                        value={layOdd}
                        onChange={(e) => setLayOdd(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="ex: 2.10"
                        step="0.01"
                    />
                </div>
            </div>

            <button
                onClick={handleCalculate}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg shadow-blue-900/30 mb-8"
            >
                <Calculator className="w-4 h-4" />
                Calculer
            </button>

            {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded border border-slate-200 dark:border-slate-700/50">
                        <span className="text-xs text-slate-600 dark:text-slate-500 block mb-1">Mise Lay à placer</span>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">{result.layStake.toFixed(2)} €</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">Responsabilité: {(result.layStake * (parseFloat(layOdd) - 1)).toFixed(2)} €</span>
                    </div>

                    <div className={`bg-slate-50 dark:bg-slate-900/50 p-4 rounded border ${result.profit >= 0 ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                        <span className="text-xs text-slate-600 dark:text-slate-500 block mb-1">Profit/Perte Final</span>
                        <span className={`text-2xl font-bold ${result.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {result.profit > 0 ? '+' : ''}{result.profit.toFixed(2)} €
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">Sécurisé quel que soit le résultat</span>
                    </div>
                </div>
            )}
        </div>
    );
};
