import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

import { useEffect, useMemo, useState } from 'react';

interface Question {
    id: number;

    question: string;

    options: string[];

    answer: string;

    explanation: string;

    points: number;
}

interface Props {
    question: Question;

    questionNumber: number;

    totalQuestions: number;

    onNext: (correct: boolean, points: number) => void;
}

export default function MultipleChoice({ question, questionNumber, totalQuestions, onNext }: Props) {
    const [selected, setSelected] = useState<string | null>(null);

    const [checked, setChecked] = useState(false);

    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

    useEffect(() => {
        const shuffled = [...question.options].sort(() => Math.random() - 0.5);

        setShuffledOptions(shuffled);

        setSelected(null);

        setChecked(false);
    }, [question.id, question.options]);

    const isLocked = checked;

    const isCorrect = selected === question.answer;

    const optionLabel = useMemo(() => {
        return (option: string) => String.fromCharCode(65 + shuffledOptions.indexOf(option));
    }, [shuffledOptions]);

    return (
        <div className="mt-8 rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-950/10">
            {/* TOP */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* LEFT */}
                <div>
                    <p className="text-xs tracking-wider text-slate-400 uppercase">Pertanyaan</p>

                    <h3 className="mt-1 text-2xl font-black">
                        {questionNumber}/{totalQuestions}
                    </h3>

                    <p className="mt-2 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                        {question.points} poin
                    </p>
                </div>

                {/* PROGRESS */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800 md:w-52">
                    <div
                        className="h-full rounded-full bg-cyan-400 transition-all"
                        style={{
                            width: `${(questionNumber / totalQuestions) * 100}%`,
                        }}
                    />
                </div>
            </div>

            {/* QUESTION */}
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <h2 className="text-2xl leading-snug font-black">{question.question}</h2>
            </div>

            {/* OPTIONS */}
            <div className="mt-6 space-y-3">
                {shuffledOptions.map((option) => {
                    const active = selected === option;

                    return (
                        <button
                            key={option}
                            disabled={isLocked}
                            onClick={() => {
                                if (isLocked) {
                                    return;
                                }

                                setSelected(option);
                            }}
                            className={`w-full rounded-2xl border p-4 text-left transition-all ${
                                active ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:border-cyan-400/40'
                            } ${isLocked ? 'cursor-not-allowed opacity-80' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                {/* LETTER */}
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold ${
                                        active ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                                    }`}
                                >
                                    {optionLabel(option)}
                                </div>

                                {/* TEXT */}
                                <h3 className="text-base font-semibold">{option}</h3>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* CHECK BUTTON */}
            {!checked && (
                <div className="mt-6 flex justify-center">
                    <button
                        disabled={!selected}
                        onClick={() => setChecked(true)}
                        className="rounded-2xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Periksa Jawaban
                    </button>
                </div>
            )}

            {/* FEEDBACK */}
            {checked && (
                <>
                    <div
                        className={`mt-6 rounded-2xl border p-5 ${
                            isCorrect ? 'border-emerald-400/20 bg-emerald-400/10' : 'border-red-400/20 bg-red-400/10'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            {/* ICON */}
                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                    isCorrect ? 'bg-emerald-400/20 text-emerald-300' : 'bg-red-400/20 text-red-300'
                                }`}
                            >
                                {isCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                            </div>

                            {/* TEXT */}
                            <div>
                                <h3 className={`text-lg font-bold ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                                    {isCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat'}
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-slate-300">{question.explanation}</p>
                            </div>
                        </div>
                    </div>

                    {/* NEXT */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={() => onNext(isCorrect, question.points)}
                            className="inline-flex items-center gap-3 rounded-2xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:scale-105"
                        >
                            {questionNumber === totalQuestions ? 'Lihat Hasil' : 'Soal Berikutnya'}
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
