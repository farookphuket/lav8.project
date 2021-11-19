<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostsController as pubPost;
use App\Http\Controllers\AlbumController as pubAlbum;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// get post 
Route::get('/getPostList',[pubPost::class,'getPostList'])->name('getPostList');

// getPostListByTag 
Route::get('/getPostListByTag/{tag_id}',[pubPost::class,'getPostListByTag'])
    ->name('getPostListByTag');

// search post 
Route::get('/searchPost',[pubPost::class,'searchPost'])->name('searchPost');

Route::get('/album-search',[pubAlbum::class,'search'])->name('album-search');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
