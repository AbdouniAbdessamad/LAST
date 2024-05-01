<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'city',
        'country',
        'address',
        'phone',
    ];

    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
