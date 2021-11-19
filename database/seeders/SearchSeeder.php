<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Eloquent;

class SearchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        Eloquent::unguard();
        $path = 'DB/search_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("Re-Created Search INDEX");
    }
}
