<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LowQuantity extends Model
{
    use HasFactory;

    protected $fillable = [
        'ref',
        'name',
        'quantity',
    ];

    public function article()
    {
        return $this->belongsTo(Article::class, 'ref', 'ref');
    }
    
}
