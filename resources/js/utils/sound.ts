export const SFX_STORAGE_KEY = 'sfx-enabled';

const activeSfx = new Set<HTMLAudioElement>();

const isSfxEnabled = () => typeof window !== 'undefined' && window.localStorage.getItem(SFX_STORAGE_KEY) !== 'false';

const playSfx = (source: string, volume: number) => {
    if (!isSfxEnabled()) {
        return;
    }

    const audio = new Audio(source);
    audio.volume = volume;
    activeSfx.add(audio);
    audio.addEventListener('ended', () => activeSfx.delete(audio), { once: true });
    audio.play().catch(() => activeSfx.delete(audio));
};

export const stopSfx = () => {
    activeSfx.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });
    activeSfx.clear();
};

export const playClickSound = () => playSfx('/audio/hotspot-click.mp3', 0.5);
export const playCorrectSound = () => playSfx('/audio/hotspot-click.mp3', 0.5);
export const playWrongSound = () => playSfx('/audio/wrong.mp3', 0.5);
export const playFinishSound = () => playSfx('/audio/finish.mp3', 0.5);
export const playPassSound = () => playSfx('/audio/pass.mp3', 0.7);
export const playFailSound = () => playSfx('/audio/fail.mp3', 0.7);

export const fadeOutMusic = (duration = 5000) => {
    if (!window.bgMusic) return;

    const audio = window.bgMusic;
    const step = audio.volume / (duration / 100);

    const interval = setInterval(() => {
        if (audio.volume > step) {
            audio.volume -= step;
        } else {
            audio.pause();
            audio.currentTime = 0;
            clearInterval(interval);
        }
    }, 100);
};
