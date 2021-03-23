<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string("post_title");
            $table->string("slug");
            $table->text("post_excerpt");
            $table->text("post_body");
            $table->boolean('is_public');
            $table->string("last_read_ip")->nullable();
            $table->date("last_read_date")->default(date('Y-m-d'));
            $table->integer("read_count")->default(0);
            $table->timestamps();

            $table->foreign('user_id')
                            ->references('id')
                            ->on('users')
                            ->onDelete('cascade');
        });



        Schema::create('post_read', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id');
            $table->string("os");
            $table->string("ip");
            $table->string("device");
            $table->string("browser");
            $table->timestamps();

            $table->foreign("post_id")
                    ->references("id")
                    ->on("posts")
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
        Schema::dropIfExists('posts');
        Schema::dropIfExists('post_read');
        
    }
}
