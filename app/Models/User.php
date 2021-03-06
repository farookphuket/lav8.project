<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function whatnews(){
        return $this->hasMany(Whatnews::class);
    }

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function template(){
        return $this->hasMany(Template::class);
    }
    public function path(){
        return route('user.show',$this);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function roles(){
        return $this->belongsToMany(Role::class);
    }

    public function songs(){
        return $this->belongToMany(Song::class);
    }

    public function videos(){
        return $this->hasMany(Video::class);
    }

    public function photos(){
        return $this->hasMany(Photo::class);
    }

}
