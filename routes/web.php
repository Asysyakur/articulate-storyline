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
Route::get('/problem-orientation', function () {
    return Inertia::render('Learning/ProblemOrientation');
});
Route::get('/investigation', function () {
    return Inertia::render('Learning/Investigation');
});
Route::get('/evaluation', function () {
    return Inertia::render('Learning/Evaluation');
});
Route::get('/result', function () {
    return Inertia::render('Learning/Result');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
