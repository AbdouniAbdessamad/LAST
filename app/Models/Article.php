<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;


class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'bon_commande',
        'supplier_id',
        'ref',
        'name',
        'quantity',
        'category_id',
        'status',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }



    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }
    public function lowQuantityArticle()
    {
        return $this->hasOne(LowQuantity::class, 'ref', 'ref');
    }

}
