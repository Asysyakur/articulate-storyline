<?php

namespace App\Http\Controllers;

use App\Models\Learner;
use App\Models\LearningActivityProgress;
use App\Models\LearningSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LearningSessionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'kelas' => ['required', 'string', 'max:100'],
        ]);

        $learner = Learner::create([
            'name' => $data['name'],
            'class_name' => $data['kelas'],
        ]);

        $session = LearningSession::create([
            'learner_id' => $learner->id,
            'state' => [
                'preferences' => ['music' => true, 'narration' => false, 'sfx' => true],
                'roles' => ['ketua' => '', 'penguji' => '', 'pencatat' => ''],
            ],
            'last_active_at' => now(),
        ]);

        $request->session()->put('learning_session_id', $session->id);

        return to_route('learning.home');
    }

    public function show(Request $request): JsonResponse
    {
        $session = $this->session($request);

        return response()->json($session->load(['learner', 'progress']));
    }

    public function updateState(Request $request): JsonResponse
    {
        $data = $request->validate([
            'key' => ['required', 'string', 'max:100'],
            'value' => ['nullable', 'array'],
        ]);

        $session = $this->session($request);
        $state = $session->state ?? [];
        $state[$data['key']] = $data['value'] ?? [];

        $session->update(['state' => $state, 'last_active_at' => now()]);

        return response()->json(['state' => $session->state]);
    }

    public function updateProgress(Request $request, string $activity): JsonResponse
    {
        $data = $request->validate([
            'completed' => ['required', 'boolean'],
            'payload' => ['nullable', 'array'],
        ]);

        $session = $this->session($request);
        $progress = LearningActivityProgress::updateOrCreate(
            ['learning_session_id' => $session->id, 'activity_key' => $activity],
            ['completed' => $data['completed'], 'payload' => $data['payload'] ?? []],
        );
        $session->update(['last_active_at' => now()]);

        return response()->json($progress);
    }

    private function session(Request $request): LearningSession
    {
        $sessionId = $request->session()->get('learning_session_id');

        abort_unless($sessionId, 422, 'Sesi belajar belum dimulai.');

        return LearningSession::findOrFail($sessionId);
    }
}
