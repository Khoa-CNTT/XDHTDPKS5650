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
        // 'id_order',
        // 'firstName',
        // 'lastName',
        'email',
        'phone',
        'paymentMethod',
        'note',
        'total',
        'type',
        'payment_status',
        'check_rate'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'invoice_services', 'invoice_id', 'service_id');
    }

    // public function order()
    // {
    //     return $this->belongsTo(::class, 'id_order');
    // }
}
