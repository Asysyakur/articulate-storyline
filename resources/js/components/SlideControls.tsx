import { Link, router, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { NARRATION_STORAGE_KEY, stopSpeak } from '@/utils/speech';
import { SFX_STORAGE_KEY, stopSfx } from '@/utils/sound';
import { saveLearningState } from '@/utils/learningState';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Home, LogOut, Volume2, VolumeX } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

export default function SlideControls() {
    const { url, props } = usePage<SharedData>();
    const preferences = props.learning?.state?.preferences;
    const savedProgress = props.learning?.progress ?? [];
    const [showExitModal, setShowExitModal] = useState(false);
    const [showMaterialMenu, setShowMaterialMenu] = useState(false);
    const [showAudioMenu, setShowAudioMenu] = useState(false);

    const [audioOn, setAudioOn] = useState(preferences?.music ?? true);
    const [narrationOn, setNarrationOn] = useState(preferences?.narration ?? false);
    const [sfxOn, setSfxOn] = useState(preferences?.sfx ?? true);

    useEffect(() => {
        if (window.bgMusic) {
            window.bgMusic.muted = !audioOn;
        }

        localStorage.setItem('bg-music-muted', String(!audioOn));
        localStorage.setItem(NARRATION_STORAGE_KEY, String(narrationOn));
        localStorage.setItem(SFX_STORAGE_KEY, String(sfxOn));
    }, []);
    const [solutionDevelopmentChecked, setSolutionDevelopmentChecked] = useState(false);
    const [evaluationCompleted, setEvaluationCompleted] = useState(false);
    const [evaluationScore, setEvaluationScore] = useState(0);
    const [problemOrientationCompleted, setProblemOrientationCompleted] = useState(false);
    const [informationGatheringCompleted, setInformationGatheringCompleted] = useState(false);
    const [computationalThinkingCompleted, setComputationalThinkingCompleted] = useState(false);
    const [algorithmCompleted, setAlgorithmCompleted] = useState(false);
    const [dataRepresentationCompleted, setDataRepresentationCompleted] = useState(false);
    const [dataProcessingCompleted, setDataProcessingCompleted] = useState(false);
    const [diagnosticPracticeCompleted, setDiagnosticPracticeCompleted] = useState(false);
    const materialSlides = [
        { title: 'Mengenal Jaringan Komputer', path: '/materi/mengenal-jaringan-komputer' },
        { title: 'Topologi Jaringan', path: '/materi/topologi-jaringan' },
        { title: 'Media & Komponen Jaringan', path: '/materi/media-komponen-jaringan' },
        { title: 'Dasar Pengalamatan', path: '/materi/dasar-pengalamatan' },
    ];
    const learningSlideOrder = [
        '/',
        '/beranda',
        '/instruction',
        // '/learning-outcomes',
        '/problem-orientation',
        '/information-gathering',
        '/investigation/computational-thinking',
        '/investigation/algorithm',
        '/investigation/data-representation',
        // '/investigation/data-processing',
        '/investigation/summary',
        '/solution-development',
        '/evaluation',
        '/result',
        '/reflection',
        '/developer-profile',
    ];
    const slideTitles: Record<string, string> = {
        '/': 'Login',
        '/beranda': 'Pembuka',
        '/instruction': 'Petunjuk',
        // '/learning-outcomes': 'Capaian Pembelajaran',
        '/problem-orientation': 'Orientasi Masalah (Fase 1)',
        '/information-gathering': 'Mengorganisasi Penyelidikan (Fase 2)',
        '/investigation/computational-thinking': 'Investigasi (Fase 3): Berpikir Komputasional',
        '/investigation/algorithm': 'Investigasi (Fase 3): Algoritma',
        '/investigation/data-representation': 'Investigasi (Fase 3): Representasi Data',
        // '/investigation/data-processing': 'Investigasi (Fase 3): Pengolahan Data',
        '/investigation/summary': 'Praktik Diagnosis',
        '/solution-development': 'Penyusunan Solusi (Fase 4)',
        '/evaluation': 'Evaluasi',
        '/result': 'Hasil Evaluasi',
        '/reflection': 'Refleksi (Fase 5)',
        '/developer-profile': 'Profil',
    };
    /*
    |--------------------------------------------------------------------------
    | SLIDES
    |--------------------------------------------------------------------------
    |
    | Urutan mengikuti alur Problem Based Learning (PBL).
    | Materi tersedia sebagai scaffolding dan dapat dibuka ulang.
    |
    */

    const slides = useMemo(
        () => [
            { title: 'Login', path: '/' },
            { title: 'Materi 1 — Mengenal Jaringan Komputer', path: '/materi/mengenal-jaringan-komputer' },
            { title: 'Materi 2 — Topologi Jaringan', path: '/materi/topologi-jaringan' },
            { title: 'Materi 3 — Media & Komponen Jaringan', path: '/materi/media-komponen-jaringan' },
            { title: 'Materi 4 — Dasar Pengalamatan', path: '/materi/dasar-pengalamatan' },
            { title: 'Cover', path: '/beranda' },
            { title: 'Instruction', path: '/instruction' },
            // { title: 'Learning Outcomes', path: '/learning-outcomes' },
            { title: 'Problem Orientation', path: '/problem-orientation' },
            { title: 'Information Gathering', path: '/information-gathering' },
            /* |-------------------------------------------------------------------------- | INVESTIGATION |-------------------------------------------------------------------------- */ {
                title: 'Computational Thinking',
                path: '/investigation/computational-thinking',
            },
            { title: 'Algorithm', path: '/investigation/algorithm' },
            { title: 'Data Representation', path: '/investigation/data-representation' },
            // { title: 'Data Processing', path: '/investigation/data-processing' },
            { title: 'Investigation Summary', path: '/investigation/summary' },
            /* |-------------------------------------------------------------------------- | NEXT FLOW |-------------------------------------------------------------------------- */ {
                title: 'Solution Development',
                path: '/solution-development',
            },
            { title: 'Evaluation', path: '/evaluation' },
            { title: 'Result', path: '/result' },
            { title: 'Reflection', path: '/reflection' },
            { title: 'Developer Profile', path: '/developer-profile' },
        ]
            .filter((slide) => !slide.path.startsWith('/materi/'))
            .sort((first, second) => learningSlideOrder.indexOf(first.path) - learningSlideOrder.indexOf(second.path))
            .map((slide) => ({ ...slide, title: slideTitles[slide.path] ?? slide.title })),
        [],
    );

    /*
    |--------------------------------------------------------------------------
    | CURRENT INDEX
    |--------------------------------------------------------------------------
    */

    const currentIndex = slides.findIndex((slide) => slide.path === url);
    const materialIndex = materialSlides.findIndex((slide) => slide.path === url);
    const isInMaterial = materialIndex !== -1;
    const activeSlides = isInMaterial ? materialSlides : slides;
    const activeIndex = isInMaterial ? materialIndex : currentIndex;

    /*
    |--------------------------------------------------------------------------
    | NAVIGATION
    |--------------------------------------------------------------------------
    */

    const nextSlide = activeIndex < activeSlides.length - 1 ? activeSlides[activeIndex + 1] : null;

    const prevSlide = activeIndex > 0 ? activeSlides[activeIndex - 1] : null;

    const navigate = (path: string) => {
        stopSpeak();
        router.visit(path, {
            preserveScroll: true,
        });
    };

    const returnFromMaterial = () => {
        const returnPath = window.sessionStorage.getItem('material-return-path') ?? '/beranda';

        window.sessionStorage.removeItem('material-return-path');
        navigate(returnPath);
    };

    const openMaterial = (path: string) => {
        window.sessionStorage.setItem('material-return-path', url);
        setShowMaterialMenu(false);
        navigate(path);
    };

    useEffect(() => {
        const readCheckedState = () => {
            if (typeof window === 'undefined') {
                return;
            }

            const isSaved = (activity: string) => savedProgress.some((item) => item.activity_key === activity && item.completed);
            const isSavedAny = (activities: string[]) => activities.some((activity) => isSaved(activity));
            setSolutionDevelopmentChecked(isSaved('solution-development') || window.localStorage.getItem('solution-development-checked') === 'true');
            setProblemOrientationCompleted(isSaved('problem-orientation') || localStorage.getItem('problem-orientation-completed') === 'true');
            setInformationGatheringCompleted(isSaved('information-gathering') || localStorage.getItem('information-gathering-completed') === 'true');
            setComputationalThinkingCompleted(isSaved('computational-thinking') || localStorage.getItem('computational-thinking-completed') === 'true');
            setAlgorithmCompleted(isSavedAny(['algorithm', 'algorithm-completed']) || localStorage.getItem('algorithm-completed') === 'true');
            setDataRepresentationCompleted(isSavedAny(['data-representation', 'data-representation-completed']) || localStorage.getItem('data-representation-completed') === 'true');
            setDataProcessingCompleted(isSaved('data-processing') || localStorage.getItem('data-processing-completed') === 'true');
            setDiagnosticPracticeCompleted(isSaved('diagnostic-practice') || localStorage.getItem('diagnostic-practice-completed') === 'true');

            const savedEvaluation = savedProgress.find((item) => item.activity_key === 'evaluation');
            const completed = Boolean(savedEvaluation?.completed) || window.sessionStorage.getItem('evaluationCompleted') === 'true';
            const score = typeof savedEvaluation?.payload?.score === 'number'
                ? savedEvaluation.payload.score
                : Number(window.sessionStorage.getItem('evaluationScore') ?? 0);

            setEvaluationCompleted(completed);
            setEvaluationScore(Number.isFinite(score) ? score : 0);
        };

        readCheckedState();

        window.addEventListener('solution-development-checked-change', readCheckedState);
        window.addEventListener('evaluation-completed-change', readCheckedState);
        window.addEventListener('problem-orientation-completed-change', readCheckedState);
        window.addEventListener('information-gathering-completed-change', readCheckedState);
        window.addEventListener('computational-thinking-completed-change', readCheckedState);
        window.addEventListener('algorithm-completed-change', readCheckedState);
        window.addEventListener('data-representation-completed-change', readCheckedState);
        window.addEventListener('data-processing-completed-change', readCheckedState);
        window.addEventListener('diagnostic-practice-completed-change', readCheckedState);
        return () => {
            window.removeEventListener('solution-development-checked-change', readCheckedState);
            window.removeEventListener('evaluation-completed-change', readCheckedState);
            window.removeEventListener('problem-orientation-completed-change', readCheckedState);
            window.removeEventListener('information-gathering-completed-change', readCheckedState);
            window.removeEventListener('computational-thinking-completed-change', readCheckedState);
            window.removeEventListener('algorithm-completed-change', readCheckedState);
            window.removeEventListener('data-representation-completed-change', readCheckedState);
            window.removeEventListener('data-processing-completed-change', readCheckedState);
            window.removeEventListener('diagnostic-practice-completed-change', readCheckedState);
        };
    }, [url, savedProgress]);

    /*
    |--------------------------------------------------------------------------
    | HIDE CONTROLS
    |--------------------------------------------------------------------------
    |
    | Jangan tampilkan di cover.
    |
    */

    const toggleAudio = () => {
        const next = !audioOn;

        setAudioOn(next);

        if (window.bgMusic) {
            window.bgMusic.muted = !next;
        }

        localStorage.setItem('bg-music-muted', String(!next));
        void saveLearningState('preferences', { music: next, narration: narrationOn, sfx: sfxOn });
    };

    const toggleNarration = () => {
        const next = !narrationOn;

        setNarrationOn(next);
        localStorage.setItem(NARRATION_STORAGE_KEY, String(next));
        void saveLearningState('preferences', { music: audioOn, narration: next, sfx: sfxOn });

        if (!next) {
            stopSpeak();
        }
    };

    const toggleSfx = () => {
        const next = !sfxOn;
        setSfxOn(next);
        localStorage.setItem(SFX_STORAGE_KEY, String(next));
        void saveLearningState('preferences', { music: audioOn, narration: narrationOn, sfx: next });

        if (!next) {
            stopSfx();
        }
    };

    if (url === '/') {
        return null;
    }

    const nextEnabled =
        (isInMaterial ? Boolean(nextSlide) : nextSlide) &&
        (url !== '/problem-orientation' || problemOrientationCompleted) &&
        (url !== '/information-gathering' || informationGatheringCompleted) &&
        (url !== '/investigation/computational-thinking' || computationalThinkingCompleted) &&
        (url !== '/investigation/algorithm' || algorithmCompleted) &&
        (url !== '/investigation/data-representation' || dataRepresentationCompleted) &&
        (url !== '/investigation/data-processing' || dataProcessingCompleted) &&
        (url !== '/investigation/summary' || diagnosticPracticeCompleted) &&
        (url !== '/solution-development' || solutionDevelopmentChecked) &&
        (url !== '/evaluation' || evaluationCompleted) &&
        (url !== '/result' || evaluationScore >= 75);

    return (
        <>
            <div className="fixed right-2 bottom-2 left-2 z-50 flex justify-center sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
                <div className="flex w-full max-w-max items-center justify-center gap-1 rounded-2xl border border-slate-800 bg-slate-900/90 px-2 py-2 shadow-2xl backdrop-blur-xl sm:gap-3 sm:px-4 sm:py-3">
                    {/* HOME */}
                    <Link
                        href="/"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 transition hover:bg-cyan-400 hover:text-slate-950 sm:h-12 sm:w-12"
                    >
                        <Home size={20} />
                    </Link>

                    {/* PREVIOUS */}
                    <button
                        disabled={!prevSlide}
                        onClick={() => {
                            if (prevSlide) {
                                navigate(prevSlide.path);
                            }
                        }}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all sm:h-12 sm:w-12 ${
                            prevSlide ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                        } `}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {!isInMaterial && (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowMaterialMenu((open) => !open)}
                            aria-label="Buka materi pendukung"
                            aria-expanded={showMaterialMenu}
                            className="flex h-10 shrink-0 items-center gap-1 rounded-xl bg-slate-800 px-2 text-xs font-semibold transition hover:bg-cyan-400 hover:text-slate-950 sm:h-12 sm:gap-2 sm:px-4 sm:text-sm"
                        >
                            <BookOpen size={20} />
                            Materi
                        </button>

                        {showMaterialMenu && (
                            <div className="absolute bottom-12 left-1/2 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-2xl sm:bottom-14 sm:w-72">
                                <p className="px-3 py-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">Materi pendukung</p>
                                {materialSlides.map((slide) => (
                                    <button
                                        key={slide.path}
                                        type="button"
                                        onClick={() => openMaterial(slide.path)}
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-cyan-400 hover:text-slate-950"
                                    >
                                        {slide.title}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    )}

                    {/* SLIDE INFO */}
                    <div className="hidden min-w-[240px] items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-slate-800/80 px-4 md:flex md:h-12">
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold text-white">{activeSlides[activeIndex]?.title}</h3>

                            <p className="truncate text-xs text-slate-500">Slide Saat Ini</p>
                        </div>

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-bold text-cyan-400">
                            {activeIndex + 1}/{activeSlides.length}
                        </div>
                    </div>

                    {/* NEXT / KEMBALI DARI MATERI */}
                    {isInMaterial && !nextSlide ? (
                        <button
                            type="button"
                            onClick={returnFromMaterial}
                            className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-cyan-400 px-3 text-xs font-bold text-slate-950 transition hover:scale-105 sm:h-12 sm:px-4 sm:text-sm"
                        >
                            <ChevronLeft size={18} />
                            Kembali
                        </button>
                    ) : (
                    <button
                        disabled={!nextEnabled}
                        onClick={() => {
                            if (nextEnabled) {
                                navigate(nextSlide.path);
                            }
                        }}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all sm:h-12 sm:w-12 ${
                            nextEnabled ? 'bg-cyan-400 text-slate-950 hover:scale-105' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                        } `}
                    >
                        <ChevronRight size={20} />
                    </button>
                    )}

                    {/* VOLUME */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowAudioMenu((open) => !open)}
                            aria-label="Pengaturan volume"
                            aria-expanded={showAudioMenu}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all sm:h-12 sm:w-12 ${
                                audioOn || narrationOn || sfxOn
                                    ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950'
                                    : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
                            }`}
                        >
                            {audioOn || narrationOn || sfxOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </button>

                        {showAudioMenu && (
                            <div className="absolute right-0 bottom-12 w-60 rounded-xl border border-white/10 bg-slate-900 p-3 shadow-2xl sm:bottom-14 sm:w-64">
                                <p className="px-2 pb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">Pengaturan volume</p>

                                <div className="flex items-center justify-between gap-3 rounded-lg px-2 py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Musik</p>
                                        <p className="text-xs text-slate-400">Musik latar</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleAudio}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                                            audioOn ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        {audioOn ? 'Aktif' : 'Nonaktif'}
                                    </button>
                                </div>

                                <div className="mt-1 flex items-center justify-between gap-3 rounded-lg px-2 py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-white">Narasi</p>
                                        <p className="text-xs text-slate-400">Nonaktif secara bawaan</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleNarration}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                                            narrationOn ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        {narrationOn ? 'Aktif' : 'Nonaktif'}
                                    </button>
                                </div>

                                <div className="mt-1 flex items-center justify-between gap-3 rounded-lg px-2 py-2">
                                    <div>
                                        <p className="text-sm font-semibold text-white">SFX</p>
                                        <p className="text-xs text-slate-400">Efek klik dan umpan balik</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleSfx}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                                            sfxOn ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                                        }`}
                                    >
                                        {sfxOn ? 'Aktif' : 'Nonaktif'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* EXIT */}
                    <button
                        onClick={() => setShowExitModal(true)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400 transition-all hover:bg-red-500 hover:text-white sm:h-12 sm:w-12"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showExitModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{
                                scale: 0.9,
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                scale: 0.9,
                                opacity: 0,
                                y: 20,
                            }}
                            transition={{ duration: 0.2 }}
                            className="mx-4 w-full max-w-md rounded-[28px] border border-red-500/30 bg-gradient-to-b from-[#2b1422] to-[#211425] p-5 shadow-2xl sm:p-8"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
                                    <LogOut size={28} />
                                </div>

                                <div>
                                    <p className="text-lg font-semibold text-red-400">Konfirmasi Keluar</p>

                                    <h2 className="mt-1 text-2xl font-black text-white sm:text-4xl">Keluar dari Media?</h2>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShowExitModal(false)}
                                    className="rounded-2xl bg-slate-800 py-4 text-lg font-bold text-white transition hover:bg-slate-700"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={() => {
                                        setShowExitModal(false);
                                        router.visit('/');
                                    }}
                                    className="rounded-2xl bg-red-500 py-4 text-lg font-bold text-white transition hover:bg-red-600"
                                >
                                    Keluar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
