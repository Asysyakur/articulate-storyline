<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('learners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('class_name', 100);
            $table->timestamps();
        });

        Schema::create('learning_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learner_id')->constrained()->cascadeOnDelete();
            $table->json('state')->nullable();
            $table->timestamp('last_active_at')->nullable();
            $table->timestamps();
        });

        Schema::create('learning_activity_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learning_session_id')->constrained()->cascadeOnDelete();
            $table->string('activity_key', 100);
            $table->boolean('completed')->default(false);
            $table->json('payload')->nullable();
            $table->timestamps();

            $table->unique(['learning_session_id', 'activity_key'], 'learning_progress_session_activity_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('learning_activity_progress');
        Schema::dropIfExists('learning_sessions');
        Schema::dropIfExists('learners');
    }
};
