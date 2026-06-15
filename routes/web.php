<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', function () {
    return Inertia::render('Learning/Home');
});
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
Route::get('/computational-thinking', function () {
    return Inertia::render('Learning/ComputationalThinking');
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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
