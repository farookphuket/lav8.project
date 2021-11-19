<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSongsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {



        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->string("album_name");
            $table->string("album_cover");
            $table->timestamps();
        });

        // pip table to link

        Schema::create('album_song', function (Blueprint $table) {
            $table->id();
            $table->foreignId("album_id");
            $table->foreignId("song_id");
            $table->timestamps();

            $table->foreign('album_id')
                    ->references('id')
                    ->on('albums')
                    ->onDelete('cascade');

            $table->foreign('song_id')
                    ->references('id')
                    ->on('songs')
                    ->onDelete('cascade');
        });



        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->string("artist_name");
            $table->string("artist_cover");
            $table->text("artist_bio");
            $table->timestamps();
        });

        // pip table link with song table

        Schema::create('artist_song', function (Blueprint $table) {
            $table->id();
            $table->foreignId("song_id");
            $table->foreignId("artist_id");
            $table->timestamps();

            $table->foreign('song_id')
                    ->references('id')
                    ->on('songs')
                    ->onDelete('cascade');

            $table->foreign('artist_id')
                    ->references('id')
                    ->on('artists')
                    ->onDelete('cascade');
        });


        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->string("song_name");
            $table->string("song_cover")->nullable();
            $table->string("song_url")->nullable();
            $table->integer("read_count")->default(0);
            $table->dateTime("posted_at")->nullable();
            $table->timestamps();


            $table->foreign("user_id")
                  ->references("id")
                  ->on("users")
                  ->onDelete("cascade");

        });




        Schema::create('read_song', function (Blueprint $table) {
            $table->id();
            $table->foreignId("song_id");
            $table->date("readed_at"); // this field accept date
            $table->string("os");
            $table->string("browser");
            $table->string("ip");
            $table->timestamps();

            $table->foreign("song_id")->references("id")->on("songs")
                    ->onDelete("cascade");
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('songs');
        Schema::dropIfExists('albums');
        Schema::dropIfExists('artists');
        Schema::dropIfExists('album_song');
        Schema::dropIfExists('artist_song');
        Schema::dropIfExists('read_song');
    }
}
