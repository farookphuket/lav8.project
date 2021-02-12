<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Member\HomeController;
use App\Http\Controllers\WhatnewsController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PostsController as PubPost;
use App\Http\Controllers\VisitorsController as PubVisit;


use App\Http\Controllers\Member\WhatnewsController as WMN;
use App\Http\Controllers\Member\PostsController as MemberPost;
use App\Http\Controllers\Member\CommentsController as MCMT;
use App\Http\Controllers\Member\TemplatesController as TPM;


use App\Http\Controllers\Admin\WhatnewsController as WPAdmin;
use App\Http\Controllers\Admin\HomeController as HAdmin;
use App\Http\Controllers\Admin\UserController as UAdmin;
use App\Http\Controllers\Admin\PostsController as POSTAdmin;
use App\Http\Controllers\Admin\TemplatesController as TemAdmin;
use App\Http\Controllers\Admin\TagsController as TagsAdmin;
use App\Http\Controllers\Admin\CommentsController as ACMT;
use App\Http\Controllers\Admin\RepliesController as ADRP;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',[WhatnewsController::class,'index']);
Route::resource('/posts',PubPost::class);
Route::get('/posts/{post:slug}',[PubPost::class,'show'])->name('posts.show');

Route::get("/about",[PubPost::class,'about'])->name('posts.about');




/* call by Vue START*/
Route::resource('/visitors',PubVisit::class);
Route::resource('/passwordreset',PasswordResetController::class);
Route::get('/passreset/{timeout}',[PasswordResetController::class,'passreset'])->name('passreset');
Route::get('/getmyresetinfo',[PasswordResetController::class,'getmyresetinfo'])->name('getmyresetinfo');
Route::post('/hello',[PasswordResetController::class,'hello'])->name('hello');
Route::post('/update',[PasswordResetController::class,'update'])->name('update');

/* call by Vue END*/


/* Route::get('/{any}',function($se){ */

/*     $msg_show = 'the page  '.Request::url().' is in valid'; */
/*     return $msg_show; */
/* })->where('any','.*'); */


Route::prefix('member')->name('member.')->middleware('auth')->group(function(){
    Route::resource('/home',HomeController::class);
    Route::post('/updateUserProfile',[HomeController::class,'updateUserProfile'])->name('updateUserProfile');


    Route::get('/getPosts',[MemberPost::class,'getPosts'])->name('posts.getPosts');
    Route::get('/getPostsByTagId',[MemberPost::class,'getPostsByTagId'])->name('posts.getPostsByTagId');
    Route::get('/getPostsInTagId/{id}',[MemberPost::class,'getPostsInTagId'])->name('posts.getPostsInTagId');
    Route::resource('/posts',MemberPost::class);
    Route::get('/posts/{post:slug}',[MemberPost::class,'show'])->name('posts.show');
    Route::get('/about',[MemberPost::class,"about"])->name('posts.about');

    Route::get('/getPostComment/{post_id}',[MCMT::class,'getPostComment'])->name('comments.getPostComment');

    Route::resource("/templates",TPM::class);

    Route::resource("/comments",MCMT::class);
    Route::post('/replyComment',[MCMT::class,"replyComment"])->name("comments.replyComment");

    Route::get('/wnFullRead/{whatnews}',[WMN::class,'wnFullRead'])->name('whatnews.wnFullRead');
    Route::resource('/whatnews',WMN::class);
    Route::get('/whatnews/{whatnews}/edit',[WMN::class,'edit'])->name('whatnews.edit');
    Route::delete('/whatnews/{whatnews}',[WMN::class,'destroy'])->name('whatnews.destroy');




    Route::get('/profile',[HomeController::class,'profile'])->name('profile');

    

});









/* Admin */
Route::prefix('admin')->name('admin.')->middleware('can:is_admin')->group(function(){
    

    Route::resource('/whatnews',WPAdmin::class);



    Route::resource('/home',HAdmin::class);
    Route::get('/profile',[HAdmin::class,'profile'])->name('profile');
    Route::post('/updateadminprofile',[HAdmin::class,'updateadminprofile'])->name('updateadminprofile');

    
    Route::get("/getUserList",[UAdmin::class,"getUserList"])->name("user.getUserList");
    Route::resource("/user",UAdmin::class);

    Route::get('/getPostCommentAll',[ACMT::class,"getPostCommentAll"])->name("comments.getPostCommentAll");
    Route::post("/sentReply",[ACMT::class,'sentReply'])->name("comments.sentReply");
    Route::resource("/comments",ACMT::class);

    Route::resource("/replies",ADRP::class);

    Route::get('/getPosts',[POSTAdmin::class,'getPosts'])->name('post.getPosts');
    Route::get('/getPostsInTag/{tag}',[POSTAdmin::class,'getPostsInTag'])->name('post.getPostsInTag');
    Route::get('/getPostsByTag',[POSTAdmin::class,'getPostsByTag'])->name('post.getPostsByTag');
    Route::resource('/post',POSTAdmin::class);
    Route::get('/post/{post:slug}',[POSTAdmin::class,'show'])->name('post.show');

    Route::resource('/templates',TemAdmin::class);
    Route::get("/viewTemplate/{template}",[TemAdmin::class,"viewTemplate"])
        ->name("templates.viewTemplate");
    Route::get('/getTemplates',[TemAdmin::class,'getTemplates'])
        ->name('templates.getTemplates');


    Route::get('/getTags',[TagsAdmin::class,'getTags'])->name('tags.getTags');
    Route::resource('/tags',TagsAdmin::class);
    Route::get('/tags/{tag}',[TagsAdmin::class,'show'])->name('tags.show');
    Route::get("/about",[POSTAdmin::class,"about"])->name("post.about");

});
