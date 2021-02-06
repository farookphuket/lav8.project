<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = ["user_id","comment_id","ip","reply_body","user_name"];
    public function comment(){
        //$user = User::join("replies","replies.user_id","=","users.id")
         //   ->select("users.name","users.email","")
        return $this->belongsTo(Comment::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
