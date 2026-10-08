import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Download, GraduationCap, Pencil, Plus, Trash2, Upload, Users, X, XCircle } from 'lucide-react';
import { useRef, useState } from 'react';

type Learner = {
    id: number;
    name: string;
    class_name: string;
    created_at: string;
    sessions_count: number;
};

type PaginatedLearners = {
    data: Learner[];
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    total: number;
};

type PageProps = {
    learners: PaginatedLearners;
    flash: { success?: string; import_errors?: string[] };
};

// ─── ADD / EDIT MODAL ────────────────────────────────────────────────────────

function LearnerFormModal({
    learner,
    onClose,
}: {
    learner: Learner | null;
    onClose: () => void;
}) {
    const isEdit = learner !== null;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: learner?.name ?? '',
        class_name: learner?.class_name ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.learners.update', learner.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('admin.learners.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-5 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={isEdit ? 'Edit data siswa' : 'Tambah siswa baru'}
        >
            <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-cyan-300">
                            {isEdit ? 'EDIT SISWA' : 'TAMBAH SISWA'}
                        </p>
                        <h2 className="mt-1 text-2xl font-black">
                            {isEdit ? `Edit ${learner.name}` : 'Siswa Baru'}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        aria-label="Tutup modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-4" id="learner-form">
                    <div>
                        <label htmlFor="learner-name" className="block text-sm font-medium text-slate-300">
                            Nama Siswa <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="learner-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Masukkan nama siswa"
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40"
                            required
                            autoFocus
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="learner-class" className="block text-sm font-medium text-slate-300">
                            Kelas <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="learner-class"
                            type="text"
                            value={data.class_name}
                            onChange={(e) => setData('class_name', e.target.value)}
                            placeholder="Contoh: X TKJ 1"
                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/40"
                            required
                        />
                        {errors.class_name && <p className="mt-1 text-xs text-red-400">{errors.class_name}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
                        >
                            {processing ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Tambah Siswa'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── DELETE CONFIRM MODAL ─────────────────────────────────────────────────────

function DeleteModal({ learner, onClose }: { learner: Learner; onClose: () => void }) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        setProcessing(true);
        router.delete(route('admin.learners.destroy', learner.id), {
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
            aria-label="Konfirmasi hapus siswa"
        >
            <div className="w-full max-w-sm rounded-3xl border border-red-400/20 bg-slate-900 p-6 shadow-2xl">
                <p className="text-sm font-semibold text-red-400">HAPUS SISWA</p>
                <h2 className="mt-1 text-xl font-black">{learner.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    Siswa ini dan seluruh sesi belajarnya akan dihapus secara permanen. Tindakan ini tidak
                    dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={processing}
                        className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-400 disabled:opacity-60"
                    >
                        {processing ? 'Menghapus...' : 'Ya, Hapus'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── IMPORT MODAL ─────────────────────────────────────────────────────────────

function ImportModal({ onClose }: { onClose: () => void }) {
    const fileRef = useRef<HTMLInputElement>(null);
    const { processing } = useForm<{ file: File | null }>({ file: null });
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFileError(null);
        if (file) {
            if (!file.name.endsWith('.csv')) {
                setFileError('Hanya file CSV yang diperbolehkan.');
                return;
            }
            setFileName(file.name);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const file = fileRef.current?.files?.[0];
        if (!file) {
            setFileError('Pilih file CSV terlebih dahulu.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        router.post(route('admin.learners.import'), formData, {
            forceFormData: true,
            onSuccess: () => onClose(),
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-5 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Import data siswa dari CSV"
        >
            <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/50">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-cyan-300">IMPORT CSV</p>
                        <h2 className="mt-1 text-2xl font-black">Import Data Siswa</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        aria-label="Tutup modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-4 text-sm text-slate-300">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="font-semibold text-white">Template & Format CSV</p>
                            <p className="mt-0.5 text-xs text-slate-400">
                                Gunakan template dengan format yang sudah tervalidasi.
                            </p>
                        </div>
                        <a
                            href={route('admin.learners.template')}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
                        >
                            <Download size={14} />
                            Download Template
                        </a>
                    </div>

                    <div className="mt-3 rounded-xl border border-white/5 bg-slate-900/90 p-3 font-mono text-xs text-slate-300">
                        <p className="font-bold text-cyan-300">name,class_name</p>
                        <p className="text-slate-400">Ahmad Fauzi,X TKJ 1</p>
                        <p className="text-slate-400">Siti Rahmawati,X TKJ 2</p>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">
                        Header kolom yang didukung: <code className="text-cyan-300">name,class_name</code> atau <code className="text-cyan-300">nama,kelas</code>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div>
                        <label htmlFor="csv-file" className="block text-sm font-medium text-slate-300">
                            File CSV <span className="text-red-400">*</span>
                        </label>
                        <div className="mt-1.5">
                            <label
                                htmlFor="csv-file"
                                className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-4 transition hover:border-cyan-400/40 hover:bg-cyan-400/5"
                            >
                                <Upload size={20} className="shrink-0 text-cyan-300" />
                                <span className="text-sm text-slate-400">
                                    {fileName ?? 'Klik untuk pilih file CSV'}
                                </span>
                            </label>
                            <input
                                id="csv-file"
                                ref={fileRef}
                                type="file"
                                accept=".csv,text/csv"
                                onChange={handleFileChange}
                                className="sr-only"
                            />
                        </div>
                        {fileError && <p className="mt-1 text-xs text-red-400">{fileError}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
                        >
                            {processing ? 'Mengimpor...' : 'Import'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Learners() {
    const { learners, flash } = usePage<PageProps>().props;
    const [showAdd, setShowAdd] = useState(false);
    const [editLearner, setEditLearner] = useState<Learner | null>(null);
    const [deleteLearner, setDeleteLearner] = useState<Learner | null>(null);
    const [showImport, setShowImport] = useState(false);

    return (
        <AdminLayout>
            <Head title="Data Siswa" />

            <div className="flex flex-1 flex-col gap-6">
                {/* HEADER */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold text-cyan-300">DASHBOARD ADMIN</p>
                        <h1 className="mt-1 text-3xl font-black tracking-tight">Data Siswa</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                            Kelola data siswa: tambah, edit, hapus, dan import dari file CSV.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <a
                            href={route('admin.learners.template')}
                            download="template_import_siswa.csv"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                        >
                            <Download size={16} />
                            Download Template CSV
                        </a>
                        <button
                            type="button"
                            id="btn-import-csv"
                            onClick={() => setShowImport(true)}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                        >
                            <Upload size={16} />
                            Import CSV
                        </button>
                        <button
                            type="button"
                            id="btn-tambah-siswa"
                            onClick={() => setShowAdd(true)}
                            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                        >
                            <Plus size={16} />
                            Tambah Siswa
                        </button>
                    </div>
                </div>

                {/* FLASH MESSAGES */}
                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300" role="status">
                        <CheckCircle2 size={16} className="shrink-0" />
                        {flash.success}
                    </div>
                )}
                {flash?.import_errors && flash.import_errors.length > 0 && (
                    <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
                        <div className="flex items-center gap-2 font-semibold">
                            <XCircle size={16} />
                            Beberapa baris gagal diimpor:
                        </div>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
                            {flash.import_errors.map((err, i) => (
                                <li key={i}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* STATS */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-cyan-950/10">
                    <div className="flex items-center gap-3">
                        <Users className="size-5 text-cyan-300" />
                        <div>
                            <p className="text-sm text-slate-400">Total Siswa Terdaftar</p>
                            <p className="text-2xl font-black">{learners.total}</p>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-cyan-950/10">
                    <div className="border-b border-white/10 px-5 py-5">
                        <h2 className="font-semibold">Daftar Siswa</h2>
                        <p className="mt-1 text-sm text-slate-400">Klik nama siswa untuk melihat detail sesi belajarnya.</p>
                    </div>

                    {learners.data.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-slate-400">
                            Belum ada data siswa. Tambahkan siswa baru atau import dari CSV.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <th className="px-5 py-3">ID</th>
                                        <th className="px-5 py-3">Nama Siswa</th>
                                        <th className="px-5 py-3">Kelas</th>
                                        <th className="px-5 py-3">Sesi</th>
                                        <th className="px-5 py-3 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {learners.data.map((learner) => (
                                        <tr key={learner.id} className="transition hover:bg-cyan-400/5">
                                            <td className="px-5 py-4 text-slate-500">#{learner.id}</td>
                                            <td className="px-5 py-4">
                                                <Link
                                                    href={route('admin.learners.show', learner.id)}
                                                    className="flex items-center gap-2.5 font-semibold text-white transition hover:text-cyan-300"
                                                >
                                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                                                        <GraduationCap size={16} />
                                                    </div>
                                                    {learner.name}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-4 text-slate-300">{learner.class_name}</td>
                                            <td className="px-5 py-4 text-slate-400">{learner.sessions_count} sesi</td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        id={`btn-edit-${learner.id}`}
                                                        onClick={() => setEditLearner(learner)}
                                                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
                                                        aria-label={`Edit ${learner.name}`}
                                                    >
                                                        <Pencil size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        id={`btn-hapus-${learner.id}`}
                                                        onClick={() => setDeleteLearner(learner)}
                                                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-400 transition hover:border-red-400/40 hover:text-red-400"
                                                        aria-label={`Hapus ${learner.name}`}
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* PAGINATION */}
                    {learners.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm">
                            <p className="text-slate-400">
                                Halaman {learners.current_page} dari {learners.last_page}
                            </p>
                            <div className="flex gap-2">
                                {learners.prev_page_url && (
                                    <Link
                                        href={learners.prev_page_url}
                                        className="rounded-md border border-white/10 px-3 py-1.5 text-sm transition hover:bg-white/5"
                                    >
                                        ← Sebelumnya
                                    </Link>
                                )}
                                {learners.next_page_url && (
                                    <Link
                                        href={learners.next_page_url}
                                        className="rounded-md border border-white/10 px-3 py-1.5 text-sm transition hover:bg-white/5"
                                    >
                                        Berikutnya →
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* MODALS */}
            {showAdd && <LearnerFormModal learner={null} onClose={() => setShowAdd(false)} />}
            {editLearner && <LearnerFormModal learner={editLearner} onClose={() => setEditLearner(null)} />}
            {deleteLearner && <DeleteModal learner={deleteLearner} onClose={() => setDeleteLearner(null)} />}
            {showImport && <ImportModal onClose={() => setShowImport(false)} />}
        </AdminLayout>
    );
}
