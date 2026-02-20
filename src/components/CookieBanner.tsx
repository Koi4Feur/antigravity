import React, { useEffect, useState } from 'react';

export const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('betcalc_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('betcalc_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 sm:items-center sm:p-0 bg-slate-900/80 backdrop-blur-sm">
            <div className="relative transform overflow-hidden rounded-lg bg-slate-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 border border-slate-700">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-white">
                            Respect de votre vie privée
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-slate-300">
                                Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic. En continuant, vous acceptez notre utilisation des cookies.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto transition-colors"
                        onClick={handleAccept}
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
};
