<?php

use App\Http\Controllers\AdminLearnerController;
use App\Http\Controllers\AdminLearningDataController;
use App\Http\Controllers\LearningSessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('admin/data-pembelajaran', [AdminLearningDataController::class, 'index'])
        ->middleware('admin')
        ->name('admin.learning-data');

    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('siswa', [AdminLearnerController::class, 'index'])->name('learners.index');
        Route::post('siswa', [AdminLearnerController::class, 'store'])->name('learners.store');
        Route::get('siswa/template', [AdminLearnerController::class, 'downloadTemplate'])->name('learners.template');
        Route::post('siswa/import', [AdminLearnerController::class, 'import'])->name('learners.import');
        Route::get('siswa/{learner}', [AdminLearnerController::class, 'show'])->name('learners.show');
        Route::post('siswa/{learner}/sessions', [AdminLearnerController::class, 'createSession'])->name('learners.sessions.store');
        Route::put('siswa/{learner}', [AdminLearnerController::class, 'update'])->name('learners.update');
        Route::delete('siswa/{learner}', [AdminLearnerController::class, 'destroy'])->name('learners.destroy');
        Route::put('sessions/{session}/progress/{activity}', [AdminLearnerController::class, 'updateProgress'])->name('sessions.progress.update');
        Route::put('sessions/{session}/roles', [AdminLearnerController::class, 'updateRoles'])->name('sessions.roles.update');
        Route::delete('sessions/{session}', [AdminLearnerController::class, 'destroySession'])->name('sessions.destroy');
    });
});

Route::get('/', function () {
    return Inertia::render('Learning/Login');
})->name('home');

Route::post('/learning/session', [LearningSessionController::class, 'store'])->name('learning.session.store');
Route::get('/learning/state', [LearningSessionController::class, 'show'])->name('learning.state.show');
Route::put('/learning/state', [LearningSessionController::class, 'updateState'])->name('learning.state.update');
Route::put('/learning/progress/{activity}', [LearningSessionController::class, 'updateProgress'])->name('learning.progress.update');

Route::get('/materi/mengenal-jaringan-komputer', function () {
    return Inertia::render('Learning/NetworkIntroduction');
});
Route::get('/materi/topologi-jaringan', function () {
    return Inertia::render('Learning/TopologiJaringan');
});
Route::get('/materi/media-komponen-jaringan', function () {
    return Inertia::render('Learning/MediaKomponenJaringan');
});
Route::get('/materi/dasar-pengalamatan', function () {
    return Inertia::render('Learning/DasarPengalamatan');
});

Route::get('/beranda', function () {
    return Inertia::render('Learning/Home');
})->name('learning.home');
Route::get('/instruction', function () {
    return Inertia::render('Learning/Instruction');
});
Route::get('/learning-outcomes', function () {
    return Inertia::render('Learning/LearningOutcomes');
});
Route::get('/problem-orientation', function () {
    return Inertia::render('Learning/ProblemOrientation');
});
Route::get('/information-gathering', function () {
    return Inertia::render('Learning/InformationGathering');
});

/*
|--------------------------------------------------------------------------
| INVESTIGATION
|--------------------------------------------------------------------------
*/

Route::get('/investigation/computational-thinking', function () {
    return Inertia::render('Learning/Investigations/ComputationalThinking');
});

Route::get('/investigation/algorithm', function () {
    return Inertia::render('Learning/Investigations/Algorithm');
});

Route::get('/investigation/data-representation', function () {
    return Inertia::render('Learning/Investigations/DataRepresentation');
});

Route::get('/investigation/data-processing', function () {
    return Inertia::render('Learning/Investigations/DataProcessing');
});

Route::get('/investigation/summary', function () {
    return Inertia::render('Learning/Investigations/InvestigationSummary');
});

Route::get('/solution-development', function () {
    return Inertia::render('Learning/SolutionDevelopment');
});

Route::get('/evaluation', function () {
    return Inertia::render('Learning/Evaluation');
});

Route::get('/result', function () {
    return Inertia::render('Learning/Result');
});

Route::get('/reflection', function () {
    return Inertia::render('Learning/Reflection');
});

Route::get('/developer-profile', function () {
    return Inertia::render('Learning/DeveloperProfile');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
