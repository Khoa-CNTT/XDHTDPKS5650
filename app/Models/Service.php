<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $table='services';
    protected $fillable = [
        'service_name',
        'price'
    ];

    public function invoices()
    {
        return $this->belongsToMany(Invoices::class, 'invoice_services', 'service_id', 'invoice_id');
    }
    
}
