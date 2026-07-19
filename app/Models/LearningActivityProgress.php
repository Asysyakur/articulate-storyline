<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LearningActivityProgress extends Model
{
    use HasFactory;

    protected $table = 'learning_activity_progress';

    protected $fillable = ['learning_session_id', 'activity_key', 'completed', 'payload'];

    protected function casts(): array
    {
        return ['completed' => 'boolean', 'payload' => 'array'];
    }

    public function learningSession(): BelongsTo
    {
        return $this->belongsTo(LearningSession::class);
    }
}
