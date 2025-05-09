<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    use HasFactory;
    protected $table = 'invoices';
    protected $fillable = [
        'id_user',
        'id_room',
        // 'id_order',
        'firstName',
        'lastName',
        'email',
        'phone',
        'paymentMethod',
        'note',
        'total',
        'type'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room');
    }

    // public function order()
    // {
    //     return $this->belongsTo(::class, 'id_order');
    // }
}
