<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $table='rooms';
    protected $fillable = [
        'room_name',
        'price',
        'status',
        'id_room_categories',
        'more_service',
    ];
    public function roomCategory()
    {
        return $this->belongsTo(RoomType::class, 'id_room_categories');
    }
    public function bookings()
    {
        return $this->hasMany(RentalDetail::class, 'room_id');
    }
}
