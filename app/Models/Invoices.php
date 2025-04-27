<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    use HasFactory;
    protected $table='invoices';
    protected $fillable = [
        'id_user',
        'id_room',
        'id_order',
        'firstName',
        'lastName',
        'email',
        'phone',
        'paymentMethod',
        'note',
        'total',
        'type'
    ];
}
