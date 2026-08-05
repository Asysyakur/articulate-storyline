import { Edit3 } from 'lucide-react';

interface LkpdBadgeProps {
    tahap: string;
    className?: string;
}

export default function LkpdBadge({ tahap, className = '' }: LkpdBadgeProps) {
    return (
        <div
            className={`inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-sm backdrop-blur-md ${className}`}
            title={`Silakan catat hasil aktivitas slide ini di LKPD (${tahap})`}
        >
            <Edit3 size={14} className="shrink-0 text-amber-400" />
            <span>Catat di LKPD</span>
            <span className="h-3 w-px bg-amber-400/30" />
            <span className="font-bold text-amber-200">{tahap}</span>
        </div>
    );
}
