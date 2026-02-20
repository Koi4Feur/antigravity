import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with real ID

export const Analytics: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Mock GA initialization
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Define gtag function (mock for Typescript satisfaction if needed, though window.gtag is cleaner)
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID);

        return () => {
            // Cleanup not typically needed for GA script injection in this simple manner
        };
    }, []);

    useEffect(() => {
        // Track page views
        if (typeof window.gtag === 'function') {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: location.pathname + location.search
            });
        }
        // Console log for demo
        console.log(`[Analytics] Page View: ${location.pathname}`);
    }, [location]);

    return null;
};

// Add typescript definition for window
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}
