<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Eloquent;
use DB;

class CommentSeeder extends Seeder
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
        $path = 'DB/comment_list.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("comment post has been added ");
    }
}
