import React from 'react';

interface AdSlotProps {
    className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ className }) => {
    return (
        <div className={`bg-slate-800/50 border border-slate-700 border-dashed rounded-lg flex items-center justify-center p-4 min-h-[100px] ${className}`}>
            <span className="text-slate-500 text-sm font-medium">Espace Publicitaire</span>
        </div>
    );
};
