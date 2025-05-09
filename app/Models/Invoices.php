<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    use HasFactory;
    protected $table = 'invoices';
    protected $fillable = [
        'code',
        'name',
        'issueDate',
        'dueDate',
        'address',
        'id_user',
        'id_room',
<<<<<<< HEAD
        // 'id_order',
        'firstName',
        'lastName',
=======
        'id_order',
>>>>>>> 97ed8a4e64d8d69dbe2fb679f2bb8952a38ed341
        'email',
        'phone',
        'paymentMethod',
        'note',
        'total',
        'type'
    ];
<<<<<<< HEAD
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

=======

    public function services()
    {
        return $this->belongsToMany(Service::class, 'invoice_services', 'invoice_id', 'service_id');
    }
    
>>>>>>> 97ed8a4e64d8d69dbe2fb679f2bb8952a38ed341
    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room');
    }

<<<<<<< HEAD
    // public function order()
    // {
    //     return $this->belongsTo(::class, 'id_order');
    // }
=======
>>>>>>> 97ed8a4e64d8d69dbe2fb679f2bb8952a38ed341
}
