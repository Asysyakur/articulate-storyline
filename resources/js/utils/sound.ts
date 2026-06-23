// utils/sound.ts

export const playClickSound = () => {
    const audio = new Audio('/audio/hotspot-click.mp3');

    audio.volume = 0.5;

    audio.play().catch(() => {});
};

export const playCorrectSound = () => {
    const audio = new Audio('/audio/hotspot-click.mp3');

    audio.volume = 0.5;

    audio.play().catch(() => {});
};

export const playWrongSound = () => {
    const audio = new Audio('/audio/wrong.mp3');

    audio.volume = 0.5;

    audio.play().catch(() => {});
};

export const playFinishSound = () => {
    const audio = new Audio('/audio/finish.mp3');

    audio.volume = 0.5;

    audio.play().catch(() => {});
};

export const playPassSound = () => {
    const audio = new Audio('/audio/pass.mp3');

    audio.volume = 0.7;

    audio.play().catch(() => {});
};

export const playFailSound = () => {
    const audio = new Audio('/audio/fail.mp3');

    audio.volume = 0.7;

    audio.play().catch(() => {});
};

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
