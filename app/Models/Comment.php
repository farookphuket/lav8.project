<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    protected $fillable = [
        "user_id","post_id",
        "url","comment_title",
        "comment_body","ip","reply_count",
        "replied_at"
    ];
    use HasFactory;


    public function user(){
        return $this->belongsTo(User::class);
    }

    /*
    public function posts(){
        return $this->belongsTo(Post::class)->with("user");
    }
     */

    /*
    public function reply(){
        return $this->hasMany(Reply::class)->with("user");
    }
     */
}
