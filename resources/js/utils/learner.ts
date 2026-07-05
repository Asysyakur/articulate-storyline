export type Learner = {
    name: string;
    kelas: string;
};

export const getLearner = (): Learner => {
    if (typeof window === 'undefined') {
        return { name: '', kelas: '' };
    }

    return {
        name: window.localStorage.getItem('learner-name') ?? '',
        kelas: window.localStorage.getItem('learner-kelas') ?? '',
    };
};

export const setLearner = (name: string, kelas: string) => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem('learner-name', name);
    window.localStorage.setItem('learner-kelas', kelas);
};
