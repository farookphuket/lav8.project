<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Eloquent;

class VisitorTableSeeder extends Seeder
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

        $path = 'DB/visitors_file.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("add visitor");
    }
}
