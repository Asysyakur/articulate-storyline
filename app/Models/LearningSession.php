<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LearningSession extends Model
{
    use HasFactory;

    protected $fillable = ['learner_id', 'state', 'last_active_at'];

    protected function casts(): array
    {
        return ['state' => 'array', 'last_active_at' => 'datetime'];
    }

    public function learner(): BelongsTo
    {
        return $this->belongsTo(Learner::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(LearningActivityProgress::class);
    }
}
