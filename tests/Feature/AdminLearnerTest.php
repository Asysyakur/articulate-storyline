<?php

use App\Models\Learner;
use App\Models\LearningSession;
use App\Models\User;
use Illuminate\Http\UploadedFile;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function adminUser(): User
{
    return User::factory()->create(['is_admin' => true]);
}

function regularUser(): User
{
    return User::factory()->create(['is_admin' => false]);
}

// ─── AUTH GUARD ───────────────────────────────────────────────────────────────

test('unauthenticated user cannot access learners index', function () {
    get('/admin/siswa')->assertRedirect('/login');
});

test('non-admin user cannot access learners index', function () {
    actingAs(regularUser());
    get('/admin/siswa')->assertForbidden();
});

// ─── INDEX ────────────────────────────────────────────────────────────────────

test('admin can view learners index', function () {
    actingAs(adminUser());
    Learner::factory()->count(3)->create();

    get('/admin/siswa')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Learners')
            ->has('learners.data', 3)
        );
});

// ─── STORE ────────────────────────────────────────────────────────────────────

test('admin can add a new learner', function () {
    actingAs(adminUser());

    post('/admin/siswa', [
        'name' => 'Budi Santoso',
        'class_name' => 'X TKJ 1',
    ])->assertRedirect();

    assertDatabaseHas('learners', [
        'name' => 'Budi Santoso',
        'class_name' => 'X TKJ 1',
    ]);
});

test('store requires name', function () {
    actingAs(adminUser());

    post('/admin/siswa', [
        'name' => '',
        'class_name' => 'X TKJ 1',
    ])->assertSessionHasErrors('name');
});

test('store requires class_name', function () {
    actingAs(adminUser());

    post('/admin/siswa', [
        'name' => 'Siti',
        'class_name' => '',
    ])->assertSessionHasErrors('class_name');
});

// ─── SHOW ─────────────────────────────────────────────────────────────────────

test('admin can view learner detail page', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();

    get("/admin/siswa/{$learner->id}")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Admin/LearnerDetail')
            ->where('learner.id', $learner->id)
            ->where('learner.name', $learner->name)
        );
});

// ─── UPDATE ───────────────────────────────────────────────────────────────────

test('admin can edit a learner', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create(['name' => 'Lama', 'class_name' => 'IX A']);

    put("/admin/siswa/{$learner->id}", [
        'name' => 'Nama Baru',
        'class_name' => 'X TKJ 2',
    ])->assertRedirect();

    assertDatabaseHas('learners', [
        'id' => $learner->id,
        'name' => 'Nama Baru',
        'class_name' => 'X TKJ 2',
    ]);
});

// ─── DESTROY ─────────────────────────────────────────────────────────────────

test('admin can delete a learner', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();

    delete("/admin/siswa/{$learner->id}")->assertRedirect();

    assertDatabaseMissing('learners', ['id' => $learner->id]);
});

test('deleting learner cascades to their sessions', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create([
        'learner_id' => $learner->id,
        'state' => [],
        'last_active_at' => now(),
    ]);

    delete("/admin/siswa/{$learner->id}")->assertRedirect();

    assertDatabaseMissing('learning_sessions', ['id' => $session->id]);
});

// ─── IMPORT CSV ───────────────────────────────────────────────────────────────

test('admin can import learners from valid CSV', function () {
    actingAs(adminUser());

    $csv = "name,class_name\nAndi Pratama,X TKJ 1\nRini Wulandari,XI TKJ 2\n";
    $file = UploadedFile::fake()->createWithContent('siswa.csv', $csv);

    post('/admin/siswa/import', ['file' => $file])->assertRedirect();

    assertDatabaseHas('learners', ['name' => 'Andi Pratama', 'class_name' => 'X TKJ 1']);
    assertDatabaseHas('learners', ['name' => 'Rini Wulandari', 'class_name' => 'XI TKJ 2']);
});

test('import requires a file', function () {
    actingAs(adminUser());

    post('/admin/siswa/import', [])->assertSessionHasErrors('file');
});

test('import accepts alternative column names (nama, kelas)', function () {
    actingAs(adminUser());

    $csv = "nama,kelas\nDwi Cahyo,X TKJ 3\n";
    $file = UploadedFile::fake()->createWithContent('siswa.csv', $csv);

    post('/admin/siswa/import', ['file' => $file])->assertRedirect();

    assertDatabaseHas('learners', ['name' => 'Dwi Cahyo', 'class_name' => 'X TKJ 3']);
});

test('import skips rows with empty name', function () {
    actingAs(adminUser());

    $csv = "name,class_name\n,X TKJ 1\nValid Name,XI TKJ 2\n";
    $file = UploadedFile::fake()->createWithContent('siswa.csv', $csv);

    post('/admin/siswa/import', ['file' => $file])
        ->assertRedirect()
        ->assertSessionHas('import_errors');

    assertDatabaseMissing('learners', ['class_name' => 'X TKJ 1', 'name' => '']);
    assertDatabaseHas('learners', ['name' => 'Valid Name']);
});

// ─── UPDATE PROGRESS & ROLES ────────────────────────────────────────────────

test('admin can update investigation progress data', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create([
        'learner_id' => $learner->id,
        'state' => [],
    ]);

    put("/admin/sessions/{$session->id}/progress/computational-thinking", [
        'completed' => true,
        'payload' => [
            'student_answers' => [
                'problem_identification' => 'Kabel LAN lepas di PC 3',
                'analysis_and_solution' => 'Pasang kembali kabel LAN ke switch',
            ],
        ],
    ])->assertRedirect();

    $progress = $session->progress()->where('activity_key', 'computational-thinking')->first();
    expect($progress)->not->toBeNull();
    expect($progress->completed)->toBeTrue();
    expect($progress->payload['student_answers']['problem_identification'])->toBe('Kabel LAN lepas di PC 3');
    expect($progress->payload['student_answers']['analysis_and_solution'])->toBe('Pasang kembali kabel LAN ke switch');
});

test('admin can update evaluation scores and answers', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create([
        'learner_id' => $learner->id,
        'state' => [],
    ]);

    put("/admin/sessions/{$session->id}/progress/evaluation", [
        'completed' => true,
        'payload' => [
            'score' => 95,
            'totalScore' => 100,
            'answers' => [
                [
                    'questionId' => 1,
                    'question' => 'Apa itu IP address?',
                    'selectedAnswer' => 'Alamat logis',
                    'correctAnswer' => 'Alamat logis',
                    'isCorrect' => true,
                    'explanation' => 'Tepat',
                    'points' => 20,
                ],
            ],
        ],
    ])->assertRedirect();

    $progress = $session->progress()->where('activity_key', 'evaluation')->first();
    expect($progress)->not->toBeNull();
    expect($progress->completed)->toBeTrue();
    expect($progress->payload['score'])->toBe(95);
    expect($progress->payload['answers'][0]['selectedAnswer'])->toBe('Alamat logis');
});

test('admin can update reflection answers', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create([
        'learner_id' => $learner->id,
        'state' => [],
    ]);

    put("/admin/sessions/{$session->id}/progress/reflection", [
        'completed' => true,
        'payload' => [
            'answers' => [
                '1' => 'Mengecek lampu indikator',
                '2' => 'Hasil ping gateway',
            ],
        ],
    ])->assertRedirect();

    $progress = $session->progress()->where('activity_key', 'reflection')->first();
    expect($progress)->not->toBeNull();
    expect($progress->completed)->toBeTrue();
    expect($progress->payload['answers']['1'])->toBe('Mengecek lampu indikator');
});

test('admin can update session team roles', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create([
        'learner_id' => $learner->id,
        'state' => [
            'roles' => ['ketua' => 'Budi', 'penguji' => 'Siti', 'pencatat' => 'Agus'],
        ],
    ]);

    put("/admin/sessions/{$session->id}/roles", [
        'roles' => [
            'ketua' => 'Ahmad',
            'penguji' => 'Dewi',
            'pencatat' => 'Rina',
        ],
    ])->assertRedirect();

    $session->refresh();
    expect($session->state['roles']['ketua'])->toBe('Ahmad');
    expect($session->state['roles']['penguji'])->toBe('Dewi');
    expect($session->state['roles']['pencatat'])->toBe('Rina');
});

test('non-admin cannot update session progress', function () {
    actingAs(regularUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create(['learner_id' => $learner->id]);

    put("/admin/sessions/{$session->id}/progress/evaluation", [
        'completed' => true,
    ])->assertForbidden();
});

// ─── AUTO INITIALIZE SESSION & CSV TEMPLATE ──────────────────────────────────

test('adding a learner automatically initializes learning session and exact 9 progress activities', function () {
    actingAs(adminUser());

    post('/admin/siswa', [
        'name' => 'Fajar Nugraha',
        'class_name' => 'X TKJ 1',
    ])->assertRedirect();

    $learner = Learner::where('name', 'Fajar Nugraha')->first();
    expect($learner)->not->toBeNull();

    $session = $learner->learningSessions()->first();
    expect($session)->not->toBeNull();
    expect($session->state['roles'])->toHaveKey('ketua');

    // Exactly 9 default activities matching manual student session
    $activities = $session->progress()->pluck('activity_key')->toArray();
    expect($activities)->toHaveCount(9);
    expect($activities)->toContain('problem-orientation');
    expect($activities)->toContain('information-gathering');
    expect($activities)->toContain('computational-thinking');
    expect($activities)->toContain('algorithm');
    expect($activities)->toContain('data-representation');
    expect($activities)->toContain('diagnostic-practice');
    expect($activities)->toContain('solution-development');
    expect($activities)->toContain('evaluation');
    expect($activities)->toContain('reflection');
});

test('importing learners automatically initializes learning session and progress activities', function () {
    actingAs(adminUser());

    $csv = "name,class_name\nRian Hidayat,X TKJ 2\n";
    $file = UploadedFile::fake()->createWithContent('siswa.csv', $csv);

    post('/admin/siswa/import', ['file' => $file])->assertRedirect();

    $learner = Learner::where('name', 'Rian Hidayat')->first();
    expect($learner)->not->toBeNull();

    $session = $learner->learningSessions()->first();
    expect($session)->not->toBeNull();
    expect($session->progress()->count())->toBe(9);
});

test('admin can download CSV template', function () {
    actingAs(adminUser());

    $response = get('/admin/siswa/template');

    $response->assertOk();
    $response->assertHeader('Content-Disposition', 'attachment; filename="template_import_siswa.csv"');
    expect($response->getContent())->toContain('name,class_name');
    expect($response->getContent())->toContain('Ahmad Fauzi,X TKJ 1');
});

test('admin can create a new session for a learner', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();

    post("/admin/siswa/{$learner->id}/sessions")->assertRedirect();

    expect($learner->learningSessions()->count())->toBe(1);
    expect($learner->learningSessions()->first()->progress()->count())->toBe(9);
});

test('admin can delete a learning session', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create([
        'learner_id' => $learner->id,
        'state' => [],
        'last_active_at' => now(),
    ]);

    delete("/admin/sessions/{$session->id}")->assertRedirect();

    assertDatabaseMissing('learning_sessions', ['id' => $session->id]);
});

test('admin can toggle status of simple activity without answers', function () {
    actingAs(adminUser());
    $learner = Learner::factory()->create();
    $session = LearningSession::create([
        'learner_id' => $learner->id,
        'state' => [],
    ]);
    $progress = $session->progress()->create([
        'activity_key' => 'problem-orientation',
        'completed' => false,
        'payload' => [],
    ]);

    put("/admin/sessions/{$session->id}/progress/problem-orientation", [
        'completed' => true,
    ])->assertRedirect();

    expect($progress->refresh()->completed)->toBeTrue();

    // Toggle back to incomplete
    put("/admin/sessions/{$session->id}/progress/problem-orientation", [
        'completed' => false,
    ])->assertRedirect();

    expect($progress->refresh()->completed)->toBeFalse();
});
