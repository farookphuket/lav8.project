<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Whatnews;
use DB;
use Eloquent;

class WhatnewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

 



    public function run()
    {
        
        Eloquent::unguard();
        $whatnews = 'DB/whatnews_default.sqlite';
        DB::unprepared(file_get_contents($whatnews));
        $this->command->info("add Whatnews");

    }




}
