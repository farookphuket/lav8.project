<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Eloquent;

class TemplateSeeder extends Seeder
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
        $path = 'DB/template.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("add Template");
    }
}
