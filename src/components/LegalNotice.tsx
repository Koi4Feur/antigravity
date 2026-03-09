import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const LegalNotice: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
            <Helmet>
                <title>Mentions Légales | BetCalc France</title>
                <meta name="description" content="Mentions légales de l'application BetCalc France." />
            </Helmet>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <ShieldAlert className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mentions Légales</h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2>1. Éditeur du site</h2>
                <p>
                    Le site BetCalc France est édité à titre personnel. Pour toute demande ou question, vous pouvez nous contacter à l'adresse suivante : <strong>contact@betcalc.fr</strong> (à remplacer par votre email de contact).
                </p>

                <h2>2. Hébergement</h2>
                <p>
                    Ce site est hébergé par Hostinger International Ltd.<br />
                    61 Lordou Vironos Street<br />
                    6023 Larnaca, Chypre<br />
                    Contact : https://www.hostinger.fr/contact
                </p>

                <h2>3. Avertissement sur les paris sportifs</h2>
                <p>
                    BetCalc France met à disposition des outils d'aide à la décision pour les paris sportifs. Le site n'est pas un site de paris et n'encourage pas le jeu d'argent.
                    Les paris sportifs comportent des risques de perte financière totale ou partielle de votre capital. En aucun cas, le site ou son éditeur ne pourront être tenus responsables d'éventuelles pertes financières subies par l'utilisateur.
                </p>
                <p className="font-bold text-emerald-600 dark:text-emerald-500">
                    JOUER COMPORTE DES RISQUES : ENDETTEMENT, ISOLEMENT, DÉPENDANCE. POUR ÊTRE AIDÉ, APPELEZ LE 09-74-75-13-13 (APPEL NON SURTAXÉ).
                </p>

                <h2>4. Propriété intellectuelle</h2>
                <p>
                    L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, photographies, images, vidéos, et autres éléments visuels) sont protégés par la législation sur le droit d'auteur et la propriété intellectuelle. Toute reproduction, totale ou partielle, est strictement interdite sans autorisation explicite.
                </p>
            </div>
        </div>
    );
};
