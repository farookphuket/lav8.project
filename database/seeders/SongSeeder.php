<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use DB;
use Eloquent;


class SongSeeder extends Seeder
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


        $artist = "DB/Artist_list.sqlite";
        DB::unprepared(file_get_contents($artist));
        $this->command->info("Created Artist list");


        $album = "DB/Album_list.sqlite";
        DB::unprepared(file_get_contents($album));
        $this->command->info("Created Album list");

        $song = "DB/Song_list.sqlite";
        DB::unprepared(file_get_contents($song));
        $this->command->info("Created song list");

        $album_link = "DB/song_album_link.sqlite";
        DB::unprepared(file_get_contents($album_link));
        $this->command->info("Album has been link");

        $artist_link = "DB/song_artist_link.sqlite";
        DB::unprepared(file_get_contents($artist_link));
        $this->command->info("Artist has been link");
        // read count 

        $song_read = "DB/song_read_count.sqlite";
        DB::unprepared(file_get_contents($song_read));
        $this->command->info("Re-Created song read list");

    }
}
