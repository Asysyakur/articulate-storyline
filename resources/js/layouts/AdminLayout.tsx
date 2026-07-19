import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Database, LogOut, MonitorCog } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(8,145,178,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.15),_transparent_28%)]" />
            <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
                    <Link href="/admin/data-pembelajaran" className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-950"><MonitorCog size={21} /></div>
                        <div>
                            <p className="text-sm font-black tracking-tight">Network Lab</p>
                            <p className="text-xs text-cyan-300">Panel Admin Pembelajaran</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold">{auth.user.name}</p>
                            <p className="text-xs text-slate-400">Administrator</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => router.post('/logout')}
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-400 hover:text-slate-950"
                        >
                            <LogOut size={16} />
                            Keluar
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-10">{children}</main>
            <footer className="mx-auto flex max-w-7xl items-center gap-2 px-5 pb-7 text-xs text-slate-500 md:px-8"><Database size={14} /> Data tersimpan pada basis data pembelajaran.</footer>
        </div>
    );
}
