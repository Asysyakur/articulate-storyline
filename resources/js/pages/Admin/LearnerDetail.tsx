import ActivityProgressGrid, { type ProgressItem } from '@/components/Admin/ActivityProgressGrid';
import EditRolesModal from '@/components/Admin/EditRolesModal';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, ClipboardList, GraduationCap, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Session = {
    id: number;
    roles: { ketua?: string; penguji?: string; pencatat?: string };
    preferences: { music?: boolean; narration?: boolean; sfx?: boolean };
    last_active_at: string | null;
    created_at: string;
    progress: ProgressItem[];
};

type LearnerData = {
    id: number;
    name: string;
    class_name: string;
    created_at: string;
};

const formatDate = (value: string | null) =>
    value
        ? new Intl.DateTimeFormat('id-ID', {
              dateStyle: 'medium',
              timeStyle: 'short',
          }).format(new Date(value))
        : 'Belum ada aktivitas';

// ─── DELETE SESSION MODAL ─────────────────────────────────────────────────────

function DeleteSessionModal({
    sessionId,
    learnerName,
    onClose,
}: {
    sessionId: number;
    learnerName: string;
    onClose: () => void;
}) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(route('admin.sessions.destroy', sessionId), {
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                onClose();
            },
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-5 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Konfirmasi hapus sesi"
        >
            <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-6 shadow-2xl shadow-red-950/40">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400">
                            <Trash2 size={22} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                                HAPUS SESI BELAJAR
                            </p>
                            <h2 className="mt-0.5 text-xl font-black text-white">
                                Sesi #{sessionId}
                            </h2>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white/5 p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        aria-label="Tutup modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    Apakah Anda yakin ingin menghapus <strong className="text-white">Sesi #{sessionId}</strong> milik siswa{' '}
                    <strong className="text-cyan-300">{learnerName}</strong>? Semua riwayat progres dan jawaban aktivitas di sesi ini akan dihapus permanen.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={processing}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-400 disabled:opacity-60"
                    >
                        <Trash2 size={16} />
                        {processing ? 'Menghapus...' : 'Hapus Sesi'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── SESSION CARD ─────────────────────────────────────────────────────────────

function SessionCard({
    session,
    learnerName,
}: {
    session: Session;
    learnerName: string;
}) {
    const [isEditingRoles, setIsEditingRoles] = useState(false);
    const [isDeletingSession, setIsDeletingSession] = useState(false);
    const completed = session.progress.filter((p) => p.completed).length;
    const evaluationProgress = session.progress.find((p) => p.activity_key === 'evaluation');
    const score =
        typeof evaluationProgress?.payload?.score === 'number'
            ? evaluationProgress.payload.score
            : null;

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            {/* SESSION HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                        <ClipboardList size={18} />
                    </div>
                    <div>
                        <p className="font-semibold">Sesi #{session.id}</p>
                        <p className="text-xs text-slate-400">
                            Mulai {formatDate(session.created_at)} · Aktif{' '}
                            {formatDate(session.last_active_at)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-medium">
                            {completed}/{session.progress.length} aktivitas selesai
                        </p>
                        {score !== null && (
                            <p className="text-xs text-cyan-300">Nilai kuis: {score}</p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsDeletingSession(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                        title="Hapus sesi ini"
                    >
                        <Trash2 size={13} />
                        Hapus Sesi
                    </button>
                </div>
            </div>

            {/* SESSION BODY */}
            <div className="mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                {/* ROLES */}
                <div className="space-y-4 text-sm">
                    <div>
                        <div className="flex items-center justify-between">
                            <p className="font-medium text-slate-300">Peran Tim</p>
                            <button
                                type="button"
                                onClick={() => setIsEditingRoles(true)}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                            >
                                <Pencil size={12} />
                                Edit Peran
                            </button>
                        </div>
                        <dl className="mt-2 space-y-1 text-slate-400">
                            <div className="flex justify-between gap-3">
                                <dt>Ketua</dt>
                                <dd>{session.roles.ketua || '—'}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt>Penguji</dt>
                                <dd>{session.roles.penguji || '—'}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt>Pencatat</dt>
                                <dd>{session.roles.pencatat || '—'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* PROGRESS */}
                <div>
                    <p className="text-sm font-medium text-slate-300">Progres Aktivitas</p>
                    <div className="mt-3">
                        <ActivityProgressGrid
                            sessionId={session.id}
                            progress={session.progress}
                            learnerName={learnerName}
                        />
                    </div>
                </div>
            </div>

            {isEditingRoles && (
                <EditRolesModal
                    sessionId={session.id}
                    initialRoles={session.roles}
                    learnerName={learnerName}
                    onClose={() => setIsEditingRoles(false)}
                />
            )}

            {isDeletingSession && (
                <DeleteSessionModal
                    sessionId={session.id}
                    learnerName={learnerName}
                    onClose={() => setIsDeletingSession(false)}
                />
            )}
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function LearnerDetail({
    learner,
    sessions,
}: {
    learner: LearnerData;
    sessions: Session[];
}) {
    const completedSessions = sessions.filter((s) =>
        s.progress.some((p) => p.activity_key === 'reflection' && p.completed),
    ).length;

    const evaluationScores = sessions
        .flatMap((s) => s.progress)
        .filter((p) => p.activity_key === 'evaluation' && typeof p.payload?.score === 'number')
        .map((p) => p.payload!.score as number);

    const avgScore =
        evaluationScores.length > 0
            ? Math.round(evaluationScores.reduce((a, b) => a + b, 0) / evaluationScores.length)
            : null;

    return (
        <AdminLayout>
            <Head title={`Detail — ${learner.name}`} />

            <div className="flex flex-1 flex-col gap-6">
                {/* BACK BUTTON */}
                <div>
                    <Link
                        href={route('admin.learners.index')}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-300"
                    >
                        <ArrowLeft size={15} />
                        Kembali ke Daftar Siswa
                    </Link>
                </div>

                {/* LEARNER HEADER */}
                <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                        <GraduationCap size={30} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-cyan-300">DETAIL SISWA</p>
                        <h1 className="mt-0.5 text-3xl font-black">{learner.name}</h1>
                        <p className="mt-1 text-slate-400">{learner.class_name}</p>
                        <p className="mt-1 text-xs text-slate-500">
                            ID #{learner.id} · Terdaftar {formatDate(learner.created_at)}
                        </p>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Total Sesi Belajar', value: sessions.length },
                        { label: 'Sesi Selesai (Refleksi)', value: completedSessions },
                        {
                            label: 'Rata-rata Nilai Kuis',
                            value: avgScore !== null ? avgScore : '—',
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-cyan-950/10"
                        >
                            <p className="text-sm text-slate-400">{item.label}</p>
                            <p className="mt-2 text-3xl font-black">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* SESSIONS */}
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-semibold text-slate-300">
                            Riwayat Sesi Belajar ({sessions.length})
                        </h2>
                        <button
                            type="button"
                            onClick={() =>
                                router.post(
                                    route('admin.learners.sessions.store', learner.id),
                                )
                            }
                            className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
                        >
                            <Plus size={14} />
                            Buat Sesi Baru
                        </button>
                    </div>

                    {sessions.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-12 text-center text-sm text-slate-400">
                            <p>Siswa ini belum memiliki sesi belajar.</p>
                            <button
                                type="button"
                                onClick={() =>
                                    router.post(
                                        route('admin.learners.sessions.store', learner.id),
                                    )
                                }
                                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                            >
                                <Plus size={16} />
                                Buat Sesi Belajar Sekarang
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {sessions.map((session) => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                    learnerName={learner.name}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
