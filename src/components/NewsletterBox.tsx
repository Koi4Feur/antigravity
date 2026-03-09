import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabase';

export const NewsletterBox: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setError(null);

        const { error: sbError } = await supabase
            .from('subscribers')
            .insert([{ email }]);

        setIsLoading(false);

        if (sbError) {
            // Supabase error code 23505 = unique constraint violation (email already exists)
            if (sbError.code === '23505') {
                setError('Cet email est déjà inscrit à la newsletter.');
            } else {
                setError("Une erreur s'est produite. Veuillez réessayer.");
            }
        } else {
            setIsSubscribed(true);
        }
    };

    if (isSubscribed) {
        return (
            <div className="bg-white dark:bg-slate-800 border border-emerald-500/30 rounded-xl p-8 text-center animate-in fade-in duration-500">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Inscription confirmée !</h3>
                <p className="text-slate-500 dark:text-slate-400">Merci de rejoindre notre communauté. Vous recevrez bientôt nos meilleurs pronostics.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 md:p-10 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 md:flex md:items-center md:justify-between gap-8">
                <div className="md:w-1/2 mb-6 md:mb-0">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Mail className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="font-semibold text-emerald-500 tracking-wider text-sm uppercase">Newsletter VIP</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ne manquez aucun surebet</h3>
                    <p className="text-slate-500 dark:text-slate-400">Recevez nos alertes de value bet et nos astuces d'optimisation directement dans votre boîte mail.</p>
                </div>

                <div className="md:w-1/2">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(null); }}
                            placeholder="votre@email.com"
                            required
                            disabled={isLoading}
                            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all disabled:opacity-60"
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
                        >
                            {isLoading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Inscription...</>
                            ) : (
                                "S'inscrire"
                            )}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-red-400 animate-in fade-in duration-300">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
