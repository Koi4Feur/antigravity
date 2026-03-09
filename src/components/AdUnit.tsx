import React, { useEffect, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AdUnitProps {
    className?: string;
    adSlot?: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
    fullWidthResponsive?: boolean;
    style?: React.CSSProperties;
    /** For local testing or before approval */
    isTestMode?: boolean;
}

export const AdUnit: React.FC<AdUnitProps> = ({
    className,
    adSlot = 'XXXXXXXXX', // Placeholder slot ID
    adFormat = 'auto',
    fullWidthResponsive = true,
    style = {},
    isTestMode = import.meta.env.DEV, // Default to true in development
}) => {
    const [adError, setAdError] = useState(false);

    useEffect(() => {
        if (isTestMode) return;

        try {
            // Check if the ad is already rendered to avoid Re-rendering errors
            const adsbygoogle = window.adsbygoogle || [];
            adsbygoogle.push({});
        } catch (error) {
            console.error('AdSense initialization error:', error);
            setAdError(true);
        }
    }, [isTestMode]);

    if (isTestMode || adError) {
        return (
            <div
                className={cn(
                    "bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-600 rounded flex flex-col items-center justify-center p-4 text-center min-h-[100px]",
                    className
                )}
                style={style}
            >
                <span className="text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-500 mb-1">
                    Espace Publicitaire
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-600">
                    {isTestMode ? "Mode Test (Local)" : "L'affichage de la publicité a échoué"}
                </span>
            </div>
        );
    }

    return (
        <div className={cn("overflow-hidden flex justify-center", className)}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client={import.meta.env.VITE_ADSENSE_PUB_ID} // Using Publisher ID from env
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            />
        </div>
    );
};
