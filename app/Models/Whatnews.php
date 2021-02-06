<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Whatnews extends Model
{
    use HasFactory;

    protected $fillable = ['whatnews_title','whatnews_body','is_public','user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

}
