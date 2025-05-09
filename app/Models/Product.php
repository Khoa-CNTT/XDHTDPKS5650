<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table='products';
    protected $fillable = [
        'id_user',
        'name',
        'price',
        'status',
        'id_category',
        'image'
    ];
    public function category()
{
    return $this->belongsTo(ProductCate::class, 'id_category');
}
}
