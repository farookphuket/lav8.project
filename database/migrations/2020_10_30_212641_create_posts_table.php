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



    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
        
    }
}
