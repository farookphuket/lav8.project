<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\Tag;
use DB;
use Eloquent;


class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * $fillable = [
     *  'user_id','post_title','slug',
     *  'post_excerpt','post_body','is_public',
     *
     * ]
     */







    public function run()
    {

        // run makeNewPost create on 7 Dec 2020
        //$this->makeNewPost();
        Eloquent::unguard();
        $path = 'DB/postList.sqlite';
        DB::unprepared(file_get_contents($path));
        $this->command->info("add post");

        $tagsPath = 'DB/tags.sqlite';
        DB::unprepared(file_get_contents($tagsPath));
        $this->command->info("add Tag");

        $tagLink = 'DB/post_link_tag.sqlite';
        DB::unprepared(file_get_contents($tagLink));
        $this->command->info("add link");

        $post_read = 'DB/post_read_count.sqlite';
        DB::unprepared(file_get_contents($post_read));
        $this->command->info("re-insert Post Read Count");


        $post_comment = 'DB/comment_post.sqlite';
        DB::unprepared(file_get_contents($post_comment));
        $this->command->info("re-insert Post Comment");

    }


    
}
