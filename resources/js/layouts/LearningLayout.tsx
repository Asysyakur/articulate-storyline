import SlideControls from '@/components/SlideControls';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fullscreen?: boolean;
}

export default function LearningLayout({ children, fullscreen = false }: Props) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            {/* BACKGROUND */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0f766e22,transparent_35%),radial-gradient(circle_at_bottom_right,#2563eb22,transparent_35%)]" />

            {/* CONTENT */}
            <main className={`relative z-10 ${fullscreen ? 'h-screen overflow-hidden' : 'min-h-screen px-6 py-10'}`}>
                {fullscreen ? children : <div className="mx-auto max-w-7xl">{children}</div>}
            </main>

            {/* CONTROLS */}
            <SlideControls />
        </div>
    );
}
