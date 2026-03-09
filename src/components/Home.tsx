import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Gift, ShieldCheck, TrendingUp, ArrowRight, LineChart, PieChart, Bot, Layers, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { AdUnit } from './AdUnit';

export const Home: React.FC = () => {
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <Helmet>
                <title>BetCalc France | Outils de Paris Sportifs Professionnels</title>
                <meta name="description" content="Suite complète de calculateurs pour parieurs : Surebet, Freebet, Dutching et sécurisation de bonus." />
            </Helmet>

            {/* Hero Section */}
            <section className="text-center py-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
                    </span>
                    Version 1.0 Disponible
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                    L'outil ultime des <br className="hidden md:block" />
                    <span className="text-emerald-600 dark:text-emerald-500">parieurs professionnels</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                    Optimisez vos gains grâce à nos calculateurs mathématiques de précision.
                    Surebets, conversion de Freebets et sécurisation de bonus en un clin d'œil.
                </p>
            </section>

            {/* Top Banner Ad */}
            <section className="w-full">
                <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-sm">
                    <AdUnit
                        adSlot="HOME_BANNER_SLOT_ID"
                        adFormat="horizontal"
                        className="w-full h-[90px] min-h-[90px]"
                        style={{ minHeight: 90 }}
                    />
                </div>
            </section>

            {/* Calculators Grid */}
            <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />
                    Calculateurs Disponibles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/surebet" className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl hover:border-emerald-500/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                <Scale className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Calculateur Surebet</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Détectez les opportunités d'arbitrage à 2 issues.</p>
                    </Link>

                    <Link to="/freebet" className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl hover:border-purple-500/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                                <Gift className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-purple-600 dark:group-hover:text-purple-500 transition-colors" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Optimiseur Freebet</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Maximisez la conversion de vos paris gratuits.</p>
                    </Link>

                    <Link to="/refund" className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Remboursé si Perdant</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Sécurisez vos offres de bienvenue.</p>
                    </Link>

                    <Link to="/boost" className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl hover:border-orange-500/50 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-500" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors" />
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">Boost & Dutching</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Répartissez vos mises sur 3 issues.</p>
                    </Link>
                </div>
            </section>

            {/* Roadmap Section */}
            <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    Prochainement (Roadmap)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-70">
                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl border-dashed relative overflow-hidden">
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] text-slate-600 dark:text-slate-300 uppercase font-bold tracking-wider">Poker</div>
                        <Bot className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-4" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Bot de Poker (GTO)</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Assistant d'aide à la décision en temps réel basé sur la théorie des jeux optimale.</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl border-dashed relative overflow-hidden">
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] text-slate-600 dark:text-slate-300 uppercase font-bold tracking-wider">Casino</div>
                        <Layers className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-4" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Compteur de Cartes Blackjack</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tracker de 'True Count' optimisé pour les tables de casino en ligne en direct.</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl border-dashed relative overflow-hidden">
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] text-slate-600 dark:text-slate-300 uppercase font-bold tracking-wider">Bonus</div>
                        <Users className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-4" />
                        <h3 className="font-bold text-slate-900 dark:text-white">Farming de Parrainages</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Tableau de bord pour enchainer et tracker la rentabilité des offres de bienvenue.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
