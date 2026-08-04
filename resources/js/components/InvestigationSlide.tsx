import LearningLayout from '@/layouts/LearningLayout';
import { saveLearningProgress } from '@/utils/learningState';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

import { CheckCircle2, Clock3, Lightbulb, Search, ShieldAlert } from 'lucide-react';

import { type ReactNode, useEffect, useMemo, useState } from 'react';

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

    visual?: ReactNode;

    note: string;

    hotspots: Hotspot[];

    compactWorkflow?: boolean;
}

export default function InvestigationSlide({ storageKey, slideNumber, title, description, image, visual, note, hotspots, compactWorkflow = false }: Props) {
    const { props } = usePage<SharedData>();
    const savedProgress = props.learning?.progress ?? [];
    const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
    const [problemIdentification, setProblemIdentification] = useState('');
    const [analysisAndSolution, setAnalysisAndSolution] = useState('');
    const [discussionShown, setDiscussionShown] = useState(false);
    const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

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

    const allEvidenceFound = progress === hotspots.length;
    const inputsComplete = problemIdentification.trim().length > 0 && analysisAndSolution.trim().length > 0;
    const canCompare = allEvidenceFound && inputsComplete;
    const completed = discussionShown;

    const canonicalActivityKey = storageKey.endsWith('-completed') ? storageKey.replace(/-completed$/, '') : storageKey;

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const fallbackKey = storageKey.endsWith('-completed') ? storageKey.replace(/-completed$/, '') : null;
        const progressEntry = savedProgress.find((item) => item.activity_key === storageKey || (fallbackKey !== null && item.activity_key === fallbackKey));
        const payload = progressEntry?.payload;

        if (payload && typeof payload === 'object') {
            const visitedPayload = payload.visited;
            if (visitedPayload && typeof visitedPayload === 'object') {
                setVisited((prev) =>
                    Object.keys(prev).reduce<Record<string, boolean>>((acc, key) => {
                        const value = (visitedPayload as Record<string, unknown>)[key];

                        acc[key] = typeof value === 'boolean' ? value : prev[key];

                        return acc;
                    }, {}),
                );
            }

            const studentAnswers = payload.student_answers;
            if (studentAnswers && typeof studentAnswers === 'object') {
                const problemAnswer = (studentAnswers as Record<string, unknown>).problem_identification;
                const analysisAnswer = (studentAnswers as Record<string, unknown>).analysis_and_solution;

                if (typeof problemAnswer === 'string') {
                    setProblemIdentification(problemAnswer);
                }

                if (typeof analysisAnswer === 'string') {
                    setAnalysisAndSolution(analysisAnswer);
                }
            }

            if (typeof payload.discussionShown === 'boolean') {
                setDiscussionShown(payload.discussionShown);
            } else if (progressEntry?.completed) {
                setDiscussionShown(true);
            }
        } else if (progressEntry?.completed || localStorage.getItem(storageKey) === 'true') {
            setDiscussionShown(true);
        }

        setIsHydrated(true);
    }, [savedProgress, storageKey]);

    useEffect(() => {
        if (!isHydrated) {
            return;
        }

        localStorage.setItem(storageKey, completed ? 'true' : 'false');
        void saveLearningProgress(canonicalActivityKey, completed, {
            visited,
            discussionShown,
            student_answers: {
                problem_identification: problemIdentification,
                analysis_and_solution: analysisAndSolution,
            },
        });

        window.dispatchEvent(new Event(`${storageKey}-change`));
    }, [analysisAndSolution, canonicalActivityKey, completed, discussionShown, isHydrated, problemIdentification, storageKey, visited]);

    return (
        <LearningLayout>
            <div className="min-h-screen pb-24">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
                    {/* LABEL */}
                    <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                        Slide {slideNumber} — Investigasi
                    </div>

                    {/* TITLE */}
                    <h1 className="mt-4 text-3xl font-black sm:text-5xl">{title}</h1>

                    {/* DESC */}
                    <p className="mt-4 max-w-3xl text-slate-300">{description}</p>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
                        {/* LEFT */}
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
                                {visual ?? <img src={image} alt={title} className="w-full" />}

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
                            {/* EVIDENCE LIST */}
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <h2 className="text-2xl font-black">Daftar Bukti</h2>
                                <p className="mt-2 text-sm text-slate-400">Klik seluruh penanda pada gambar. Bukti yang ditemukan akan dicatat di sini.</p>

                                <div className="mt-5 space-y-3">
                                    {hotspots.map((hotspot) => (
                                        <div
                                            key={hotspot.id}
                                            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
                                                visited[hotspot.id]
                                                    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
                                                    : 'border-white/10 bg-white/5 text-slate-500'
                                            }`}
                                        >
                                            <CheckCircle2 size={17} className={visited[hotspot.id] ? 'text-emerald-300' : 'text-slate-600'} />
                                            <span>{visited[hotspot.id] ? hotspot.title : 'Bukti belum ditemukan'}</span>
                                        </div>
                                    ))}
                                </div>

                                {activeHotspot && (
                                    <p className="mt-4 text-sm text-cyan-200">
                                        Bukti “{activeHotspot.title}” telah dicatat. Gunakan seluruh bukti untuk menyusun analisismu.
                                    </p>
                                )}
                            </div>

                            {compactWorkflow && (
                                <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                    <h2 className="text-lg font-black">Analisis &amp; Pembahasan</h2>
                                    <p className="mt-2 text-sm text-slate-300">
                                        {allEvidenceFound
                                            ? 'Seluruh bukti sudah terkumpul. Buka lembar analisis untuk menuliskan kesimpulanmu.'
                                            : 'Lembar analisis akan terbuka setelah semua bukti ditemukan.'}
                                    </p>
                                    <button
                                        type="button"
                                        disabled={!allEvidenceFound}
                                        onClick={() => setIsWorkflowOpen(true)}
                                        className="mt-4 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition enabled:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                                    >
                                        {discussionShown ? 'Lihat Analisis & Pembahasan' : 'Buka Analisis Peserta Didik'}
                                    </button>
                                </div>
                            )}

                            {/* STUDENT ANALYSIS */}
                            <div className={compactWorkflow ? (isWorkflowOpen ? 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm' : 'hidden') : 'contents'}>
                                <div
                                    role={compactWorkflow ? 'dialog' : undefined}
                                    aria-modal={compactWorkflow || undefined}
                                    className={compactWorkflow ? 'max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-cyan-400/30 bg-slate-900 p-5 shadow-2xl sm:p-6' : 'contents'}
                                >
                                    {compactWorkflow && (
                                        <div className="mb-4 flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-semibold text-cyan-300">Membimbing Penyelidikan</p>
                                                <h2 className="text-2xl font-black">Analisis &amp; Pembahasan</h2>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setIsWorkflowOpen(false)}
                                                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
                                            >
                                                Tutup
                                            </button>
                                        </div>
                                    )}
                                    <div className={compactWorkflow && discussionShown ? 'grid gap-4 lg:grid-cols-2' : 'contents'}>
                            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                                <h2 className="text-xl font-black">Analisis Peserta Didik</h2>
                                <p className="mt-2 text-sm text-slate-400">Tuliskan jawabanmu berdasarkan bukti yang telah ditemukan.</p>

                                <label className="mt-5 block text-xs text-cyan-300 uppercase" htmlFor={`${storageKey}-problem`}>
                                    Identifikasi Masalah
                                </label>
                                <textarea
                                    id={`${storageKey}-problem`}
                                    value={problemIdentification}
                                    onChange={(event) => setProblemIdentification(event.target.value)}
                                    rows={3}
                                    placeholder="Tuliskan masalah yang kamu temukan..."
                                    className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
                                />

                                <label className="mt-4 block text-xs text-cyan-300 uppercase" htmlFor={`${storageKey}-analysis`}>
                                    Analisis &amp; Solusi
                                </label>
                                <textarea
                                    id={`${storageKey}-analysis`}
                                    value={analysisAndSolution}
                                    onChange={(event) => setAnalysisAndSolution(event.target.value)}
                                    rows={4}
                                    placeholder="Jelaskan analisis dan solusi yang kamu usulkan..."
                                    className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 p-3 text-sm text-slate-200 outline-none transition focus:border-cyan-400"
                                />

                                <button
                                    type="button"
                                    disabled={!canCompare || discussionShown}
                                    onClick={() => setDiscussionShown(true)}
                                    className="mt-5 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition enabled:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                                >
                                    {discussionShown ? 'Pembahasan Ditampilkan' : 'Bandingkan Pembahasan'}
                                </button>
                                {!discussionShown && !canCompare && (
                                    <p className="mt-3 text-xs text-slate-400">Tombol aktif setelah semua bukti ditemukan dan kedua isian diisi.</p>
                                )}
                            </div>

                            {/* OFFICIAL DISCUSSION */}
                            <div className={compactWorkflow ? 'space-y-4' : 'contents'}>
                            {discussionShown && (
                                <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-6">
                                    <h2 className="text-xl font-black text-cyan-100">Pembahasan Resmi</h2>
                                    <div className="mt-5 space-y-5">
                                        {hotspots.map((hotspot) => (
                                            <div key={hotspot.id} className="border-b border-cyan-400/15 pb-5 last:border-0 last:pb-0">
                                                <h3 className="font-bold text-white">{hotspot.title}</h3>
                                                <p className="mt-3 text-xs text-cyan-300 uppercase">Problem</p>
                                                <p className="mt-1 text-sm text-slate-300">{hotspot.problem}</p>
                                                <p className="mt-3 text-xs text-cyan-300 uppercase">Analysis</p>
                                                <p className="mt-1 text-sm text-slate-300">{hotspot.analysis}</p>
                                                <p className="mt-3 text-xs text-cyan-300 uppercase">Solution</p>
                                                <p className="mt-1 text-sm text-slate-300">{hotspot.solution}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* NOTE */}
                            {discussionShown && (
                            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <div className="flex gap-3">
                                    <Lightbulb />

                                    <div>
                                        <h3 className="font-bold">Catatan Penting</h3>

                                        <p className="mt-2 text-sm text-slate-300">{note}</p>
                                    </div>
                                </div>
                            </div>
                            )}
                            </div>
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

                                {!allEvidenceFound && <p className="mt-3 text-sm text-slate-300">Temukan semua bukti terlebih dahulu.</p>}

                                {allEvidenceFound && !completed && (
                                    <p className="mt-3 text-sm text-slate-300">Isi analisis, lalu bandingkan dengan pembahasan resmi untuk melanjutkan.</p>
                                )}

                                {completed && (
                                    <div className="mt-4 flex items-center gap-2 text-emerald-300">
                                        <CheckCircle2 size={18} />
                                        Pembahasan resmi telah dibuka. Anda dapat melanjutkan.
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
