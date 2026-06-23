import SlideControls from '@/components/SlideControls';
import { ReactNode, useEffect } from 'react';

interface Props {
    children: ReactNode;
    fullscreen?: boolean;
}

declare global {
    interface Window {
        bgMusic?: HTMLAudioElement;
    }
}

export default function LearningLayout({ children, fullscreen = false }: Props) {
    useEffect(() => {
        const startMusic = () => {
            if (!window.bgMusic) {
                const audio = new Audio('/audio/background.mp3');

                audio.loop = true;
                audio.volume = 0.15;

                const muted = localStorage.getItem('bg-music-muted') === 'true';

                audio.muted = muted;

                window.bgMusic = audio;
            }

            window.bgMusic.play().catch(() => {});
        };

        document.addEventListener('click', startMusic, {
            once: true,
        });

        return () => {
            document.removeEventListener('click', startMusic);
        };
    }, []);

    if (!window.bgMusic) {
        const audio = new Audio('/audio/background.mp3');

        audio.loop = true;
        audio.volume = 0.15;

        const muted = localStorage.getItem('bg-music-muted') === 'true';

        audio.muted = muted;

        window.bgMusic = audio;
    }

    return (
        <div className="relative min-h-screen overflow-hidden text-white">
            {/* BACKGROUND */}
            <div className="fixed inset-0 -z-10">
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

                {/* Grid */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                linear-gradient(to right, rgba(34,211,238,.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(34,211,238,.08) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Glow kiri atas */}
                <div className="absolute top-0 left-0 h-[400px] w-[400px] bg-cyan-500/10 blur-[160px]" />

                {/* Glow kanan bawah */}
                <div className="absolute right-0 bottom-0 h-[400px] w-[400px] bg-blue-500/10 blur-[160px]" />
            </div>

            <main className={`relative z-10 ${fullscreen ? 'h-screen overflow-hidden' : 'min-h-screen px-6 py-10'}`}>
                {fullscreen ? children : <div className="mx-auto max-w-7xl">{children}</div>}
            </main>

            <SlideControls />
        </div>
    );
}
