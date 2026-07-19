<?php

namespace App\Http\Controllers;

use App\Models\Learner;
use App\Models\LearningSession;
use Inertia\Inertia;
use Inertia\Response;

class AdminLearningDataController extends Controller
{
    public function index(): Response
    {
        $sessions = LearningSession::query()
            ->with(['learner', 'progress'])
            ->latest('last_active_at')
            ->paginate(15)
            ->through(fn (LearningSession $session) => [
                'id' => $session->id,
                'learner' => [
                    'name' => $session->learner->name,
                    'class_name' => $session->learner->class_name,
                ],
                'roles' => $session->state['roles'] ?? [],
                'preferences' => $session->state['preferences'] ?? [],
                'last_active_at' => $session->last_active_at?->toIso8601String(),
                'created_at' => $session->created_at->toIso8601String(),
                'progress' => $session->progress
                    ->sortBy('activity_key')
                    ->values()
                    ->map(fn ($progress) => [
                        'activity_key' => $progress->activity_key,
                        'completed' => $progress->completed,
                        'payload' => $progress->payload,
                        'updated_at' => $progress->updated_at->toIso8601String(),
                    ]),
            ]);

        return Inertia::render('Admin/LearningData', [
            'summary' => [
                'learners' => Learner::count(),
                'sessions' => LearningSession::count(),
                'completed_sessions' => LearningSession::whereHas('progress', fn ($query) => $query->where('activity_key', 'reflection')->where('completed', true))->count(),
            ],
            'sessions' => $sessions,
        ]);
    }
}
