import { router } from '@inertiajs/react';
import {
    AlertTriangle,
    Check,
    CheckCircle2,
    Clock3,
    FileText,
    Lightbulb,
    Loader2,
    Pencil,
    Save,
    Search,
    Sparkles,
    X,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type EvaluationAnswer = {
    questionId: number;
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
    points: number;
};

export type ProgressItem = {
    activity_key: string;
    completed: boolean;
    payload: Record<string, unknown> | null;
    updated_at: string;
};

type InvestigationModalState = {
    activityKey: string;
    activityLabel: string;
    problemIdentification: string;
    analysisAndSolution: string;
    completed: boolean;
    isEditing: boolean;
};

type ReflectionModalState = {
    answers: Record<string, string>;
    completed: boolean;
    isEditing: boolean;
};

type EvaluationModalState = {
    score: number;
    totalScore: number;
    answers: EvaluationAnswer[];
    completed: boolean;
    isEditing: boolean;
};

type StatusModalState = {
    activityKey: string;
    activityLabel: string;
    description: string;
    completed: boolean;
};

// ─── CONSTANTS & LABELS ───────────────────────────────────────────────────────

export const activityLabels: Record<string, string> = {
    'problem-orientation': 'Interpretation (Fase 1)',
    'information-gathering': 'Analysis (Fase 2)',
    'computational-thinking': 'Membimbing Penyelidikan: Topologi',
    'algorithm-completed': 'Membimbing Penyelidikan: IP Address',
    algorithm: 'Membimbing Penyelidikan: IP Address',
    'data-representation-completed': 'Membimbing Penyelidikan: Gateway & DNS',
    'data-representation': 'Membimbing Penyelidikan: Gateway & DNS',
    'data-processing-completed': 'Inference: Pengolahan Data',
    'data-processing': 'Inference: Pengolahan Data',
    'diagnostic-practice': 'Praktik Diagnosis',
    'solution-development': 'Explanation (Fase 4)',
    evaluation: 'Kuis Evaluasi',
    reflection: 'Self Regulation (Fase 5)',
};

export const activityDescriptions: Record<string, string> = {
    'problem-orientation':
        'Fase 1 PBL (Interpretation): Siswa memahami orientasi masalah dan interpretasi skenario gangguan jaringan.',
    'information-gathering':
        'Fase 2 PBL (Analysis): Siswa mengumpulkan informasi penting dan menganalisis materi konsep dasar jaringan.',
    'computational-thinking':
        'Fase 3 PBL (Membimbing Penyelidikan): Penyelidikan kasus topologi jaringan dan pengisian analisis masalah.',
    algorithm:
        'Fase 3 PBL (Membimbing Penyelidikan): Penyelidikan pengalamatan IP address dan pengisian analisis solusi.',
    'algorithm-completed':
        'Fase 3 PBL (Membimbing Penyelidikan): Penyelidikan pengalamatan IP address dan pengisian analisis solusi.',
    'data-representation':
        'Fase 3 PBL (Membimbing Penyelidikan): Penyelidikan gateway & DNS server serta analisis solusi.',
    'data-representation-completed':
        'Fase 3 PBL (Membimbing Penyelidikan): Penyelidikan gateway & DNS server serta analisis solusi.',
    'diagnostic-practice':
        'Fase Hands-on: Praktik diagnosis perintah jaringan (ping gateway, cek link kabel, ping DNS).',
    'solution-development':
        'Fase 4 PBL (Explanation): Siswa menyusun urutan langkah penyelesaian masalah (troubleshooting) secara sistematis.',
    evaluation: 'Fase Evaluasi: Kuis pemahaman materi dan troubleshooting jaringan komputer.',
    reflection: 'Fase 5 PBL (Self Regulation): Evaluasi proses penyelidikan dan refleksi diri pembelajaran.',
};

export const investigationActivityKeys = [
    'computational-thinking',
    'algorithm',
    'algorithm-completed',
    'data-representation',
    'data-representation-completed',
] as const;

export const reflectionLabels: Record<string, string> = {
    '1': 'Strategi paling membantu',
    '2': 'Bukti kesimpulan',
    '3': 'Memutuskan solusi',
    '4': 'Efisiensi penyelidikan',
    '5': 'Dugaan dan bukti',
    '6': 'Informasi penentu',
};

// ─── COMPONENT: ACTIVITY PROGRESS GRID ────────────────────────────────────────

interface ActivityProgressGridProps {
    sessionId: number;
    progress: ProgressItem[];
    learnerName: string;
}

export default function ActivityProgressGrid({
    sessionId,
    progress,
    learnerName,
}: ActivityProgressGridProps) {
    const [investigationModal, setInvestigationModal] =
        useState<InvestigationModalState | null>(null);
    const [reflectionModal, setReflectionModal] =
        useState<ReflectionModalState | null>(null);
    const [evaluationModal, setEvaluationModal] =
        useState<EvaluationModalState | null>(null);
    const [statusModal, setStatusModal] = useState<StatusModalState | null>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const showSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(null), 3500);
    };

    const handleCardClick = (item: ProgressItem) => {
        const isInvestigation = investigationActivityKeys.includes(
            item.activity_key as (typeof investigationActivityKeys)[number],
        );
        const isReflection = item.activity_key === 'reflection';
        const isEvaluation = item.activity_key === 'evaluation';

        // 1. Investigation activity
        if (isInvestigation) {
            const studentAnswers = item.payload?.student_answers as
                | { problem_identification?: string; analysis_and_solution?: string }
                | undefined;

            setInvestigationModal({
                activityKey: item.activity_key,
                activityLabel: activityLabels[item.activity_key] ?? item.activity_key,
                problemIdentification: studentAnswers?.problem_identification?.trim() || '',
                analysisAndSolution: studentAnswers?.analysis_and_solution?.trim() || '',
                completed: item.completed,
                isEditing: false,
            });
            return;
        }

        // 2. Reflection activity
        if (isReflection) {
            const rawAnswers = (item.payload?.answers as Record<string, string>) || {};
            const cleanAnswers: Record<string, string> = {};
            ['1', '2', '3', '4', '5', '6'].forEach((k) => {
                cleanAnswers[k] = rawAnswers[k] || '';
            });

            setReflectionModal({
                answers: cleanAnswers,
                completed: item.completed,
                isEditing: false,
            });
            return;
        }

        // 3. Evaluation activity
        if (isEvaluation) {
            const score = typeof item.payload?.score === 'number' ? item.payload.score : 0;
            const totalScore =
                typeof item.payload?.totalScore === 'number' ? item.payload.totalScore : 100;
            const rawAnswers = item.payload?.answers;
            const answers = Array.isArray(rawAnswers)
                ? (JSON.parse(JSON.stringify(rawAnswers)) as EvaluationAnswer[])
                : [];

            setEvaluationModal({
                score,
                totalScore,
                answers,
                completed: item.completed,
                isEditing: false,
            });
            return;
        }

        // 4. Simple activity without text answers (Orientation, Analysis, Diagnostic, Solution Dev, etc.)
        setStatusModal({
            activityKey: item.activity_key,
            activityLabel: activityLabels[item.activity_key] ?? item.activity_key,
            description:
                activityDescriptions[item.activity_key] ??
                'Aktivitas modul pembelajaran pada sistem Network Lab.',
            completed: item.completed,
        });
    };

    // ─── SAVE INVESTIGATION ───────────────────────────────────────────────────
    const handleSaveInvestigation = () => {
        if (!investigationModal) return;
        setIsSaving(true);

        router.put(
            route('admin.sessions.progress.update', [
                sessionId,
                investigationModal.activityKey,
            ]),
            {
                completed: investigationModal.completed,
                payload: {
                    student_answers: {
                        problem_identification: investigationModal.problemIdentification,
                        analysis_and_solution: investigationModal.analysisAndSolution,
                    },
                },
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSaving(false);
                    setInvestigationModal((prev) => (prev ? { ...prev, isEditing: false } : null));
                    showSuccess('Data penyelidikan berhasil diperbarui.');
                },
                onError: () => setIsSaving(false),
            },
        );
    };

    // ─── SAVE REFLECTION ──────────────────────────────────────────────────────
    const handleSaveReflection = () => {
        if (!reflectionModal) return;
        setIsSaving(true);

        router.put(
            route('admin.sessions.progress.update', [sessionId, 'reflection']),
            {
                completed: reflectionModal.completed,
                payload: {
                    answers: reflectionModal.answers,
                },
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSaving(false);
                    setReflectionModal((prev) => (prev ? { ...prev, isEditing: false } : null));
                    showSuccess('Jawaban refleksi berhasil diperbarui.');
                },
                onError: () => setIsSaving(false),
            },
        );
    };

    // ─── SAVE EVALUATION ──────────────────────────────────────────────────────
    const handleSaveEvaluation = () => {
        if (!evaluationModal) return;
        setIsSaving(true);

        router.put(
            route('admin.sessions.progress.update', [sessionId, 'evaluation']),
            {
                completed: evaluationModal.completed,
                payload: {
                    score: Number(evaluationModal.score),
                    totalScore: Number(evaluationModal.totalScore),
                    answers: evaluationModal.answers,
                },
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSaving(false);
                    setEvaluationModal((prev) => (prev ? { ...prev, isEditing: false } : null));
                    showSuccess('Hasil evaluasi berhasil diperbarui.');
                },
                onError: () => setIsSaving(false),
            },
        );
    };

    // ─── SAVE SIMPLE STATUS (TOGGLE) ──────────────────────────────────────────
    const handleSaveSimpleStatus = () => {
        if (!statusModal) return;
        setIsSaving(true);

        router.put(
            route('admin.sessions.progress.update', [sessionId, statusModal.activityKey]),
            {
                completed: statusModal.completed,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSaving(false);
                    setStatusModal(null);
                    showSuccess(`Status ${statusModal.activityLabel} berhasil diperbarui.`);
                },
                onError: () => setIsSaving(false),
            },
        );
    };

    return (
        <>
            <div className="grid gap-2.5 sm:grid-cols-2">
                {progress.map((item) => {
                    const isInvestigation = investigationActivityKeys.includes(
                        item.activity_key as (typeof investigationActivityKeys)[number],
                    );
                    const isReflection = item.activity_key === 'reflection';
                    const isEvaluation = item.activity_key === 'evaluation';
                    const hasDetailedModal = isInvestigation || isReflection || isEvaluation;

                    return (
                        <button
                            key={item.activity_key}
                            type="button"
                            onClick={() => handleCardClick(item)}
                            className="group relative w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-3.5 text-left transition-all hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-950/20"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold leading-snug text-slate-100 transition-colors group-hover:text-cyan-200">
                                    {activityLabels[item.activity_key] ?? item.activity_key}
                                </p>
                                <span
                                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                        item.completed
                                            ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                            : 'border border-amber-500/30 bg-amber-500/10 text-amber-400'
                                    }`}
                                >
                                    <span
                                        className={`size-1.5 rounded-full ${
                                            item.completed ? 'bg-emerald-400' : 'bg-amber-400'
                                        }`}
                                    />
                                    {item.completed ? 'Selesai' : 'Belum selesai'}
                                </span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center justify-between gap-1 border-t border-white/5 pt-2 text-xs text-slate-400">
                                {isEvaluation && typeof item.payload?.score === 'number' ? (
                                    <span className="font-semibold text-cyan-300">
                                        Nilai: {item.payload.score}
                                        {typeof item.payload.totalScore === 'number' &&
                                            `/${item.payload.totalScore}`}
                                    </span>
                                ) : (
                                    <span />
                                )}
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                                    {hasDetailedModal ? 'Lihat / Edit →' : 'Ubah Status →'}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* ─── MODAL 0: SIMPLE STATUS TOGGLE MODAL ─── */}
            {statusModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Ubah status aktivitas"
                >
                    <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                    STATUS AKTIVITAS
                                </p>
                                <h2 className="mt-1 text-2xl font-black text-white">
                                    {statusModal.activityLabel}
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Peserta:{' '}
                                    <span className="font-semibold text-slate-200">
                                        {learnerName}
                                    </span>
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStatusModal(null)}
                                className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                aria-label="Tutup modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mt-4 rounded-xl border border-white/5 bg-slate-950/60 p-3.5 text-xs text-slate-400 leading-relaxed">
                            {statusModal.description}
                        </div>

                        <div className="mt-6 space-y-3">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                                Pilih Status Aktivitas:
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setStatusModal((prev) =>
                                            prev ? { ...prev, completed: true } : null,
                                        )
                                    }
                                    className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 text-sm font-bold transition ${
                                        statusModal.completed
                                            ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-950/30'
                                            : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}
                                >
                                    <CheckCircle2 size={18} />
                                    Selesai
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setStatusModal((prev) =>
                                            prev ? { ...prev, completed: false } : null,
                                        )
                                    }
                                    className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 text-sm font-bold transition ${
                                        !statusModal.completed
                                            ? 'border-amber-400 bg-amber-500/20 text-amber-300 shadow-lg shadow-amber-950/30'
                                            : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                                    }`}
                                >
                                    <Clock3 size={18} />
                                    Belum Selesai
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                            <button
                                type="button"
                                onClick={() => setStatusModal(null)}
                                disabled={isSaving}
                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveSimpleStatus}
                                disabled={isSaving}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={15} className="animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <Save size={15} />
                                        Simpan Status
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MODAL 1: INVESTIGATION DATA ─── */}
            {investigationModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Data penyelidikan siswa"
                >
                    <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                    DATA PENYELIDIKAN
                                </p>
                                <h2 className="mt-1 text-2xl font-black text-white">
                                    {investigationModal.activityLabel}
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Peserta:{' '}
                                    <span className="font-semibold text-slate-200">
                                        {learnerName}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!investigationModal.isEditing && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setInvestigationModal((prev) =>
                                                prev ? { ...prev, isEditing: true } : null,
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                                    >
                                        <Pencil size={13} />
                                        Edit Data
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setInvestigationModal(null)}
                                    className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    aria-label="Tutup modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Success notification */}
                        {successMessage && (
                            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
                                <Check size={14} />
                                {successMessage}
                            </div>
                        )}

                        {/* Content: View or Edit Mode */}
                        {!investigationModal.isEditing ? (
                            <div className="mt-6 space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {/* Identifikasi Masalah */}
                                    <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                                                <Search size={15} />
                                            </div>
                                            <p className="text-sm font-semibold text-cyan-200">
                                                Identifikasi Masalah
                                            </p>
                                        </div>
                                        <div className="mt-3 flex-1 rounded-xl border border-white/5 bg-slate-900/80 p-3.5">
                                            {investigationModal.problemIdentification ? (
                                                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                                                    {investigationModal.problemIdentification}
                                                </p>
                                            ) : (
                                                <p className="text-sm italic text-slate-500">
                                                    Belum ada jawaban identifikasi masalah.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Analisis & Solusi */}
                                    <div className="flex flex-col rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                                                <Lightbulb size={15} />
                                            </div>
                                            <p className="text-sm font-semibold text-emerald-200">
                                                Analisis & Solusi
                                            </p>
                                        </div>
                                        <div className="mt-3 flex-1 rounded-xl border border-white/5 bg-slate-900/80 p-3.5">
                                            {investigationModal.analysisAndSolution ? (
                                                <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                                                    {investigationModal.analysisAndSolution}
                                                </p>
                                            ) : (
                                                <p className="text-sm italic text-slate-500">
                                                    Belum ada analisis dan solusi.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <span
                                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                            investigationModal.completed
                                                ? 'text-emerald-400'
                                                : 'text-amber-400'
                                        }`}
                                    >
                                        <span
                                            className={`size-2 rounded-full ${
                                                investigationModal.completed
                                                    ? 'bg-emerald-400'
                                                    : 'bg-amber-400'
                                            }`}
                                        />
                                        Status:{' '}
                                        {investigationModal.completed ? 'Selesai' : 'Belum selesai'}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => setInvestigationModal(null)}
                                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* EDIT MODE */
                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                        Identifikasi Masalah
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={investigationModal.problemIdentification}
                                        onChange={(e) =>
                                            setInvestigationModal((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          problemIdentification: e.target.value,
                                                      }
                                                    : null,
                                            )
                                        }
                                        placeholder="Masukkan teks identifikasi masalah siswa..."
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-300">
                                        Analisis & Solusi
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={investigationModal.analysisAndSolution}
                                        onChange={(e) =>
                                            setInvestigationModal((prev) =>
                                                prev
                                                    ? {
                                                          ...prev,
                                                          analysisAndSolution: e.target.value,
                                                      }
                                                    : null,
                                            )
                                        }
                                        placeholder="Masukkan analisis & solusi siswa..."
                                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                                        <input
                                            type="checkbox"
                                            checked={investigationModal.completed}
                                            onChange={(e) =>
                                                setInvestigationModal((prev) =>
                                                    prev
                                                        ? { ...prev, completed: e.target.checked }
                                                        : null,
                                                )
                                            }
                                            className="size-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
                                        />
                                        Tandai aktivitas ini selesai
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setInvestigationModal((prev) =>
                                                prev ? { ...prev, isEditing: false } : null,
                                            )
                                        }
                                        disabled={isSaving}
                                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveInvestigation}
                                        disabled={isSaving}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={15} className="animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={15} />
                                                Simpan Perubahan
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ─── MODAL 2: REFLECTION ANSWERS ─── */}
            {reflectionModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Jawaban refleksi siswa"
                >
                    <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                    EVALUASI PROSES & REFLEKSI
                                </p>
                                <h2 className="mt-1 text-2xl font-black text-white">
                                    Jawaban Refleksi
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Peserta:{' '}
                                    <span className="font-semibold text-slate-200">
                                        {learnerName}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!reflectionModal.isEditing && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setReflectionModal((prev) =>
                                                prev ? { ...prev, isEditing: true } : null,
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                                    >
                                        <Pencil size={13} />
                                        Edit Refleksi
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setReflectionModal(null)}
                                    className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    aria-label="Tutup modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Success notification */}
                        {successMessage && (
                            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
                                <Check size={14} />
                                {successMessage}
                            </div>
                        )}

                        {/* Content */}
                        {!reflectionModal.isEditing ? (
                            <div className="mt-6 space-y-3.5">
                                {Object.entries(reflectionLabels).map(([id, label]) => {
                                    const answer = reflectionModal.answers[id];
                                    return (
                                        <div
                                            key={id}
                                            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="flex size-6 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-bold text-cyan-300">
                                                    {id}
                                                </span>
                                                <p className="text-sm font-semibold text-cyan-200">
                                                    {label}
                                                </p>
                                            </div>
                                            <div className="mt-2.5 rounded-xl border border-white/5 bg-slate-900/80 p-3.5">
                                                {answer ? (
                                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                                                        {answer}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm italic text-slate-500">
                                                        Belum ada jawaban refleksi untuk pertanyaan
                                                        ini.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <span
                                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                                            reflectionModal.completed
                                                ? 'text-emerald-400'
                                                : 'text-amber-400'
                                        }`}
                                    >
                                        <span
                                            className={`size-2 rounded-full ${
                                                reflectionModal.completed
                                                    ? 'bg-emerald-400'
                                                    : 'bg-amber-400'
                                            }`}
                                        />
                                        Status:{' '}
                                        {reflectionModal.completed ? 'Selesai' : 'Belum selesai'}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => setReflectionModal(null)}
                                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* EDIT REFLECTION */
                            <div className="mt-6 space-y-4">
                                {Object.entries(reflectionLabels).map(([id, label]) => (
                                    <div key={id}>
                                        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                            <span className="flex size-5 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                                                {id}
                                            </span>
                                            {label}
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={reflectionModal.answers[id] || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setReflectionModal((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              answers: {
                                                                  ...prev.answers,
                                                                  [id]: val,
                                                              },
                                                          }
                                                        : null,
                                                );
                                            }}
                                            placeholder={`Jawaban refleksi ${id}...`}
                                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                                        />
                                    </div>
                                ))}

                                <div className="flex items-center gap-2 pt-1">
                                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                                        <input
                                            type="checkbox"
                                            checked={reflectionModal.completed}
                                            onChange={(e) =>
                                                setReflectionModal((prev) =>
                                                    prev
                                                        ? { ...prev, completed: e.target.checked }
                                                        : null,
                                                )
                                            }
                                            className="size-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
                                        />
                                        Tandai refleksi selesai
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setReflectionModal((prev) =>
                                                prev ? { ...prev, isEditing: false } : null,
                                            )
                                        }
                                        disabled={isSaving}
                                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveReflection}
                                        disabled={isSaving}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={15} className="animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={15} />
                                                Simpan Refleksi
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ─── MODAL 3: EVALUATION DETAIL ─── */}
            {evaluationModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Detail evaluasi siswa"
                >
                    <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                                    HASIL KUIS EVALUASI
                                </p>
                                <h2 className="mt-1 text-2xl font-black text-white">
                                    Detail Hasil Siswa
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Peserta:{' '}
                                    <span className="font-semibold text-slate-200">
                                        {learnerName}
                                    </span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {!evaluationModal.isEditing && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEvaluationModal((prev) =>
                                                prev ? { ...prev, isEditing: true } : null,
                                            )
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                                    >
                                        <Pencil size={13} />
                                        Edit Nilai & Jawaban
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setEvaluationModal(null)}
                                    className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    aria-label="Tutup modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Success notification */}
                        {successMessage && (
                            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-semibold text-emerald-300">
                                <Check size={14} />
                                {successMessage}
                            </div>
                        )}

                        {!evaluationModal.isEditing ? (
                            <>
                                {/* Score Banner */}
                                {(() => {
                                    const pct =
                                        evaluationModal.totalScore > 0
                                            ? Math.round(
                                                  (evaluationModal.score /
                                                      evaluationModal.totalScore) *
                                                      100,
                                              )
                                            : 0;
                                    const isPassed = pct >= 75;

                                    return (
                                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-400/20 bg-cyan-950/30 p-5">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`flex size-14 items-center justify-center rounded-2xl ${
                                                        isPassed
                                                            ? 'bg-emerald-400/10 text-emerald-300'
                                                            : 'bg-amber-400/10 text-amber-300'
                                                    }`}
                                                >
                                                    <Sparkles size={28} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-slate-400">
                                                        Skor Akhir
                                                    </p>
                                                    <p className="text-3xl font-black text-white">
                                                        {evaluationModal.score}
                                                        <span className="text-base font-normal text-slate-400">
                                                            /{evaluationModal.totalScore}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                                        isPassed
                                                            ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                                                            : 'border border-amber-500/30 bg-amber-500/10 text-amber-300'
                                                    }`}
                                                >
                                                    {isPassed ? (
                                                        <CheckCircle2 size={13} />
                                                    ) : (
                                                        <AlertTriangle size={13} />
                                                    )}
                                                    {isPassed ? 'Lulus Kriteria' : 'Perlu Remedial'}
                                                </span>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Tingkat Ketuntasan: {pct}%
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {/* Breakdown per Soal */}
                                <div className="mt-6">
                                    <p className="text-sm font-semibold text-slate-200">
                                        Rincian Jawaban Per Soal
                                        {evaluationModal.answers.length > 0 &&
                                            ` (${evaluationModal.answers.length} Soal)`}
                                    </p>

                                    {evaluationModal.answers.length === 0 ? (
                                        <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/50 p-6 text-center text-sm text-slate-400">
                                            <FileText className="mx-auto mb-2 size-8 text-slate-500" />
                                            Data rincian per soal belum terekam pada sesi pengerjaan
                                            ini.
                                            <br />
                                            <span className="text-xs text-slate-500">
                                                (Anda dapat mengedit atau memasukkan nilai akhir
                                                secara manual dengan menekan tombol Edit di atas).
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="mt-3 space-y-3.5">
                                            {evaluationModal.answers.map((ans, idx) => (
                                                <div
                                                    key={ans.questionId ?? idx}
                                                    className={`rounded-2xl border p-4 transition-all ${
                                                        ans.isCorrect
                                                            ? 'border-emerald-500/20 bg-emerald-950/10'
                                                            : 'border-rose-500/20 bg-rose-950/10'
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex items-start gap-2.5">
                                                            <span
                                                                className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                                                                    ans.isCorrect
                                                                        ? 'bg-emerald-400/20 text-emerald-300'
                                                                        : 'bg-rose-400/20 text-rose-300'
                                                                }`}
                                                            >
                                                                {idx + 1}
                                                            </span>
                                                            <p className="text-sm font-semibold text-slate-100">
                                                                {ans.question}
                                                            </p>
                                                        </div>
                                                        <span
                                                            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                                ans.isCorrect
                                                                    ? 'text-emerald-400'
                                                                    : 'text-rose-400'
                                                            }`}
                                                        >
                                                            {ans.isCorrect ? (
                                                                <>
                                                                    <CheckCircle2 size={13} />
                                                                    Benar (+{ans.points})
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <XCircle size={13} />
                                                                    Salah (0)
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs">
                                                        <div className="rounded-xl border border-white/5 bg-slate-900/80 p-3">
                                                            <p className="font-medium text-slate-400">
                                                                Jawaban Siswa:
                                                            </p>
                                                            <p
                                                                className={`mt-1 font-semibold ${
                                                                    ans.isCorrect
                                                                        ? 'text-emerald-300'
                                                                        : 'text-rose-300'
                                                                }`}
                                                            >
                                                                {ans.selectedAnswer || '—'}
                                                            </p>
                                                        </div>
                                                        <div className="rounded-xl border border-white/5 bg-slate-900/80 p-3">
                                                            <p className="font-medium text-slate-400">
                                                                Kunci Jawaban Benar:
                                                            </p>
                                                            <p className="mt-1 font-semibold text-emerald-300">
                                                                {ans.correctAnswer || '—'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {ans.explanation && (
                                                        <div className="mt-2.5 rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs text-slate-300">
                                                            <span className="font-semibold text-cyan-300">
                                                                Penjelasan:{' '}
                                                            </span>
                                                            {ans.explanation}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setEvaluationModal(null)}
                                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* EDIT EVALUATION */
                            <div className="mt-6 space-y-5">
                                <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                            Skor Siswa
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max={evaluationModal.totalScore || 100}
                                            value={evaluationModal.score}
                                            onChange={(e) =>
                                                setEvaluationModal((prev) =>
                                                    prev
                                                        ? { ...prev, score: Number(e.target.value) }
                                                        : null,
                                                )
                                            }
                                            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-lg font-bold text-cyan-300 focus:border-cyan-400 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Total Skor Maksimal
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={evaluationModal.totalScore}
                                            onChange={(e) =>
                                                setEvaluationModal((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              totalScore: Number(e.target.value),
                                                          }
                                                        : null,
                                                )
                                            }
                                            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-lg font-bold text-white focus:border-cyan-400 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                                        <input
                                            type="checkbox"
                                            checked={evaluationModal.completed}
                                            onChange={(e) =>
                                                setEvaluationModal((prev) =>
                                                    prev
                                                        ? { ...prev, completed: e.target.checked }
                                                        : null,
                                                )
                                            }
                                            className="size-4 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-400"
                                        />
                                        Tandai kuis evaluasi selesai
                                    </label>
                                </div>

                                {evaluationModal.answers.length > 0 && (
                                    <div className="space-y-4">
                                        <p className="text-sm font-semibold text-slate-200">
                                            Edit Pilihan Jawaban Siswa Per Soal:
                                        </p>
                                        {evaluationModal.answers.map((ans, idx) => (
                                            <div
                                                key={ans.questionId ?? idx}
                                                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 space-y-3"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-sm font-semibold text-white">
                                                        #{idx + 1} {ans.question}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newAnswers = [
                                                                ...evaluationModal.answers,
                                                            ];
                                                            newAnswers[idx] = {
                                                                ...newAnswers[idx],
                                                                isCorrect:
                                                                    !newAnswers[idx].isCorrect,
                                                            };
                                                            setEvaluationModal((prev) =>
                                                                prev
                                                                    ? {
                                                                          ...prev,
                                                                          answers: newAnswers,
                                                                      }
                                                                    : null,
                                                            );
                                                        }}
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition ${
                                                            ans.isCorrect
                                                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                                        }`}
                                                    >
                                                        {ans.isCorrect ? 'Status: Benar' : 'Status: Salah'}
                                                    </button>
                                                </div>

                                                <div className="grid gap-3 sm:grid-cols-2">
                                                    <div>
                                                        <label className="text-xs text-slate-400">
                                                            Jawaban Siswa:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={ans.selectedAnswer || ''}
                                                            onChange={(e) => {
                                                                const newAnswers = [
                                                                    ...evaluationModal.answers,
                                                                ];
                                                                newAnswers[idx] = {
                                                                    ...newAnswers[idx],
                                                                    selectedAnswer: e.target.value,
                                                                };
                                                                setEvaluationModal((prev) =>
                                                                    prev
                                                                        ? {
                                                                              ...prev,
                                                                              answers: newAnswers,
                                                                          }
                                                                        : null,
                                                                );
                                                            }}
                                                            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-slate-400">
                                                            Poin Soal:
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={ans.points ?? 0}
                                                            onChange={(e) => {
                                                                const newAnswers = [
                                                                    ...evaluationModal.answers,
                                                                ];
                                                                newAnswers[idx] = {
                                                                    ...newAnswers[idx],
                                                                    points: Number(e.target.value),
                                                                };
                                                                setEvaluationModal((prev) =>
                                                                    prev
                                                                        ? {
                                                                              ...prev,
                                                                              answers: newAnswers,
                                                                          }
                                                                        : null,
                                                                );
                                                            }}
                                                            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 p-2.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEvaluationModal((prev) =>
                                                prev ? { ...prev, isEditing: false } : null,
                                            )
                                        }
                                        disabled={isSaving}
                                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveEvaluation}
                                        disabled={isSaving}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 size={15} className="animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={15} />
                                                Simpan Hasil Evaluasi
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
