type LearningValue = Record<string, unknown>;

type LearningProgressSavedDetail = {
    activity: string;
    completed: boolean;
    payload: LearningValue;
};

const csrfToken = () => document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';

const request = async (url: string, body: LearningValue) => {
    await fetch(url, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken(),
        },
        body: JSON.stringify(body),
    });
};

export const saveLearningState = (key: string, value: LearningValue) => request('/learning/state', { key, value });

export const resetLearningSessionState = () => {
    if (typeof window === 'undefined') {
        return;
    }

    const resetLocalKeys = (keys: string[]) => {
        keys.forEach((key) => window.localStorage.removeItem(key));
    };

    const resetStorageByPattern = (storage: Storage, patterns: string[]) => {
        const keysToRemove: string[] = [];

        for (let index = storage.length - 1; index >= 0; index -= 1) {
            const key = storage.key(index);

            if (!key) {
                continue;
            }

            const normalizedKey = key.toLowerCase();

            if (patterns.some((pattern) => normalizedKey.includes(pattern))) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach((key) => storage.removeItem(key));
    };

    resetLocalKeys([
        'bg-music-muted',
        'learner-name',
        'learner-kelas',
        'solution-development-checked',
        'problem-orientation-completed',
        'information-gathering-completed',
        'computational-thinking-completed',
        'algorithm-completed',
        'data-representation-completed',
        'data-processing-completed',
        'diagnostic-practice-completed',
        'evaluationCompleted',
        'evaluationScore',
    ]);

    resetStorageByPattern(window.localStorage, [
        'problem-orientation',
        'information-gathering',
        'computational-thinking',
        'algorithm',
        'data-representation',
        'data-processing',
        'diagnostic-practice',
        'solution-development',
        'evaluation',
        'vketua',
        'vpenguji',
        'vpencatat',
        'vran',
        'learner-',
    ]);

    resetStorageByPattern(window.sessionStorage, [
        'material-return-path',
        'evaluationcompleted',
        'evaluationscore',
    ]);
};

export const saveLearningProgress = async (activity: string, completed: boolean, payload: LearningValue = {}) => {
    await request(`/learning/progress/${activity}`, { completed, payload });

    if (typeof window !== 'undefined') {
        window.dispatchEvent(
            new CustomEvent<LearningProgressSavedDetail>('learning-progress-saved', {
                detail: {
                    activity,
                    completed,
                    payload,
                },
            }),
        );
    }
};
