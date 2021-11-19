<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'section',
        'title',
        'excerpt',
        'body'
    ]; 
    public function user(){
        return $this->belongsTo(User::class);
    }
}
