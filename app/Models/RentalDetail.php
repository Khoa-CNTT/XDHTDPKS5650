<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentalDetail extends Model
{
    use HasFactory;
    protected $table='rental_details';
    protected $fillable = [
        'id_room',
        'date',
        'status',
        'note'
    ];
    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }
}
