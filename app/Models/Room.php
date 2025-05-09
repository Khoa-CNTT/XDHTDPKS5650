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
        'view',
        'description',
        'images',
        'id_room_categories',
        'more_service',
    ];
<<<<<<< HEAD
    public function roomType()
=======

    protected $casts = [
        'images' => 'array',
    ];

    public function roomCategory()
>>>>>>> 97ed8a4e64d8d69dbe2fb679f2bb8952a38ed341
    {
        return $this->belongsTo(RoomType::class, 'id_room_categories');
    }
    public function bookings()
    {
        return $this->hasMany(RentalDetail::class, 'room_id');
    }
}
