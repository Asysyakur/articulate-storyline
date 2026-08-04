import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, GraduationCap, Users, X } from 'lucide-react';
import { useState } from 'react';

type Progress = {
    activity_key: string;
    completed: boolean;
    payload: Record<string, unknown> | null;
    updated_at: string;
};

type LearningSession = {
    id: number;
    learner: { name: string; class_name: string };
    roles: { ketua?: string; penguji?: string; pencatat?: string };
    preferences: { music?: boolean; narration?: boolean; sfx?: boolean };
    last_active_at: string | null;
    created_at: string;
    progress: Progress[];
};

type PaginatedSessions = {
    data: LearningSession[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

type InvestigationModal = {
    learnerName: string;
    activity: string;
    answers: { problem_identification?: string; analysis_and_solution?: string };
};

const investigationActivityKeys = [
    'computational-thinking',
    'algorithm',
    'algorithm-completed',
    'data-representation',
    'data-representation-completed',
] as const;

const interactiveActivityKeys = ['reflection', ...investigationActivityKeys] as const;

const activityLabels: Record<string, string> = {
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
    evaluation: 'Kuis',
    reflection: 'Self Regulation (Fase 5)',
};

const reflectionLabels: Record<string, string> = {
    '1': 'Strategi paling membantu',
    '2': 'Bukti kesimpulan',
    '3': 'Memutuskan solusi',
    '4': 'Efisiensi penyelidikan',
    '5': 'Dugaan dan bukti',
    '6': 'Informasi penentu',
};

const formatDate = (value: string | null) =>
    value
        ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
        : 'Belum ada aktivitas';

export default function LearningData({
    summary,
    sessions,
}: {
    summary: { learners: number; sessions: number; completed_sessions: number };
    sessions: PaginatedSessions;
}) {
    const [reflectionModal, setReflectionModal] = useState<{ learnerName: string; answers: Record<string, unknown> } | null>(null);
    const [investigationModal, setInvestigationModal] = useState<InvestigationModal | null>(null);

    return (
        <AdminLayout>
            <Head title="Data Pembelajaran" />

            <div className="flex flex-1 flex-col gap-6">
                <div>
                    <p className="text-sm font-semibold text-cyan-300">DASHBOARD ADMIN</p>
                    <h1 className="mt-1 text-3xl font-black tracking-tight">Data Pembelajaran Peserta</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">Pantau sesi, peran tim, pengaturan audio, dan progres belajar yang tersimpan.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        { label: 'Peserta tercatat', value: summary.learners, icon: Users },
                        { label: 'Sesi belajar', value: summary.sessions, icon: ClipboardList },
                        { label: 'Refleksi selesai', value: summary.completed_sessions, icon: CheckCircle2 },
                    ].map((item) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-cyan-950/10">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-slate-400">{item.label}</p>
                                    <Icon className="size-5 text-cyan-300" />
                                </div>
                                <p className="mt-3 text-3xl font-black">{item.value}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-cyan-950/10">
                    <div className="border-b border-white/10 px-5 py-5">
                        <h2 className="font-semibold">Sesi terbaru</h2>
                        <p className="mt-1 text-sm text-slate-400">Klik peserta untuk melihat seluruh aktivitas yang sudah direkam.</p>
                    </div>

                    {sessions.data.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-slate-400">Belum ada data belajar yang masuk.</div>
                    ) : (
                        <div className="divide-y divide-white/10">
                            {sessions.data.map((session) => {
                                const completed = session.progress.filter((item) => item.completed).length;
                                const reflection = session.progress.find((item) => item.activity_key === 'reflection');
                                const reflectionAnswers = reflection?.payload?.answers;
                                const hasReflectionAnswers = reflectionAnswers && typeof reflectionAnswers === 'object';
                                return (
                                    <details key={session.id} className="group">
                                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition hover:bg-cyan-400/5">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                                                    <GraduationCap className="size-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold">{session.learner.name}</p>
                                                    <p className="text-sm text-muted-foreground">{session.learner.class_name} · Aktif {formatDate(session.last_active_at)}</p>
                                                </div>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="text-sm font-medium">{completed}/{session.progress.length} aktivitas selesai</p>
                                                <p className="text-xs text-muted-foreground">Sesi #{session.id}</p>
                                            </div>
                                        </summary>

                                        <div className="grid gap-5 border-t border-white/10 bg-slate-950/40 px-5 py-5 lg:grid-cols-[0.8fr_1.2fr]">
                                            <div className="space-y-4 text-sm">
                                                <div>
                                                    <p className="font-medium">Peran tim</p>
                                                    <dl className="mt-2 space-y-1 text-slate-400">
                                                        <div className="flex justify-between gap-3"><dt>Ketua</dt><dd>{session.roles.ketua || '—'}</dd></div>
                                                        <div className="flex justify-between gap-3"><dt>Penguji</dt><dd>{session.roles.penguji || '—'}</dd></div>
                                                        <div className="flex justify-between gap-3"><dt>Pencatat</dt><dd>{session.roles.pencatat || '—'}</dd></div>
                                                    </dl>
                                                </div>
                                                <div className="hidden">
                                                    <p className="font-medium">Audio</p>
                                                    <p className="mt-2 text-slate-400">
                                                        Musik {session.preferences.music ? 'aktif' : 'nonaktif'} · Narasi {session.preferences.narration ? 'aktif' : 'nonaktif'} · SFX {session.preferences.sfx ? 'aktif' : 'nonaktif'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="font-medium">Progres aktivitas</p>
                                                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                                    {session.progress.map((item) => (
                                                        <button
                                                            key={item.activity_key}
                                                            type="button"
                                                            onClick={() => {
                                                                const answers = item.payload?.answers;
                                                                if (item.activity_key === 'reflection' && answers && typeof answers === 'object') {
                                                                    setReflectionModal({ learnerName: session.learner.name, answers: answers as Record<string, unknown> });
                                                                }

                                                                const studentAnswers = item.payload?.student_answers;
                                                                if (investigationActivityKeys.includes(item.activity_key as (typeof investigationActivityKeys)[number]) && studentAnswers && typeof studentAnswers === 'object') {
                                                                    setInvestigationModal({
                                                                        learnerName: session.learner.name,
                                                                        activity: activityLabels[item.activity_key] ?? item.activity_key,
                                                                        answers: studentAnswers as InvestigationModal['answers'],
                                                                    });
                                                                }
                                                            }}
                                                            className={`w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left ${
                                                                interactiveActivityKeys.includes(item.activity_key as (typeof interactiveActivityKeys)[number])
                                                                    ? 'cursor-pointer transition hover:border-cyan-400/60 hover:bg-cyan-400/10'
                                                                    : 'cursor-default'
                                                            }`}
                                                        >
                                                            <div className="flex items-start justify-between gap-3">
                                                                <p className="text-sm font-medium">{activityLabels[item.activity_key] ?? item.activity_key}</p>
                                                                <span className={item.completed ? 'text-xs font-medium text-emerald-600' : 'text-xs font-medium text-amber-600'}>
                                                                    {item.completed ? 'Selesai' : 'Belum selesai'}
                                                                </span>
                                                            </div>
                                                            {item.activity_key === 'evaluation' && typeof item.payload?.score === 'number' && (
                                                                <p className="mt-1 text-xs text-muted-foreground">Nilai: {item.payload.score}</p>
                                                            )}
                                                            <p className="mt-1 text-xs text-muted-foreground">Diperbarui {formatDate(item.updated_at)}</p>
                                                        </button>
                                                    ))}
                                                </div>

                                                {hasReflectionAnswers && (
                                                    <div className="hidden">
                                                        <p className="font-semibold text-cyan-200">Jawaban Evaluasi Proses & Refleksi</p>
                                                        <div className="mt-3 space-y-3">
                                                            {Object.entries(reflectionAnswers).map(([id, answer]) => (
                                                                typeof answer === 'string' && answer.trim() && (
                                                                    <div key={id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                                                                        <p className="text-sm font-medium text-white">{reflectionLabels[id] ?? `Refleksi ${id}`}</p>
                                                                        <p className="mt-1 text-sm leading-relaxed text-slate-300">{answer}</p>
                                                                    </div>
                                                                )
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    )}

                    {sessions.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm">
                            <p className="text-slate-400">Halaman {sessions.current_page} dari {sessions.last_page}</p>
                            <div className="flex gap-2">
                                {sessions.prev_page_url && <Link href={sessions.prev_page_url} className="inline-flex items-center gap-1 rounded-md border px-3 py-2 hover:bg-muted"><ChevronLeft className="size-4" />Sebelumnya</Link>}
                                {sessions.next_page_url && <Link href={sessions.next_page_url} className="inline-flex items-center gap-1 rounded-md border px-3 py-2 hover:bg-muted">Berikutnya<ChevronRight className="size-4" /></Link>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {reflectionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Jawaban refleksi peserta">
                    <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-cyan-300">EVALUASI PROSES & REFLEKSI</p>
                                <h2 className="mt-1 text-2xl font-black">Jawaban {reflectionModal.learnerName}</h2>
                            </div>
                            <button type="button" onClick={() => setReflectionModal(null)} className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Tutup modal">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mt-6 space-y-4">
                            {Object.entries(reflectionModal.answers).map(([id, answer]) => (
                                typeof answer === 'string' && answer.trim() && (
                                    <div key={id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                                        <p className="text-sm font-semibold text-cyan-200">{reflectionLabels[id] ?? `Refleksi ${id}`}</p>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-300">{answer}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {investigationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Jawaban penyelidikan peserta">
                    <div className="w-full max-w-2xl rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-cyan-300">DATA PENYELIDIKAN</p>
                                <h2 className="mt-1 text-2xl font-black">{investigationModal.activity}</h2>
                                <p className="mt-1 text-sm text-slate-400">Jawaban {investigationModal.learnerName}</p>
                            </div>
                            <button type="button" onClick={() => setInvestigationModal(null)} className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Tutup modal">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                                <p className="text-sm font-semibold text-cyan-200">Identifikasi Masalah</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">{investigationModal.answers.problem_identification || 'Belum diisi'}</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                                <p className="text-sm font-semibold text-cyan-200">Analisis &amp; Solusi</p>
                                <p className="mt-2 text-sm leading-relaxed text-slate-300">{investigationModal.answers.analysis_and_solution || 'Belum diisi'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
