import React from 'react';
import { Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto py-8 animate-in fade-in duration-500">
            <Helmet>
                <title>Politique de Confidentialité | BetCalc France</title>
                <meta name="description" content="Politique de confidentialité concernant la collecte de données sur BetCalc France." />
            </Helmet>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <Lock className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Politique de Confidentialité</h1>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2>1. Collecte des données</h2>
                <p>
                    Nous sommes soucieux du respect de votre vie privée. BetCalc France ne demande ni ne stocke d'informations personnelles identifiables de ses utilisateurs pour l'utilisation de base de ses calculateurs.
                </p>
                <p>
                    Cependant, si vous choisissez de vous inscrire à notre newsletter, nous enregistrons uniquement votre adresse e-mail dans le but strict de vous envoyer des actualités liées au site.
                </p>

                <h2>2. Cookies et traceurs</h2>
                <p>
                    L'utilisation de notre site implique la mise en place de cookies sur votre appareil.
                </p>
                <ul>
                    <li><strong>Cookies fonctionnels :</strong> Utilisés pour sauvegarder vos préférences (comme le thème clair/sombre ou le fait d'avoir fermé un encart publicitaire).</li>
                    <li><strong>Cookies publicitaires (Google AdSense) :</strong> Des fournisseurs tiers, dont Google, utilisent des cookies pour diffuser des annonces publicitaires pertinentes en fonction de vos visites antérieures sur notre site Web ou sur d'autres pages Web. Grâce aux cookies publicitaires, Google et ses partenaires adaptent les annonces diffusées auprès de vous en fonction de votre navigation sur nos sites et/ou d'autres sites.</li>
                </ul>

                <h2>3. Comment refuser les cookies</h2>
                <p>
                    Vous pouvez choisir de désactiver la publicité personnalisée en consultant les <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Paramètres des annonces de Google</a>.
                    Vous pouvez également désactiver l'utilisation de cookies tiers pour la publicité personnalisée en visitant le site <a href="http://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
                </p>

                <h2>4. Outils de mesure d'audience</h2>
                <p>
                    Nous pourrions être amenés à utiliser des outils analytiques (sans collecte d'identification personnelle au regard du RGPD) pour comptabiliser les visites globales du site dans le seul but d'améliorer l'expérience utilisateur globale.
                </p>
            </div>
        </div>
    );
};
