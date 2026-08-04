import { CheckCircle2, Target } from 'lucide-react';

type Props = {
    items: string[];
};

export default function MateriTujuan({ items }: Props) {
    return (
        <section className="mt-6 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 sm:p-6" aria-labelledby="tujuan-materi">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
                    <Target size={20} />
                </div>
                <div>
                    <p className="text-sm font-semibold text-cyan-300">Tujuan Materi</p>
                    <h2 id="tujuan-materi" className="text-lg font-bold text-white">
                        Setelah mempelajari materi ini, kamu dapat:
                    </h2>
                </div>
            </div>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-200">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
}
