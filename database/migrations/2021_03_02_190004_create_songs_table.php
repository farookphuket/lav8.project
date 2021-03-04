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
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->foreignId("artist_id");
            $table->foreignId("album_id");
            $table->foreignId("user_id");
            $table->string("name");
            $table->string("cover")->nullable();
            $table->string("url")->nullable();
            $table->dateTime("posted_at")->nullable();
            $table->timestamps();


            $table->foreign("user_id")
                  ->references("id")
                  ->on("users")
                  ->onDelete("cascade");


            $table->foreign("album_id")
                  ->references("id")
                  ->on("albums")
                  ->onDelete("cascade");

            $table->foreign("artist_id")
                  ->references("id")
                  ->on("artists")
                  ->onDelete("cascade");



        });

        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->timestamps();
        });

        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->timestamps();
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
        Schema::dropIfExists('album');
        Schema::dropIfExists('artist');
    }
}
