<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;
    protected $fillable = ["user_id","name","album_id",
        "artist_id","cover","posted_at","url"];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function artist(){
        return $this->belongsTo(Artist::class);
    }
    public function album(){
        return $this->belongsTo(Album::class);
    }
}
