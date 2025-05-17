<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comments';
    protected $fillable = [
        'id_user',
        'id_blog',
        'text',
        'id_parent',
    ];
    public function children()
    {
        return $this->hasMany(Comment::class, 'id_parent');
    }

    // Quan hệ với người dùng (User)
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    // Quan hệ với comment cha (nếu có)
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'id_parent');
    }
}
