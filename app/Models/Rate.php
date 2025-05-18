<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;
    protected $table = 'rates';

    protected $fillable = [
        'id_user',
        'id_room',
        'stars',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room');
    }
}
