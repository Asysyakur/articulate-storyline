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
