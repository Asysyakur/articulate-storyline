import LearningLayout from '@/layouts/LearningLayout';

import { CheckCircle2, Clock3, Lightbulb, Search, ShieldAlert } from 'lucide-react';

import { useState } from 'react';

interface Hotspot {
    id: string;

    title: string;

    x: string;
    y: string;

    icon?: 'queue' | 'lost' | 'search';

    problem: string;

    analysis: string;

    solution: string;
}

interface Props {
    slideNumber: number;

    title: string;

    description: string;

    image: string;

    note: string;

    hotspots: Hotspot[];
}

export default function InvestigationSlide({ slideNumber, title, description, image, note, hotspots }: Props) {
    const [activeHotspot, setActiveHotspot] = useState<Hotspot>(hotspots[0]);

    /*
    |--------------------------------------------------------------------------
    | ICON
    |--------------------------------------------------------------------------
    */

    const getIcon = (icon?: string) => {
        switch (icon) {
            case 'queue':
                return <Clock3 size={16} />;

            case 'lost':
                return <ShieldAlert size={16} />;

            default:
                return <Search size={16} />;
        }
    };

    return (
        <LearningLayout>
            <div className="min-h-screen overflow-y-auto text-white">
                {/* BACKGROUND */}
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>

                {/* CONTENT */}
                <div className="mx-auto max-w-7xl px-6 py-8 pb-24">
                    {/* HEADER */}
                    <div className="max-w-3xl">
                        {/* LABEL */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                            Slide {slideNumber} — Investigasi
                        </div>

                        {/* TITLE */}
                        <h1 className="mt-4 text-4xl leading-[0.95] font-black tracking-tight lg:text-5xl">{title}</h1>

                        {/* DESC */}
                        <p className="mt-4 text-base leading-relaxed text-slate-300">{description}</p>
                    </div>

                    {/* MAIN */}
                    <div className="mt-8 grid gap-5 lg:grid-cols-[1.55fr_0.9fr]">
                        {/* LEFT */}
                        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 shadow-2xl">
                            <div className="relative overflow-hidden rounded-[20px]">
                                {/* IMAGE */}
                                <img src={image} alt={title} className="w-full object-cover" />

                                {/* OVERLAY */}
                                <div className="absolute inset-0 bg-black/10" />

                                {/* HOTSPOTS */}
                                {hotspots.map((hotspot) => (
                                    <button
                                        key={hotspot.id}
                                        onClick={() => setActiveHotspot(hotspot)}
                                        style={{
                                            left: hotspot.x,
                                            top: hotspot.y,
                                        }}
                                        className={`absolute flex h-10 w-10 items-center justify-center rounded-full border-4 shadow-lg transition-all duration-300 ${
                                            activeHotspot.id === hotspot.id
                                                ? 'scale-110 border-cyan-300 bg-cyan-400 text-slate-950'
                                                : 'border-white bg-cyan-500 text-white hover:scale-105'
                                        }`}
                                    >
                                        {getIcon(hotspot.icon)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4">
                            {/* ACTIVE HOTSPOT */}
                            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-xl">
                                {/* TITLE */}
                                <h2 className="text-2xl font-black">{activeHotspot.title}</h2>

                                {/* CONTENT */}
                                <div className="mt-5 space-y-4">
                                    {/* PROBLEM */}
                                    <div>
                                        <p className="text-xs font-bold tracking-wider text-cyan-300 uppercase">Problem</p>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeHotspot.problem}</p>
                                    </div>

                                    {/* ANALYSIS */}
                                    <div>
                                        <p className="text-xs font-bold tracking-wider text-cyan-300 uppercase">Analysis</p>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeHotspot.analysis}</p>
                                    </div>

                                    {/* SOLUTION */}
                                    <div>
                                        <p className="text-xs font-bold tracking-wider text-cyan-300 uppercase">Solution</p>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeHotspot.solution}</p>
                                    </div>
                                </div>
                            </div>

                            {/* NOTE */}
                            <div className="rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <div className="flex items-start gap-4">
                                    {/* ICON */}
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-300">
                                        <Lightbulb size={20} />
                                    </div>

                                    {/* TEXT */}
                                    <div>
                                        <h3 className="font-bold">Catatan Penting</h3>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{note}</p>
                                    </div>
                                </div>
                            </div>

                            {/* STATUS */}
                            <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-400/10 p-5">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-300" />

                                    <p className="text-sm font-medium text-emerald-200">Klik seluruh hotspot untuk memahami investigasi masalah.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
