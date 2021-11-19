<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->string("ip");//will keep an ip
            $table->string("comment_title");
            $table->text("comment_body");
            $table->integer("reply_count")->nullable()->default(0);
            $table->dateTime("replied_at")->nullable()->default(0);
            $table->timestamps();

            $table->foreign("user_id")->references("id")
                                        ->on("users")
                                        ->onDelete("cascade");
        });


        Schema::create('comment_post', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id");
            $table->foreignId("comment_id");
            $table->foreignId("post_id");
            $table->timestamps();

            $table->foreign("user_id")->references("id")
                                        ->on("users")
                                        ->onDelete("cascade");

            $table->foreign("post_id")->references("id")
                                        ->on("posts")
                                        ->onDelete("cascade");

            $table->foreign("comment_id")->references("id")
                                        ->on("comments")
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
        Schema::dropIfExists('comments');
        Schema::dropIfExists('comment_post');
    }
}
