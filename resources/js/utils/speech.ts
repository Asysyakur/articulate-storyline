export const speak = (text: string) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    const indoVoice = voices.find((voice) => voice.lang === 'id-ID') || voices.find((voice) => voice.lang.startsWith('id'));

    if (indoVoice) {
        utterance.voice = indoVoice;
    }

    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
};

export const stopSpeak = () => {
    if (typeof window === 'undefined') {
        return;
    }

    window.speechSynthesis.cancel();
};
