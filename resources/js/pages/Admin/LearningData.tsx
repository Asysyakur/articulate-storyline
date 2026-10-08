import ActivityProgressGrid, { type ProgressItem } from '@/components/Admin/ActivityProgressGrid';
import EditRolesModal from '@/components/Admin/EditRolesModal';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle2, ChevronLeft, ChevronRight, ClipboardList, GraduationCap, Pencil, Trash2, Users, X } from 'lucide-react';
import { useState } from 'react';

type LearningSession = {
    id: number;
    learner: { name: string; class_name: string };
    roles: { ketua?: string; penguji?: string; pencatat?: string };
    preferences: { music?: boolean; narration?: boolean; sfx?: boolean };
    last_active_at: string | null;
    created_at: string;
    progress: ProgressItem[];
};

type PaginatedSessions = {
    data: LearningSession[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

const formatDate = (value: string | null) =>
    value
        ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
        : 'Belum ada aktivitas';

function DeleteSessionModal({
    session,
    onClose,
}: {
    session: LearningSession;
    onClose: () => void;
}) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(route('admin.sessions.destroy', session.id), {
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
                                Sesi #{session.id}
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
                    Apakah Anda yakin ingin menghapus <strong className="text-white">Sesi #{session.id}</strong> milik siswa{' '}
                    <strong className="text-cyan-300">{session.learner.name}</strong>? Semua riwayat progres dan jawaban aktivitas di sesi ini akan dihapus permanen.
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

export default function LearningData({
    summary,
    sessions,
}: {
    summary: { learners: number; sessions: number; completed_sessions: number };
    sessions: PaginatedSessions;
}) {
    const [editingRolesSession, setEditingRolesSession] = useState<LearningSession | null>(null);
    const [deletingSession, setDeletingSession] = useState<LearningSession | null>(null);

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

                                        <div className="border-t border-white/10 bg-slate-950/40 px-5 py-5">
                                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                                                <p className="text-xs text-slate-400">
                                                    Sesi #{session.id} · Dibuat: {formatDate(session.created_at)}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => setDeletingSession(session)}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                                                    title="Hapus sesi ini"
                                                >
                                                    <Trash2 size={12} />
                                                    Hapus Sesi
                                                </button>
                                            </div>

                                            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                                                <div className="space-y-4 text-sm">
                                                    <div>
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-medium">Peran tim</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => setEditingRolesSession(session)}
                                                                className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                                                            >
                                                                <Pencil size={12} />
                                                                Edit Peran
                                                            </button>
                                                        </div>
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
                                                    <div className="mt-3">
                                                        <ActivityProgressGrid
                                                            sessionId={session.id}
                                                            progress={session.progress}
                                                            learnerName={session.learner.name}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                );
                            })}
                        </div>
                    )}

                    {editingRolesSession && (
                        <EditRolesModal
                            sessionId={editingRolesSession.id}
                            initialRoles={editingRolesSession.roles}
                            learnerName={editingRolesSession.learner.name}
                            onClose={() => setEditingRolesSession(null)}
                        />
                    )}

                    {deletingSession && (
                        <DeleteSessionModal
                            session={deletingSession}
                            onClose={() => setDeletingSession(null)}
                        />
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
        </AdminLayout>
    );
}
