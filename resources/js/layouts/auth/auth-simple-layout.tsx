import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-slate-950 p-6 text-white md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,116,144,0.18),_transparent_30%)]" />
            <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/10 bg-slate-900/80 p-7 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:p-9">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                                <AppLogoIcon className="size-7 fill-current text-cyan-300" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-black tracking-tight">{title}</h1>
                            <p className="text-center text-sm text-slate-400">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
