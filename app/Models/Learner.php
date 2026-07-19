<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Learner extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'class_name'];

    public function learningSessions(): HasMany
    {
        return $this->hasMany(LearningSession::class);
    }
}
