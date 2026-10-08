import { router } from '@inertiajs/react';
import { Loader2, Save, Users, X } from 'lucide-react';
import { useState } from 'react';

interface EditRolesModalProps {
    sessionId: number;
    initialRoles: { ketua?: string; penguji?: string; pencatat?: string };
    learnerName: string;
    onClose: () => void;
}

export default function EditRolesModal({
    sessionId,
    initialRoles,
    learnerName,
    onClose,
}: EditRolesModalProps) {
    const [ketua, setKetua] = useState(initialRoles.ketua ?? '');
    const [penguji, setPenguji] = useState(initialRoles.penguji ?? '');
    const [pencatat, setPencatat] = useState(initialRoles.pencatat ?? '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        router.put(
            route('admin.sessions.roles.update', sessionId),
            {
                roles: {
                    ketua: ketua.trim(),
                    penguji: penguji.trim(),
                    pencatat: pencatat.trim(),
                },
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSaving(false);
                    onClose();
                },
                onError: () => setIsSaving(false),
            },
        );
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                            <Users size={18} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white">Edit Peran Tim</h2>
                            <p className="text-xs text-slate-400">
                                Sesi #{sessionId} · {learnerName}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        aria-label="Tutup modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                            Ketua Tim
                        </label>
                        <input
                            type="text"
                            value={ketua}
                            onChange={(e) => setKetua(e.target.value)}
                            placeholder="Nama ketua..."
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                            Penguji
                        </label>
                        <input
                            type="text"
                            value={penguji}
                            onChange={(e) => setPenguji(e.target.value)}
                            placeholder="Nama penguji..."
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300">
                            Pencatat
                        </label>
                        <input
                            type="text"
                            value={pencatat}
                            onChange={(e) => setPencatat(e.target.value)}
                            placeholder="Nama pencatat..."
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-950/80 p-3 text-sm text-slate-100 placeholder-slate-600 focus:border-cyan-400 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
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
                                    Simpan Peran
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
