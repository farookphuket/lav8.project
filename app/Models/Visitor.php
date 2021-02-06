<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

   protected $fillable = [
      'client_ip',
      'client_browser',
      'client_os',
      'last_visited_date',
      'visited_year',
      'visited_month',
      'post_id'
    ];
}
