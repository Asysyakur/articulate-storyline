import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    learning: LearningSessionData | null;
    [key: string]: unknown;
}

export interface LearningActivityProgressData {
    activity_key: string;
    completed: boolean;
    payload: Record<string, unknown> | null;
}

export interface LearningSessionData {
    learner: {
        id: number;
        name: string;
        class_name: string;
    };
    state: {
        preferences?: { music?: boolean; narration?: boolean; sfx?: boolean };
        roles?: { ketua?: string; penguji?: string; pencatat?: string };
    } | null;
    progress: LearningActivityProgressData[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
