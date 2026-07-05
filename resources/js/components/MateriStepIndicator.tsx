interface Props {
    current: number;
    total: number;
}

export default function MateriStepIndicator({ current, total }: Props) {
    return (
        <div className="flex items-center gap-2">
            {Array.from({ length: total }, (_, index) => index + 1).map((step) => (
                <span
                    key={step}
                    className={`h-2 rounded-full transition-all ${step === current ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'}`}
                />
            ))}

            <span className="ml-2 text-sm text-slate-400">
                {current} dari {total}
            </span>
        </div>
    );
}
