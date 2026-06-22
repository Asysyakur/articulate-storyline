import { Link, router, usePage } from '@inertiajs/react';

import { ChevronLeft, ChevronRight, Home, LogOut, Volume2, VolumeX } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

export default function SlideControls() {
    const { url } = usePage();

    const [audioOn, setAudioOn] = useState(true);
    const [solutionDevelopmentChecked, setSolutionDevelopmentChecked] = useState(false);
    const [evaluationCompleted, setEvaluationCompleted] = useState(false);
    const [evaluationScore, setEvaluationScore] = useState(0);
    const [problemOrientationCompleted, setProblemOrientationCompleted] = useState(false);
    const [informationGatheringCompleted, setInformationGatheringCompleted] = useState(false);
    const [computationalThinkingCompleted, setComputationalThinkingCompleted] = useState(false);
    const [algorithmCompleted, setAlgorithmCompleted] = useState(false);
    const [dataRepresentationCompleted, setDataRepresentationCompleted] = useState(false);
    const [dataProcessingCompleted, setDataProcessingCompleted] = useState(false);
    /*
    |--------------------------------------------------------------------------
    | SLIDES
    |--------------------------------------------------------------------------
    |
    | Hanya slide utama.
    | Investigation dibuka lewat aktivitas PBL.
    |
    */

    const slides = useMemo(
        () => [
            { title: 'Cover', path: '/' },
            { title: 'Instruction', path: '/instruction' },
            { title: 'Learning Outcomes', path: '/learning-outcomes' },
            { title: 'Problem Orientation', path: '/problem-orientation' },
            { title: 'Information Gathering', path: '/information-gathering' },
            /* |-------------------------------------------------------------------------- | INVESTIGATION |-------------------------------------------------------------------------- */ {
                title: 'Computational Thinking',
                path: '/investigation/computational-thinking',
            },
            { title: 'Algorithm', path: '/investigation/algorithm' },
            { title: 'Data Representation', path: '/investigation/data-representation' },
            { title: 'Data Processing', path: '/investigation/data-processing' },
            { title: 'Investigation Summary', path: '/investigation/summary' },
            /* |-------------------------------------------------------------------------- | NEXT FLOW |-------------------------------------------------------------------------- */ {
                title: 'Solution Development',
                path: '/solution-development',
            },
            { title: 'Evaluation', path: '/evaluation' },
            { title: 'Result', path: '/result' },
            { title: 'Reflection', path: '/reflection' },
            { title: 'Developer Profile', path: '/developer-profile' },
        ],
        [],
    );

    /*
    |--------------------------------------------------------------------------
    | CURRENT INDEX
    |--------------------------------------------------------------------------
    */

    const currentIndex = slides.findIndex((slide) => slide.path === url);

    /*
    |--------------------------------------------------------------------------
    | NAVIGATION
    |--------------------------------------------------------------------------
    */

    const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null;

    const prevSlide = currentIndex > 0 ? slides[currentIndex - 1] : null;

    useEffect(() => {
        const readCheckedState = () => {
            if (typeof window === 'undefined') {
                return;
            }

            setSolutionDevelopmentChecked(window.localStorage.getItem('solution-development-checked') === 'true');
            setProblemOrientationCompleted(localStorage.getItem('problem-orientation-completed') === 'true');
            setInformationGatheringCompleted(localStorage.getItem('information-gathering-completed') === 'true');
            setComputationalThinkingCompleted(localStorage.getItem('computational-thinking-completed') === 'true');
            setAlgorithmCompleted(localStorage.getItem('algorithm-completed') === 'true');
            setDataRepresentationCompleted(localStorage.getItem('data-representation-completed') === 'true');
            setDataProcessingCompleted(localStorage.getItem('data-processing-completed') === 'true');

            const completed = window.sessionStorage.getItem('evaluationCompleted') === 'true';
            const score = Number(window.sessionStorage.getItem('evaluationScore') ?? 0);

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
        return () => {
            window.removeEventListener('solution-development-checked-change', readCheckedState);
            window.removeEventListener('evaluation-completed-change', readCheckedState);
            window.removeEventListener('problem-orientation-completed-change', readCheckedState);
            window.removeEventListener('information-gathering-completed-change', readCheckedState);
            window.removeEventListener('computational-thinking-completed-change', readCheckedState);
            window.removeEventListener('algorithm-completed-change', readCheckedState);
            window.removeEventListener('data-representation-completed-change', readCheckedState);
            window.removeEventListener('data-processing-completed-change', readCheckedState);
        };
    }, [url]);

    /*
    |--------------------------------------------------------------------------
    | HIDE CONTROLS
    |--------------------------------------------------------------------------
    |
    | Jangan tampilkan di cover.
    |
    */

    if (url === '/') {
        return null;
    }

    const nextEnabled =
        nextSlide &&
        (url !== '/problem-orientation' || problemOrientationCompleted) &&
        (url !== '/information-gathering' || informationGatheringCompleted) &&
        (url !== '/investigation/computational-thinking' || computationalThinkingCompleted) &&
        (url !== '/investigation/algorithm' || algorithmCompleted) &&
        (url !== '/investigation/data-representation' || dataRepresentationCompleted) &&
        (url !== '/investigation/data-processing' || dataProcessingCompleted) &&
        (url !== '/solution-development' || solutionDevelopmentChecked) &&
        (url !== '/evaluation' || evaluationCompleted) &&
        (url !== '/result' || evaluationScore >= 75);

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
                {/* HOME */}
                <Link
                    href="/"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 transition hover:bg-cyan-400 hover:text-slate-950"
                >
                    <Home size={20} />
                </Link>

                {/* PREVIOUS */}
                <button
                    disabled={!prevSlide}
                    onClick={() => {
                        if (prevSlide) {
                            router.visit(prevSlide.path);
                        }
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                        prevSlide ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                    } `}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* SLIDE INFO */}
                <div className="hidden min-w-[240px] rounded-xl border border-white/10 bg-slate-800/80 px-5 py-3 md:block">
                    <p className="text-xs text-slate-400">Current Slide</p>

                    <div className="mt-2 flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-white">{slides[currentIndex]?.title}</h3>

                            <p className="mt-1 text-xs text-slate-500">Interactive Learning Media</p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-400">
                            {currentIndex + 1}/{slides.length}
                        </div>
                    </div>
                </div>

                {/* NEXT */}
                <button
                    disabled={!nextEnabled}
                    onClick={() => {
                        if (nextEnabled) {
                            router.visit(nextSlide.path);
                        }
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                        nextEnabled ? 'bg-cyan-400 text-slate-950 hover:scale-105' : 'cursor-not-allowed bg-slate-900 text-slate-600'
                    } `}
                >
                    <ChevronRight size={20} />
                </button>

                {/* AUDIO */}
                <button
                    onClick={() => setAudioOn(!audioOn)}
                    className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                        audioOn
                            ? 'bg-slate-800 hover:bg-cyan-400 hover:text-slate-950'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'
                    } `}
                >
                    {audioOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>

                {/* EXIT */}
                <button
                    onClick={() => router.visit('/')}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400 transition-all hover:bg-red-500 hover:text-white"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
}
