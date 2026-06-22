import LearningLayout from '@/layouts/LearningLayout';

import { CheckCircle2, Clock3, Lightbulb, Search, ShieldAlert } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

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
    storageKey: string;

    slideNumber: number;

    title: string;

    description: string;

    image: string;

    note: string;

    hotspots: Hotspot[];
}

export default function InvestigationSlide({ storageKey, slideNumber, title, description, image, note, hotspots }: Props) {
    const [activeHotspot, setActiveHotspot] = useState<Hotspot>(hotspots[0]);

    const [visited, setVisited] = useState<Record<string, boolean>>(
        hotspots.reduce(
            (acc, hotspot) => ({
                ...acc,
                [hotspot.id]: false,
            }),
            {},
        ),
    );

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

    const handleHotspot = (hotspot: Hotspot) => {
        setActiveHotspot(hotspot);

        setVisited((prev) => ({
            ...prev,
            [hotspot.id]: true,
        }));
    };

    const progress = useMemo(() => {
        return Object.values(visited).filter(Boolean).length;
    }, [visited]);

    const completed = progress === hotspots.length;

    useEffect(() => {
        localStorage.setItem(storageKey, completed ? 'true' : 'false');

        window.dispatchEvent(new Event(`${storageKey}-change`));
    }, [completed, storageKey]);

    return (
        <LearningLayout>
            <div className="min-h-screen pb-24">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    {/* LABEL */}
                    <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide {slideNumber} — Investigasi
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-4 text-5xl font-black">{title}</h1>

                    {/* DESC */}
                    <p className="mt-4 max-w-3xl text-slate-300">{description}</p>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
                        {/* LEFT */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
                                <img src={image} alt={title} className="w-full" />

                                {hotspots.map((hotspot) => (
                                    <button
                                        key={hotspot.id}
                                        onClick={() => handleHotspot(hotspot)}
                                        style={{
                                            left: hotspot.x,
                                            top: hotspot.y,
                                        }}
                                        className={`absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-white transition-all ${
                                            visited[hotspot.id] ? 'bg-emerald-500' : 'animate-pulse bg-red-500'
                                        }`}
                                    >
                                        {getIcon(hotspot.icon)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4">
                            {/* DETAIL */}
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <h2 className="text-2xl font-black">{activeHotspot.title}</h2>

                                <div className="mt-5 space-y-5">
                                    <div>
                                        <p className="text-xs text-cyan-300 uppercase">Problem</p>

                                        <p className="mt-2 text-slate-300">{activeHotspot.problem}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-cyan-300 uppercase">Analysis</p>

                                        <p className="mt-2 text-slate-300">{activeHotspot.analysis}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-cyan-300 uppercase">Solution</p>

                                        <p className="mt-2 text-slate-300">{activeHotspot.solution}</p>
                                    </div>
                                </div>
                            </div>

                            {/* NOTE */}
                            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <div className="flex gap-3">
                                    <Lightbulb />

                                    <div>
                                        <h3 className="font-bold">Catatan Penting</h3>

                                        <p className="mt-2 text-sm text-slate-300">{note}</p>
                                    </div>
                                </div>
                            </div>

                            {/* PROGRESS */}
                            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                                <div className="flex items-center justify-between">
                                    <span>Progress Investigasi</span>

                                    <span>
                                        {progress}/{hotspots.length}
                                    </span>
                                </div>

                                <div className="mt-3 h-3 rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-emerald-400 transition-all"
                                        style={{
                                            width: `${(progress / hotspots.length) * 100}%`,
                                        }}
                                    />
                                </div>

                                {!completed && <p className="mt-3 text-sm text-slate-300">Klik semua hotspot untuk melanjutkan.</p>}

                                {completed && (
                                    <div className="mt-4 flex items-center gap-2 text-emerald-300">
                                        <CheckCircle2 size={18} />
                                        Semua hotspot telah dibuka. Anda dapat melanjutkan.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LearningLayout>
    );
}
