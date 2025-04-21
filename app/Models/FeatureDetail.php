<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeatureDetail extends Model
{
    use HasFactory;
    protected $table='feature_details';
    protected $fillable = [
        'id_staff',
        'id_feature'
    ];
}
