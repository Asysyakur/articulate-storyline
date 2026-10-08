<?php

namespace App\Http\Controllers;

use App\Models\Learner;
use App\Models\LearningActivityProgress;
use App\Models\LearningSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminLearnerController extends Controller
{
    public function index(): Response
    {
        $learners = Learner::query()
            ->withCount('learningSessions')
            ->latest()
            ->paginate(20)
            ->through(fn (Learner $learner) => [
                'id' => $learner->id,
                'name' => $learner->name,
                'class_name' => $learner->class_name,
                'created_at' => $learner->created_at->toIso8601String(),
                'sessions_count' => $learner->learning_sessions_count,
            ]);

        return Inertia::render('Admin/Learners', [
            'learners' => $learners,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'class_name' => ['required', 'string', 'max:100'],
        ]);

        $learner = Learner::create($data);

        $this->initializeLearningSession($learner);

        return back()->with('success', 'Siswa berhasil ditambahkan dan sesi belajar telah disiapkan.');
    }

    public function downloadTemplate(): \Illuminate\Http\Response
    {
        $csv = "name,class_name\n"
            ."Ahmad Fauzi,X TKJ 1\n"
            ."Siti Rahmawati,X TKJ 2\n"
            ."Budi Pratama,XI TKJ 1\n"
            ."Dewi Lestari,XI TKJ 2\n"
            ."Rizky Ramadhan,XII TKJ 1\n";

        return response($csv, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="template_import_siswa.csv"',
        ]);
    }

    public function update(Request $request, Learner $learner): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'class_name' => ['required', 'string', 'max:100'],
        ]);

        $learner->update($data);

        return back()->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Learner $learner): RedirectResponse
    {
        $learner->delete();

        return back()->with('success', 'Siswa berhasil dihapus.');
    }

    public function show(Learner $learner): Response
    {
        $sessions = $learner->learningSessions()
            ->with('progress')
            ->latest('last_active_at')
            ->get()
            ->map(fn (LearningSession $session) => [
                'id' => $session->id,
                'roles' => $session->state['roles'] ?? [],
                'preferences' => $session->state['preferences'] ?? [],
                'last_active_at' => $session->last_active_at?->toIso8601String(),
                'created_at' => $session->created_at->toIso8601String(),
                'progress' => $session->progress
                    ->sortBy('activity_key')
                    ->values()
                    ->map(fn ($p) => [
                        'activity_key' => $p->activity_key,
                        'completed' => $p->completed,
                        'payload' => $p->payload,
                        'updated_at' => $p->updated_at->toIso8601String(),
                    ]),
            ]);

        return Inertia::render('Admin/LearnerDetail', [
            'learner' => [
                'id' => $learner->id,
                'name' => $learner->name,
                'class_name' => $learner->class_name,
                'created_at' => $learner->created_at->toIso8601String(),
            ],
            'sessions' => $sessions,
        ]);
    }

    public function import(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt', 'max:2048'],
        ]);

        $path = $request->file('file')->getRealPath();
        $handle = fopen($path, 'r');

        if ($handle === false) {
            return back()->withErrors(['file' => 'File tidak dapat dibaca.']);
        }

        $header = null;
        $imported = 0;
        $errors = [];
        $rowNumber = 1;

        while (($row = fgetcsv($handle)) !== false) {
            $rowNumber++;

            // Read header row
            if ($header === null) {
                $header = array_map(fn ($h) => strtolower(trim($h)), $row);

                continue;
            }

            if (count($row) !== count($header)) {
                $errors[] = "Baris {$rowNumber}: jumlah kolom tidak sesuai.";

                continue;
            }

            $data = array_combine($header, $row);

            $name = trim($data['name'] ?? $data['nama'] ?? '');
            $className = trim($data['class_name'] ?? $data['kelas'] ?? '');

            if ($name === '') {
                $errors[] = "Baris {$rowNumber}: kolom 'name' tidak boleh kosong.";

                continue;
            }

            if ($className === '') {
                $errors[] = "Baris {$rowNumber}: kolom 'class_name' tidak boleh kosong.";

                continue;
            }

            $learner = Learner::create([
                'name' => $name,
                'class_name' => $className,
            ]);

            $this->initializeLearningSession($learner);

            $imported++;
        }

        fclose($handle);

        if (! empty($errors)) {
            return back()
                ->with('success', "{$imported} siswa berhasil diimpor.")
                ->with('import_errors', $errors);
        }

        return back()->with('success', "{$imported} siswa berhasil diimpor.");
    }

    public function updateProgress(Request $request, LearningSession $session, string $activity): RedirectResponse
    {
        $validated = $request->validate([
            'completed' => ['nullable', 'boolean'],
            'payload' => ['nullable', 'array'],
        ]);

        $progress = LearningActivityProgress::firstOrNew([
            'learning_session_id' => $session->id,
            'activity_key' => $activity,
        ]);

        if ($request->has('completed')) {
            $progress->completed = (bool) $validated['completed'];
        }

        if ($request->has('payload')) {
            $currentPayload = is_array($progress->payload) ? $progress->payload : [];
            $progress->payload = array_merge($currentPayload, $validated['payload']);
        }

        $progress->save();

        return back()->with('success', 'Data aktivitas berhasil diperbarui.');
    }

    public function updateRoles(Request $request, LearningSession $session): RedirectResponse
    {
        $validated = $request->validate([
            'roles' => ['required', 'array'],
            'roles.ketua' => ['nullable', 'string', 'max:255'],
            'roles.penguji' => ['nullable', 'string', 'max:255'],
            'roles.pencatat' => ['nullable', 'string', 'max:255'],
        ]);

        $state = is_array($session->state) ? $session->state : [];
        $state['roles'] = [
            'ketua' => $validated['roles']['ketua'] ?? '',
            'penguji' => $validated['roles']['penguji'] ?? '',
            'pencatat' => $validated['roles']['pencatat'] ?? '',
        ];

        $session->state = $state;
        $session->save();

        return back()->with('success', 'Peran tim berhasil diperbarui.');
    }

    public function destroySession(LearningSession $session): RedirectResponse
    {
        $session->delete();

        return back()->with('success', 'Sesi belajar berhasil dihapus.');
    }

    public function createSession(Learner $learner): RedirectResponse
    {
        $this->initializeLearningSession($learner);

        return back()->with('success', 'Sesi belajar baru berhasil dibuat.');
    }

    protected function initializeLearningSession(Learner $learner): LearningSession
    {
        $session = LearningSession::create([
            'learner_id' => $learner->id,
            'state' => [
                'roles' => [
                    'ketua' => '',
                    'penguji' => '',
                    'pencatat' => '',
                ],
                'preferences' => [
                    'music' => true,
                    'narration' => false,
                    'sfx' => true,
                ],
            ],
            'last_active_at' => now(),
        ]);

        $defaultActivities = [
            'problem-orientation' => [],
            'information-gathering' => [],
            'computational-thinking' => [
                'student_answers' => [
                    'problem_identification' => '',
                    'analysis_and_solution' => '',
                ],
            ],
            'algorithm' => [
                'student_answers' => [
                    'problem_identification' => '',
                    'analysis_and_solution' => '',
                ],
            ],
            'data-representation' => [
                'student_answers' => [
                    'problem_identification' => '',
                    'analysis_and_solution' => '',
                ],
            ],
            'diagnostic-practice' => [],
            'solution-development' => [
                'order' => [],
            ],
            'evaluation' => [
                'score' => 0,
                'totalScore' => 100,
                'answers' => [],
            ],
            'reflection' => [
                'answers' => [
                    '1' => '',
                    '2' => '',
                    '3' => '',
                    '4' => '',
                    '5' => '',
                    '6' => '',
                ],
            ],
        ];

        foreach ($defaultActivities as $key => $payload) {
            LearningActivityProgress::create([
                'learning_session_id' => $session->id,
                'activity_key' => $key,
                'completed' => false,
                'payload' => $payload,
            ]);
        }

        return $session;
    }
}
